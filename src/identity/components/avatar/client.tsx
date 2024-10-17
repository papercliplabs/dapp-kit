"use client";
import { useQuery } from "@tanstack/react-query";
import { AvatarRenderer } from "./AvatarRenderer";
import { getAvatar } from "../../api";
import { AvatarProps } from "./types";

export function Avatar({ config, address, resolvers, ...props }: AvatarProps) {
  const { data: avatar } = useQuery({
    queryKey: ["avatar", address],
    queryFn: () => getAvatar({ config, address, resolvers }),
  });

  return <AvatarRenderer address={address} imgSrc={avatar?.value ?? undefined} {...props} />;
}
