import { Provider, Account, ec, Contract, constants } from "starknet";

/**
 * Connects to a StarkNet contract.
 * @param contractAddress - The address of the deployed contract.
 * @param abi - The contract's ABI.
 * @returns StarkNet contract instance.
 */
export const connectContract = async (contractAddress: string, abi: any) => {
  // Initialize provider
  const provider = new Provider({
    sequencer: { network: constants.StarknetChainId.SN_GOERLI },
  });

  // Load private key securely
  const privateKey = process.env.PRIVATE_KEY!;
  if (!privateKey) {
    throw new Error("Private key is not set. Please configure it in your environment variables.");
  }

  // Generate key pair
  const keyPair = ec.getKeyPair(privateKey); // Check if this works with your library version
  
  // Load account address
  const accountAddress = process.env.ACCOUNT_ADDRESS!;
  if (!accountAddress) {
    throw new Error("Account address is not set. Please configure it in your environment variables.");
  }

  // Initialize account
  const account = new Account(provider, accountAddress, keyPair);

  // Connect to contract
  const contract = new Contract(abi, contractAddress, account);

  console.log("Contract connected:", contract);
  return contract;
};
