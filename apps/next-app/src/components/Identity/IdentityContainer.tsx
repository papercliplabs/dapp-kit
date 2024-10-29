import { cn } from "@paperclip-labs/dapp-kit";
import { HTMLAttributes } from "react";

export default function IdentityContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex gap-2 items-center", className)} {...props} />;
}
