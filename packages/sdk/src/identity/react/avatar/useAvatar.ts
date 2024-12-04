"use client";
import { getAvatar } from "@/identity/core";
import { useWhiskSdkContext } from "@/provider";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useAvatar({ address }: { address: Address }) {
  const {
    apiKey,
    config: { identity },
  } = useWhiskSdkContext();

  if (!identity) {
    throw new Error("Identity config is missing");
  }

  const { resolvers, overrides } = identity;
  const override = overrides?.[address];

  return useQuery({
    queryKey: ["avatar", address, resolvers],
    queryFn: async () => await getAvatar(apiKey, { address, resolvers }),
    placeholderData: override?.avatar,
    enabled: !override, // Don't even fetch if overriding
  });
}
