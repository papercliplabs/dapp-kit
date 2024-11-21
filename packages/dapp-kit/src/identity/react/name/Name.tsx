"use client";
import { GetIdentityParameters } from "@/identity/shared/types";
import { useMemo } from "react";
import { useName } from "./useName";
import { cn } from "@/ui";
import { formatAddress } from "@/format";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

interface NameProps extends GetIdentityParameters, HTMLMotionProps<"div"> {}

export function Name({ address, resolvers, className, ...props }: NameProps) {
  const { data: name } = useName({ address, resolvers });

  const renderName = useMemo(() => {
    return name ?? formatAddress({ address });
  }, [name, address]);

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
          {renderName}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
