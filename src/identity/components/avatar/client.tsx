"use client";
import { useQuery } from "@tanstack/react-query";
import { AvatarRenderer } from "./AvatarRenderer";
import { AvatarProps } from "./types";
import { getAvatar } from "../../api";
import { getAvatarCached } from "./data";

export function Avatar({ config, address, resolvers, ...props }: AvatarProps) {
  const { data: avatar } = useQuery({
    queryKey: ["avatar", address],
    queryFn: async () => await getAvatarCached({ config, address, resolvers }),
  });

  return <AvatarRenderer address={address} imgSrc={avatar?.value ?? undefined} {...props} />;
}
