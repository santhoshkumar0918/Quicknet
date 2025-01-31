import { useContract } from "@starknet-react/core";
import fieldFactoryAbi from "../../abis/fieldFactory.json";

export const useFieldFactory = () => {
  const { contract } = useContract({
    abi: fieldFactoryAbi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  });

  return {
    createMarket: contract?.create_market,
    placeBet: contract?.place_bet,
    addLiquidity: contract?.add_liquidity,
    removeLiquidity: contract?.remove_liquidity,
    resolveMarket: contract?.resolve_market,
    claimReward: contract?.claim_reward,
  };
};