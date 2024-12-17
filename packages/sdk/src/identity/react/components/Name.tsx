"use client";
import { useName, UseNameParams } from "../hooks/useName";
import { cn } from "../../../ui";
import { formatAddress } from "../../../format";
import { motion, AnimatePresence } from "motion/react";
import { Address } from "viem";
import { HTMLAttributes } from "react";

interface NameProps extends UseNameParams, HTMLAttributes<HTMLDivElement> {}

export function Name({ address, resolvers, ...props }: NameProps) {
  const { data: name } = useName({ address, resolvers });

  return <NameRenderer address={address} name={name ?? undefined} {...props} />;
}

export function NameRenderer({
  address,
  name,
  className,
  ...props
}: Omit<NameProps, "resolvers"> & { address: Address; name: string | undefined }) {
  return (
    <div className={cn("relative", className)} {...props}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={name ? "loaded" : "loading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className={cn("dk-text-ellipsis dk-overflow-hidden dk-whitespace-nowrap")}
        >
          {name ?? formatAddress({ address })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
