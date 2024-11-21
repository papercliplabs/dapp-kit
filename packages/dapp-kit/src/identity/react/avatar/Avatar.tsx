"use client";
import { GetIdentityParameters } from "@/identity/shared/types";
import { HTMLAttributes, useState } from "react";
import { cn } from "@/ui";
import { useAvatar } from "./useAvatar";
import clsx from "clsx";
import { Address } from "viem";

interface AvatarProps extends GetIdentityParameters, HTMLAttributes<HTMLDivElement> {
  size: number;
}

function getLinearGradientForAddress(address: Address) {
  const addr = address.slice(2, 10);
  const seed = parseInt(addr, 16);
  const number = Math.ceil(seed % 0xffffff);
  return `linear-gradient(45deg, #${number.toString(16).padStart(6, "0")}, #FFFFFF)`;
}

export function Avatar({ address, resolvers, size, className, ...props }: AvatarProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: avatar } = useAvatar({ address, resolvers });

  return (
    <div
      className={cn(
        "dk-relative dk-rounded-full dk-overflow-hidden dk-border dk-border-black/10 dk-flex-shrink-0",
        className
      )}
      style={{
        width: size,
        height: size,
      }}
      {...props}
    >
      <div
        className="dk-w-full dk-h-full dk-absolute dk-inset-0"
        style={{ background: getLinearGradientForAddress(address) }}
      />
      {avatar && (
        <img
          src={avatar}
          alt=""
          width={size}
          height={size}
          className={clsx(
            "dk-absolute dk-left-0 dk-top-0 dk-transition-opacity dk-duration-300 w-full h-full",
            isLoaded ? "dk-opacity-100" : "dk-opacity-0"
          )}
          onLoad={() => setIsLoaded(true)} // Trigger fade-in once the image is fully loaded
        />
      )}
    </div>
  );
}
