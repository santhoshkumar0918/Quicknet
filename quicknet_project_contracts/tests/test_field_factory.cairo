use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, 
    start_cheat_caller_address, stop_cheat_caller_address
};
use starknet::{ContractAddress, contract_address_const};
use array::ArrayTrait;
use quicknet_project_contracts::field_factory::{FieldFactory, IFieldFactoryDispatcher, IFieldFactoryDispatcherTrait};
use core::result::ResultTrait;

fn deploy_contract() -> IFieldFactoryDispatcher {
    let contract_class = declare("FieldFactory").unwrap().contract_class();
    let (contract_address, _) = contract_class.deploy(@ArrayTrait::new()).unwrap(); 
    IFieldFactoryDispatcher { contract_address }
}

#[test]
fn test_add_liquidity() {
    let mut contract = deploy_contract();
    let user = contract_address_const::<1>();
    start_cheat_caller_address(contract.contract_address, user);

    contract.add_liquidity(100);
    
    assert(contract.get_total_liquidity() == 100, 'Total liq be 100');
    assert(contract.get_liquidity_provider_stake(user) == 100, 'User stake should be 100');
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
fn test_remove_liquidity() {
    let mut contract = deploy_contract();
    let user = contract_address_const::<1>();
    start_cheat_caller_address(contract.contract_address, user);

    contract.add_liquidity(100);
    contract.remove_liquidity(50);
    
    assert(contract.get_total_liquidity() == 50, 'Total liquidity should be 50');
    assert(contract.get_liquidity_provider_stake(user) == 50, 'User stake should be 50');
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
#[should_panic(expected: ('Insufficient liquidity stake',))]
fn test_remove_liquidity_insufficient() {
    let mut contract = deploy_contract();
    let user = contract_address_const::<1>();
    start_cheat_caller_address(contract.contract_address, user);

    contract.add_liquidity(100);
    contract.remove_liquidity(150);
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
fn test_place_bet() {
    let mut contract = deploy_contract();
    let user = contract_address_const::<1>();
    start_cheat_caller_address(contract.contract_address, user);

    contract.add_liquidity(1000_u256);
    contract.create_market('Test Market', 'Description', 0);
    
    // Place bet on market 0 instead of 1
    contract.place_bet(0, 100_u256, 1);
    
    let (stake, _odds, outcome) = contract.get_bet(0, user);
    assert(stake == 100_u256, 'Stake value is incorrect');
    assert(outcome == 1, 'Incorrect outcome');
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
fn test_resolve_market() {
    let mut contract = deploy_contract();
    contract.resolve_market(1, 1);

    let (is_closed, winning_outcome, _, _) = contract.get_market_status(1);
    assert(is_closed == true, 'Market closed');
    assert(winning_outcome == 1, 'Winning 1');
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
fn test_claim_reward() {
    let mut contract = deploy_contract();
    let user = contract_address_const::<1>();
    start_cheat_caller_address(contract.contract_address, user);

    contract.add_liquidity(1000_u256);
    contract.create_market('Test Market', 'Description', 0);
    
    contract.place_bet(0, 100, 1);
    contract.resolve_market(0, 1);

    let initial_liquidity = contract.get_total_liquidity();
    contract.claim_reward(0);
    let final_liquidity = contract.get_total_liquidity();

    assert(final_liquidity < initial_liquidity, 'Liquidity claiming reward');
    stop_cheat_caller_address(contract.contract_address);
}

#[test]
#[should_panic(expected: ('Bet did not win',))]
fn test_claim_reward_losing_bet() {
    let mut contract = deploy_contract();
    let user = contract_address_const::<1>();
    start_cheat_caller_address(contract.contract_address, user);

    contract.add_liquidity(1000_u256);
    contract.create_market('Test Market', 'Description', 0);
    contract.place_bet(0, 100, 1);
    contract.resolve_market(0, 2);
    contract.claim_reward(0);
    stop_cheat_caller_address(contract.contract_address);
}