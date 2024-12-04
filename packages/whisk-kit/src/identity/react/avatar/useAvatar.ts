"use client";
import { getAvatar } from "@/identity/core";
import { useWhiskKitContext } from "@/provider";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function useAvatar({ address }: { address: Address }) {
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
    queryKey: ["avatar", address, resolvers],
    queryFn: async () => await getAvatar(apiUrl, { address, resolvers }),
    initialData: override ? override.avatar : null,
    enabled: !override, // Don't even fetch if overriding
  });
}
