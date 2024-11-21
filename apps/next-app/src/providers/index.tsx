import { ReactNode } from "react";
import WalletProvider from "./WalletProvider";
import { State } from "wagmi";
import DappKitProvider from "./DappKitProvider";

export default function Providers({ initialWagmiState, children }: { initialWagmiState?: State; children: ReactNode }) {
  return (
    <WalletProvider initialWagmiState={initialWagmiState}>
      <DappKitProvider>{children}</DappKitProvider>
    </WalletProvider>
  );
}
