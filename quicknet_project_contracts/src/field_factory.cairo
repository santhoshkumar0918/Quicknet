
use starknet::ContractAddress;
use starknet::storage::Map;

#[starknet::interface]
trait IFieldFactory<TContractState> {
    fn add_liquidity(ref self: TContractState, amount: u256);
    fn remove_liquidity(ref self: TContractState, amount: u256);
    fn create_market(ref self: TContractState, name: felt252, odds: u256, stake: u256);
    fn place_bet(ref self: TContractState, market_id: u32, stake: u256, predicted_outcome: u32);
    fn resolve_market(ref self: TContractState, market_id: u32, winning_outcome: u32);
    fn claim_reward(ref self: TContractState, market_id: u32);
    
    
    fn get_total_liquidity(self: @TContractState) -> u256;
    fn get_liquidity_provider_stake(self: @TContractState, provider: ContractAddress) -> u256;
    fn get_bet(self: @TContractState, market_id: u32, user: ContractAddress) -> (u256, u256, u32);
    fn get_market_status(self: @TContractState, market_id: u32) -> (bool, u32, u256, u256);
}

#[feature("deprecated_legacy_map")]
#[starknet::contract]
pub mod FieldFactory {
    use super::IFieldFactory;
    use starknet::{ContractAddress, get_caller_address};

    #[storage]
    struct Storage {
        market_details: LegacyMap::<u32, (felt252, ContractAddress, bool, u256, u256)>,
        liquidity_provider_stakes: LegacyMap::<ContractAddress, u256>,
        market_bets: LegacyMap::<(u32, ContractAddress), (u256, u256, u32)>,
        market_outcomes: LegacyMap::<u32, u32>,
        total_liquidity_pool: u256,
        next_market_id: u32,
    }
    #[constructor]
    fn constructor(ref self: ContractState) {
        self.next_market_id.write(0);
        self.total_liquidity_pool.write(0); 
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        LiquidityAdded: LiquidityAdded,
        LiquidityRemoved: LiquidityRemoved,
        BetPlaced: BetPlaced,
        RewardPaid: RewardPaid,
    }

    #[derive(Drop, starknet::Event)]
    struct LiquidityAdded {
        provider: ContractAddress,
        amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct LiquidityRemoved {
        provider: ContractAddress,
        amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct BetPlaced {
        market_id: u32,
        user: ContractAddress,
        stake: u256,
        odds: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct RewardPaid {
        market_id: u32,
        user: ContractAddress,
        reward: u256,
    }

    #[abi(embed_v0)]
    impl FieldFactoryImpl of IFieldFactory<ContractState> {
        fn add_liquidity(ref self: ContractState, amount: u256) {
            assert(amount > 0, 'Invalid liquidity amount');

            let caller = get_caller_address();
            self.total_liquidity_pool.write(self.total_liquidity_pool.read() + amount);
            self.liquidity_provider_stakes.write(caller, self.liquidity_provider_stakes.read(caller) + amount);

            self.emit(Event::LiquidityAdded(LiquidityAdded { provider: caller, amount }));
        }

        fn remove_liquidity(ref self: ContractState, amount: u256) {
            let caller = get_caller_address();
            let provider_stake = self.liquidity_provider_stakes.read(caller);
            assert(provider_stake >= amount, 'Insufficient liquidity stake');

            self.total_liquidity_pool.write(self.total_liquidity_pool.read() - amount);
            self.liquidity_provider_stakes.write(caller, provider_stake - amount);

            self.emit(Event::LiquidityRemoved(LiquidityRemoved { provider: caller, amount }));
        }

        // fn create_market(ref self: ContractState, name: felt252, description: felt252) {
        //     let market_id = self.next_market_id.read();
        //     let creator = get_caller_address();
        //     self.market_details.write(market_id, (name, description, creator, false, 0));
        //     self.next_market_id.write(market_id + 1);
        // }
        fn create_market(ref self: ContractState, name: felt252, odds: u256, stake: u256) {
        let market_id = self.next_market_id.read();
        let creator = get_caller_address();
        
        // Update the market_details storage to include odds and stake instead of description
        self.market_details.write(market_id, (name, creator, true, odds, stake));
        
        // You might want to add additional logic here, such as:
        // - Checking if the stake is valid
        // - Updating the total liquidity pool
        // - Emitting an event for market creation

        self.next_market_id.write(market_id + 1);
    }

        fn place_bet(ref self: ContractState, market_id: u32, stake: u256, predicted_outcome: u32) {
            let (name, _description, _, is_closed, _) = self.market_details.read(market_id);
            assert(name != 0, 'Market does not exist');
            assert(is_closed == 0, 'Market is closed');

            let total_liquidity = self.total_liquidity_pool.read();
            let odds = total_liquidity / stake;

            let caller = get_caller_address();
            self.market_bets.write((market_id, caller), (stake, odds, predicted_outcome));

            self.emit(Event::BetPlaced(BetPlaced { market_id, user: caller, stake, odds }));
        }

        fn resolve_market(ref self: ContractState, market_id: u32, winning_outcome: u32) {
            self.market_outcomes.write(market_id, winning_outcome);
            let addr=get_caller_address();
            self.market_details.write(market_id, ('name', addr, true, 6167213578, 0));
        }

        fn claim_reward(ref self: ContractState, market_id: u32) {
            let caller = get_caller_address();
            let (stake, odds, outcome) = self.market_bets.read((market_id, caller));
            let market_outcome = self.market_outcomes.read(market_id);

            assert(outcome == market_outcome, 'Bet did not win');

            let reward = stake * odds;
            let current_liquidity = self.total_liquidity_pool.read();
            assert(current_liquidity >= reward, 'Insufficient liquidity');
            self.total_liquidity_pool.write(current_liquidity - reward);

            self.emit(Event::RewardPaid(RewardPaid { market_id, user: caller, reward }));
        }

        fn get_total_liquidity(self: @ContractState) -> u256 {
            self.total_liquidity_pool.read()
        }
    
        fn get_liquidity_provider_stake(self: @ContractState, provider: ContractAddress) -> u256 {
            self.liquidity_provider_stakes.read(provider)
        }
    
        fn get_bet(self: @ContractState, market_id: u32, user: ContractAddress) -> (u256, u256, u32) {
            self.market_bets.read((market_id, user))
        }
    
        fn get_market_status(self: @ContractState, market_id: u32) -> (bool, u32, u256, u256) {
            let (_, _, is_closed, odds, total_stake) = self.market_details.read(market_id);
            let winning_outcome = self.market_outcomes.read(market_id);
            (is_closed, winning_outcome, odds, total_stake)
    }   }
}