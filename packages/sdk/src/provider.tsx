"use client";
import { WhiskClientType } from "@paperclip-labs/whisk-client";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { createContext, ReactNode, useContext, useRef } from "react";
import { Address } from "viem";

export interface IdentityKitConfig {
  resolvers: InferRequestType<WhiskClientType["identity"]["avatar"]["$post"]>["json"]["resolvers"];
  overrides?: Record<Address, { name: string; avatar: string } | undefined>;
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
      queryClientRef.current = new QueryClient();
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
