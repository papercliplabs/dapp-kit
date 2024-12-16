"use client";
import { getAddress } from "../../core";
import { useWhiskSdkContext } from "../../../provider";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { IdentityResolvers } from "@paperclip-labs/whisk-core/identity";

export interface UseAddressParams {
  name: string; // Address to resolve
  resolver: IdentityResolvers[number]; // Override the default resolvers set in the `WhiskSdkProvider` config.
}

export function useAddress({ name, resolver }: UseAddressParams) {
  const {
    apiKey,
    config: { identity },
  } = useWhiskSdkContext();

  if (!identity) {
    throw new Error("Identity config is missing");
  }

  const { resolvers: globalResolvers, overrides } = identity;
  //   const override = overrides?.[address]; // TODO: reverse this for overrides

  return useQuery({
    queryKey: ["address", name, resolver],
    queryFn: async () => await getAddress(apiKey, { name, resolver }),
    // placeholderData: override?.avatar,
    // enabled: !override, // Don't even fetch if overriding
  });
}
