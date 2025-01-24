import { Provider, Contract, Account } from "starknet";

// Provider to interact with the StarkNet blockchain
const provider = new Provider({
  sequencer: {
    baseUrl: "https://alpha4.starknet.io", // Testnet
  },
});

// Replace with your contract's deployed address
const CONTRACT_ADDRESS = "<Your-Contract-Address>";
const CONTRACT_ABI = require("./path-to-your-abi.json"); // Path to your compiled ABI file

// Connect to the contract
export const getContractInstance = (account?: Account) => {
  return new Contract(CONTRACT_ABI, CONTRACT_ADDRESS, account || provider);
};

// Export the provider for other calls
export { provider };
