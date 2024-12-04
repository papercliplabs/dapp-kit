"use client";
import { WhiskClientType } from "@paperclip-labs/whisk";
import { InferRequestType } from "hono";
import { createContext, ReactNode, useContext } from "react";
import { Address } from "viem";

export interface WhiskKitConfig {
  identity?: {
    resolvers: InferRequestType<WhiskClientType["identity"]["avatar"]["$post"]>["json"]["resolvers"];
    overrides?: Record<Address, { name: string; avatar: string } | undefined>;
  };
}

export interface WhiskKitContextType {
  apiUrl: string;
  config: WhiskKitConfig;
}

const WhiskKitContext = createContext<WhiskKitContextType>({
  apiUrl: "",
  config: {},
});

export interface WhiskKitProviderParams {
  apiUrl: string;
  config: WhiskKitConfig;
  children: ReactNode;
}

export function WhiskKitProvider({ apiUrl, config, children }: WhiskKitProviderParams) {
  return <WhiskKitContext.Provider value={{ apiUrl, config }}>{children}</WhiskKitContext.Provider>;
}

export function useWhiskKitContext() {
  return useContext(WhiskKitContext);
}
