import { ReactNode } from "react";
import WalletProvider from "./WalletProvider";
import { WalletActionFlowGlobalProvider } from "@paperclip-labs/dapp-kit/wallet-action-flow";
import { State } from "wagmi";

export default function Providers({ initialWagmiState, children }: { initialWagmiState?: State; children: ReactNode }) {
  return (
    <WalletProvider initialWagmiState={initialWagmiState}>
      <WalletActionFlowGlobalProvider>{children}</WalletActionFlowGlobalProvider>
    </WalletProvider>
  );
}
