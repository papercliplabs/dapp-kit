"use client";
import { getName } from "@/identity/core";
import { useWhiskSdkContext } from "@/provider";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useName({ address }: { address: Address }) {
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
    queryKey: ["name", address, resolvers],
    queryFn: async () => await getName(apiKey, { address, resolvers }),
    placeholderData: override?.name,
    enabled: !override, // Don't even fetch if overriding
  });
}
