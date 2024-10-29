"use client";
import { ComponentType, HTMLAttributes, ReactNode, useMemo } from "react";
import { cn } from "@/ui/utils/cn";
import { Button } from "@/ui/button";
import { useWalletActionFlowContext } from "./WalletActionFlow";
import { LoaderCircle } from "lucide-react";

interface TransactionButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  customButtonComponent?: ComponentType<HTMLAttributes<HTMLButtonElement>>;
  compact?: boolean;
}

export function WalletActionFlowButton({
  customButtonComponent,
  compact,
  className,
  ...props
}: TransactionButtonProps) {
  const {
    progress,
    state: { stepName, actionState },
  } = useWalletActionFlowContext();

  const buttonContent: ReactNode = useMemo(() => {
    switch (actionState) {
      case "pending-signature":
        return <>{compact ? <LoaderCircle size={16} className="dk-animate-spin" /> : "Confirm in Wallet"}</>;
      case "pending-confirmation":
        return (
          <>
            <LoaderCircle size={16} className="dk-animate-spin" />
            {!compact && <span>Pending</span>}
          </>
        );
      default:
        return stepName;
    }
  }, [actionState, stepName]);

  const ButtonComponent = customButtonComponent || Button;

  return (
    <ButtonComponent
      onClick={progress}
      disabled={actionState == "pending-confirmation" || actionState == "pending-signature"}
      className={cn("dk-flex dk-gap-2", className)}
      {...props}
    >
      {buttonContent}
    </ButtonComponent>
  );
}
