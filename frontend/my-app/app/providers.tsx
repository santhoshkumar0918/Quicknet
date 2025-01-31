// "use client";

// import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
// import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
// import { ReactNode } from "react";
// import { sepolia, mainnet } from "@starknet-react/chains";
// import {
//   StarknetConfig,
//   publicProvider,
//   argent,
//   braavos,
//   useInjectedConnectors,
//   voyager,
// } from "@starknet-react/core";

// export function StarknetProvider({ children }: { children: ReactNode }) {
//   const { connectors } = useInjectedConnectors({
//     recommended: [argent(), braavos()],
//     includeRecommended: "onlyIfNoConnectors",
//     order: "random",
//   });

//   return (
//     <StarknetConfig
//       chains={[mainnet, sepolia]}
//       provider={publicProvider()}
//       connectors={connectors}
//       explorer={voyager}
//     >
//       {children}
//     </StarknetConfig>
//   );
// }

// export function Providers({ children }: { children: ReactNode }) {
//   return (
//     <DynamicContextProvider
//       settings={{
//         environmentId: "72d37f7a-86a8-490b-bb37-ac80e7a590ec",
//         walletConnectors: [StarknetWalletConnectors],
//       }}
//     >
//       {children}
//     </DynamicContextProvider>
//   );
// }

"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { ReactNode } from "react";
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  voyager,
} from "@starknet-react/core";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "72d37f7a-86a8-490b-bb37-ac80e7a590ec",
        walletConnectors: [StarknetWalletConnectors],
      }}
    >
      <StarknetConfig
        chains={[mainnet, sepolia]}
        provider={publicProvider()}
        explorer={voyager}
        autoConnect
      >
        {children}
      </StarknetConfig>
    </DynamicContextProvider>
  );
}