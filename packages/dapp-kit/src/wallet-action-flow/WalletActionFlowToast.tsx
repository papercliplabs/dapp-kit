import { cn } from "@/ui";
import { ArrowUpRight, CircleCheck, CircleX, LoaderCircle } from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";
import { Hex } from "viem";
import { usePublicClient } from "wagmi";

interface WalletActionFlowToastProps extends HTMLAttributes<HTMLAnchorElement> {
  actionName: string;
  txState: "pending" | "success" | "reverted";
  txHash: Hex;
}

const TX_STATE_INFO_MAPPING: Record<WalletActionFlowToastProps["txState"], { icon: ReactNode }> = {
  pending: { icon: <LoaderCircle size={16} className="dk-animate-spin" /> },
  success: { icon: <CircleCheck size={16} /> },
  reverted: { icon: <CircleX size={16} /> },
};

export function WalletActionFlowToast({
  actionName,
  txState,
  txHash,
  className,
  ...props
}: WalletActionFlowToastProps) {
  const publicClient = usePublicClient();
  const { icon } = TX_STATE_INFO_MAPPING[txState];

  return (
    <a
      href={publicClient?.chain.blockExplorers?.default.url + "/tx/" + txHash}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "dk-flex dk-p-3 dk-bg-primary dk-rounded-md dk-w-[var(--width)] dk-text-primary-foreground dk-text-sm dk-items-center dk-justify-between dk-pointer-events-auto",
        "hover:dk-bg-primary/90 dk-transition-colors",
        className
      )}
      {...props}
    >
      <div className="dk-flex dk-gap-2 dk-items-center">
        {icon}
        <span>{actionName}</span>
      </div>
      <ArrowUpRight size={16} />
    </a>
  );
}
