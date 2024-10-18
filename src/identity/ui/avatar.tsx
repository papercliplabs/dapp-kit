"use client";
import clsx from "clsx";
import { HTMLAttributes, useState } from "react";
import { Address } from "viem";
import { cn } from "../../theme";
import { GetAvatarReturnType } from "../api/avatar";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  address: Address;
  size: number;
  avatar?: GetAvatarReturnType;
}

function getLinearGradientForAddress(address: Address) {
  const addr = address.slice(2, 10);
  const seed = parseInt(addr, 16);
  const number = Math.ceil(seed % 0xffffff);
  return `linear-gradient(45deg, #${number.toString(16).padStart(6, "0")}, #FFFFFF)`;
}

export function Avatar({ address, size, avatar, className, ...props }: AvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn("dk-relative dk-rounded-full dk-overflow-hidden", className)}
      style={{
        width: size,
        height: size,
        background: getLinearGradientForAddress(address),
      }}
      {...props}
    >
      {avatar && avatar.value && (
        <img
          src={avatar.value}
          alt=""
          width={size}
          height={size}
          className={clsx(
            "dk-absolute dk-left-0 dk-top-0 dk-transition-opacity dk-duration-500",
            isLoaded ? "dk-opacity-100" : "dk-opacity-0"
          )}
          style={{
            width: size,
            height: size,
          }}
          onLoad={() => setIsLoaded(true)} // Trigger fade-in once the image is fully loaded
        />
      )}
    </div>
  );
}
