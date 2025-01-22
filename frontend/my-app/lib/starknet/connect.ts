import { Provider, Account, ec, Contract, constants } from "starknet";

/**
 * Connects to a StarkNet contract.
 * @param contractAddress - The address of the deployed contract.
 * @param abi - The contract's ABI.
 * @returns StarkNet contract instance.
 */
export const connectContract = async (contractAddress: string, abi: any) => {
  // Step 1: Create a provider with the correct chain ID
  const provider = new Provider({ 
    sequencer: { 
      baseUrl: constants.StarknetChainId.SN_GOERLI  // Use the proper constant for Goerli
    } 
  });

  // Step 2: Load an account (via private key or wallet)
  const privateKey = "YOUR_PRIVATE_KEY"; // Replace with your private key
  const keyPair = ec.starkCurve.getKeyPair(privateKey); // Corrected method
  const accountAddress = "YOUR_ACCOUNT_ADDRESS"; // Replace with your account address
  const account = new Account(provider, accountAddress, keyPair);

  // Step 3: Connect to the contract
  const contract = new Contract(abi, contractAddress, account);

  console.log("Contract connected:", contract);
  return contract;
};
