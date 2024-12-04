import { ReactNode } from "react";
import WalletProvider from "./WalletProvider";
import { State } from "wagmi";
import WhiskKitProvider from "./WhiskKitProvider";

export default function Providers({ initialWagmiState, children }: { initialWagmiState?: State; children: ReactNode }) {
  return (
    <WalletProvider initialWagmiState={initialWagmiState}>
      <WhiskKitProvider>{children}</WhiskKitProvider>
    </WalletProvider>
  );
}
