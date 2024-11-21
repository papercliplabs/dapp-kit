"use client";
import { fetchName } from "@/identity/client";
import { GetIdentityParameters } from "@/identity/shared/types";
import { useDappKitContext } from "@/provider";
import { useQuery } from "@tanstack/react-query";

export function useName(parameters: GetIdentityParameters) {
  const { apiUrl } = useDappKitContext();

  return useQuery({
    queryKey: ["name", parameters],
    queryFn: async () => await fetchName(parameters, apiUrl),
  });
}
