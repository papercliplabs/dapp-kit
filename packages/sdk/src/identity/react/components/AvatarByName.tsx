"use client";
import { zeroAddress } from "viem";
import { HTMLAttributes } from "react";
import { useAvatarByName, UseAvatarByNameParams } from "../hooks";
import { AvatarRenderer } from "./Avatar";

interface AvatarByNameProps extends UseAvatarByNameParams, HTMLAttributes<HTMLDivElement> {
  size: number;
}

export function AvatarByName({ name, size, resolver, ...props }: AvatarByNameProps) {
  const { data: avatar } = useAvatarByName({ name, resolver });

  return <AvatarRenderer avatar={avatar ?? undefined} address={zeroAddress} size={size} {...props} />;
}
