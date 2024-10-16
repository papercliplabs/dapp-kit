import { Address } from "viem";

export type IdentityResolver = "ens" | "farcaster" | "nns";

export interface IdentityConfig {
  mainnetRpcUrl: string;
  neynarApiKey: string;
}

export interface GetIdentityParams {
  address: Address;
  resolvers: IdentityResolver[];
  config: IdentityConfig;
}
