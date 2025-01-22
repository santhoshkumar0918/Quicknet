import { Provider, Account, ec, Contract, constants } from "starknet";

/**
 * Connects to a StarkNet contract.
 * @param contractAddress - The address of the deployed contract.
 * @param abi - The contract's ABI.
 * @returns StarkNet contract instance.
 */
export const connectContract = async (contractAddress: string, abi: any) => {
 
  const provider = new Provider({ 
    sequencer: { 
      baseUrl: constants.StarknetChainId.SN_GOERLI  
    } 
  });

  
  const privateKey = "YOUR_PRIVATE_KEY"; 
  const keyPair = ec.starkCurve.getKeyPair(privateKey); 
  const accountAddress = "YOUR_ACCOUNT_ADDRESS"; 
  const account = new Account(provider, accountAddress, keyPair);

  
  const contract = new Contract(abi, contractAddress, account);

  console.log("Contract connected:", contract);
  return contract;
};
