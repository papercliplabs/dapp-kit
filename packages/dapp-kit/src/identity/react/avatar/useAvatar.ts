"use client";
import { fetchAvatar } from "@/identity/client";
import { GetIdentityParameters } from "@/identity/shared/types";
import { useDappKitContext } from "@/provider";
import { useQuery } from "@tanstack/react-query";

export function useAvatar(parameters: GetIdentityParameters) {
  const { apiUrl } = useDappKitContext();

  return useQuery({
    queryKey: ["avatar", parameters],
    queryFn: async () => await fetchAvatar(parameters, apiUrl),
  });
}
