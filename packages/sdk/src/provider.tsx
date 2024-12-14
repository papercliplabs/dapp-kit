"use client";
import type { IdentityResolvers } from "@paperclip-labs/whisk-core/identity";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useRef } from "react";
import { Address } from "viem";

export interface IdentityKitConfig {
  resolvers: IdentityResolvers; // List of resolvers to use, will process sequentially until one resolves.
  overrides?: Record<Address, { name: string; avatar: string } | undefined>; // Override for a given address.
}

export interface WhiskSdkConfig {
  identity?: IdentityKitConfig;
}

export interface WhiskSdkContextType {
  apiKey: string;
  config: WhiskSdkConfig;
}

const WhiskSdkContext = createContext<WhiskSdkContextType>({
  apiKey: "",
  config: {},
});

export interface WhiskSdkProviderParams {
  apiKey?: string;
  config: WhiskSdkConfig;
  children: ReactNode;
}

export function WhiskSdkProvider({ apiKey, config, children }: WhiskSdkProviderParams) {
  const queryClientRef = useRef<QueryClient | null>(null);

  try {
    const existingQueryClient = useQueryClient();
    queryClientRef.current = existingQueryClient;
  } catch {
    if (!queryClientRef.current) {
      // No existing client, so let's make one
      queryClientRef.current = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            staleTime: 1000 * 60, // 5 minutes
          },
        },
      });
    }
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <WhiskSdkContext.Provider value={{ apiKey: apiKey ?? "DEMO", config }}>{children}</WhiskSdkContext.Provider>
    </QueryClientProvider>
  );
}

export function useWhiskSdkContext() {
  return useContext(WhiskSdkContext);
}
