"use client";
import { useName } from "./useName";
import { cn } from "@/ui";
import { formatAddress } from "@/format";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Address } from "viem";

interface NameProps extends HTMLMotionProps<"div"> {
  address: Address;
}

export function Name({ address, ...props }: NameProps) {
  const { data: name } = useName({ address });

  return <NameRenderer address={address} name={name ?? undefined} {...props} />;
}

export function NameRenderer({
  address,
  name,
  className,
  ...props
}: Omit<NameProps, "resolvers"> & { address: Address; name: string | undefined }) {
  return (
    <div className="relative">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={name ? "loaded" : "loading"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className={cn("dk-text-ellipsis dk-overflow-hidden dk-whitespace-nowrap", className)}
          {...props}
        >
          {name ?? formatAddress({ address })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
