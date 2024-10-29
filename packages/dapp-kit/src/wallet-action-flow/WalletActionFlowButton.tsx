"use client";
import { ComponentType, HTMLAttributes, useMemo } from "react";
import { cn } from "@/ui/utils/cn";
import { Button } from "@/ui/button";
import { useWalletActionFlowContext } from "./WalletActionFlow";

interface TransactionButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, "children"> {
  customButtonComponent?: ComponentType<HTMLAttributes<HTMLButtonElement>>;
}

export function WalletActionFlowButton({ customButtonComponent, className, ...props }: TransactionButtonProps) {
  const {
    progress,
    state: { stepName, actionState },
  } = useWalletActionFlowContext();

  const buttonLabel = useMemo(() => {
    switch (actionState) {
      case "pending-signature":
        return "Confirm in Wallet";
      case "pending-confirmation":
        return "Pending";
      default:
        return stepName;
    }
  }, [actionState, stepName]);

  const ButtonComponent = customButtonComponent || Button;

  return (
    <ButtonComponent
      onClick={progress}
      disabled={actionState == "pending-confirmation" || actionState == "pending-signature"}
      className={cn(className)}
      {...props}
    >
      {buttonLabel}
    </ButtonComponent>
  );
}
