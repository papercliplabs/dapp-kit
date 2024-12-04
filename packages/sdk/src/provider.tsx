"use client";
import { WhiskClientType } from "@paperclip-labs/whisk-client";
import { InferRequestType } from "hono";
import { createContext, ReactNode, useContext } from "react";
import { Address } from "viem";

export interface WhiskSdkConfig {
  identity?: {
    resolvers: InferRequestType<WhiskClientType["identity"]["avatar"]["$post"]>["json"]["resolvers"];
    overrides?: Record<Address, { name: string; avatar: string } | undefined>;
  };
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
  return <WhiskSdkContext.Provider value={{ apiKey: apiKey ?? "DEMO", config }}>{children}</WhiskSdkContext.Provider>;
}

export function useWhiskSdkContext() {
  return useContext(WhiskSdkContext);
}
