"use client";
import { getAddress } from "../../core";
import { useWhiskSdkContext } from "../../../provider";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAvatarByName, IdentityResolvers } from "@paperclip-labs/whisk-core/identity";

export interface UseAvatarByNameParams {
  name: string; // Address to resolve
  resolver: IdentityResolvers[number]; // Override the default resolvers set in the `WhiskSdkProvider` config.
}

export function useAvatarByName({ name, resolver }: UseAvatarByNameParams) {
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
    queryKey: ["avatar-by-name", name, resolver],
    queryFn: async () => await getAvatarByName(apiKey, { name, resolver }),
    // placeholderData: override?.avatar,
    // enabled: !override, // Don't even fetch if overriding
  });
}
