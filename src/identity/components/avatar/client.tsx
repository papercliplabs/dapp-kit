"use client";
import { useQuery } from "@tanstack/react-query";
import { AvatarRenderer } from "./AvatarRenderer";
import { AvatarProps } from "./types";
import { getAvatarCached } from "./data";
import { safeFetch } from "../../../utils";
import { getAvatar } from "../../api";

interface AvatarClientProps extends AvatarProps {
  apiUrl?: string; // Optional API URL to use instead of the server action
}

export function Avatar({ config, address, resolvers, apiUrl, ...props }: AvatarClientProps) {
  const { data: avatar } = useQuery({
    queryKey: ["avatar", address],
    queryFn: async () => {
      return apiUrl ? safeFetch<ReturnType<typeof getAvatar>>(apiUrl) : getAvatarCached({ config, address, resolvers });
    },
  });

  return <AvatarRenderer address={address} imgSrc={avatar?.value ?? undefined} {...props} />;
}
