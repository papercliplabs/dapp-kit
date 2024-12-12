"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { State, WagmiProvider } from "wagmi";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { getConfig } from "./wagmiConfig";

const queryClient = new QueryClient();

const wagmiConfig = getConfig();

const config = getDefaultConfig({
  appName: "Dapp Kit Demo App",
  projectId: "dc7f96ef59ca2128a3c225f2eae8cdd5",
  chains: wagmiConfig.chains,
  storage: wagmiConfig.storage,
  ssr: true,
});

export default function WalletProvider({
  initialWagmiState,
  children,
}: {
  initialWagmiState?: State;
  children: ReactNode;
}) {
  return (
    <WagmiProvider config={config} initialState={initialWagmiState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
