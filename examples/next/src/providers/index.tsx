import { ReactNode } from "react";
import WalletProvider from "./WalletProvider";
import { State } from "wagmi";
import WhiskSdkProvider from "./WhiskSdkProvider";

export default function Providers({ initialWagmiState, children }: { initialWagmiState?: State; children: ReactNode }) {
  return (
    <WalletProvider initialWagmiState={initialWagmiState}>
      <WhiskSdkProvider>{children}</WhiskSdkProvider>
    </WalletProvider>
  );
}
