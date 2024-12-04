"use client";
import { getName } from "@/identity/core";
import { useWhiskKitContext } from "@/provider";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useName({ address }: { address: Address }) {
  const {
    apiUrl,
    config: { identity },
  } = useWhiskKitContext();

  if (!identity) {
    throw new Error("Identity config is missing");
  }

  const { resolvers, overrides } = identity;
  const override = overrides?.[address];

  return useQuery({
    queryKey: ["name", address, resolvers],
    queryFn: async () => await getName(apiUrl, { address, resolvers }),
    initialData: override ? override.name : null,
    enabled: !override, // Don't even fetch if overriding
  });
}
