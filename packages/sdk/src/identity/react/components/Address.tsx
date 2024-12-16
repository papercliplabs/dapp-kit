"use client";
import { cn } from "../../../ui";
import { formatAddress } from "../../../format";
import { motion, AnimatePresence } from "framer-motion";
import { Address as AddressType } from "viem";
import { HTMLAttributes } from "react";
import { useAddress, UseAddressParams } from "../hooks";

interface AddressProps extends UseAddressParams, HTMLAttributes<HTMLDivElement> {}

export function Address({ name, resolver, ...props }: AddressProps) {
  const { data: address } = useAddress({ name, resolver });

  return <AddressRenderer address={address} {...props} />;
}

export function AddressRenderer({
  address,
  className,
  ...props
}: Omit<AddressProps, "resolver" | "name"> & { address?: AddressType | null }) {
  return (
    <div className={cn("relative", className)}>
      {address}
      {/* <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={name ? "loaded" : "loading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className={cn("dk-text-ellipsis dk-overflow-hidden dk-whitespace-nowrap")}
          {...props}
        >
          {name ?? formatAddress({ address })}
        </motion.div>
      </AnimatePresence> */}
    </div>
  );
}
