"use client";
import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/ui";
import { useAvatar } from "./useAvatar";
import clsx from "clsx";
import { Address } from "viem";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  address: Address;
  size: number;
}

function getLinearGradientForAddress(address: Address) {
  const addr = address.slice(2, 10);
  const seed = parseInt(addr, 16);
  const number = Math.ceil(seed % 0xffffff);
  return `linear-gradient(45deg, #${number.toString(16).padStart(6, "0")}, #FFFFFF)`;
}

export function Avatar({ address, size, className, ...props }: AvatarProps) {
  const { data: avatar } = useAvatar({ address });

  return <AvatarRenderer address={address} size={size} className={className} avatar={avatar ?? undefined} {...props} />;
}

export function AvatarRenderer({
  address,
  size,
  className,
  avatar,
  ...props
}: Omit<AvatarProps, "resolvers"> & { avatar: string | undefined }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset if address or avatar changes
  useEffect(() => {
    setIsLoaded(false);
  }, [address, avatar]);

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
          onLoad={() => setIsLoaded(true)}
          onError={({ currentTarget }) => currentTarget.remove()}
        />
      )}
    </div>
  );
}
