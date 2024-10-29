"use client";
import { zeroAddress } from "viem";
import { Avatar as AvatarDappKit, Name as NameDappKit } from "@paperclip-labs/dapp-kit/identity/ui";
import { useQueries } from "@tanstack/react-query";
import { safeFetch } from "@paperclip-labs/dapp-kit";
import { GetAvatarReturnType, GetNameReturnType } from "@paperclip-labs/dapp-kit/identity/api";
import IdentityContainer from "./IdentityContainer";
import { IdentityProps } from "./types";

export function Identity({ address, avatarSize, hideName, hideAvatar, ...props }: IdentityProps) {
  const [{ data: name }, { data: avatar }] = useQueries({
    queries: [
      {
        queryKey: ["name", address],
        queryFn: async () => await safeFetch<GetNameReturnType>(`/api/identity/${address}/name`),
        enabled: !!address,
      },
      {
        queryKey: ["avatar", address],
        queryFn: async () => await safeFetch<GetAvatarReturnType>(`/api/identity/${address}/avatar`),
        enabled: !!address,
      },
    ],
  });

  return (
    <IdentityContainer {...props}>
      {!hideAvatar && <AvatarDappKit address={address ?? zeroAddress} avatar={avatar ?? undefined} size={avatarSize} />}
      {!hideName && <NameDappKit name={name ?? undefined} />}
    </IdentityContainer>
  );
}
