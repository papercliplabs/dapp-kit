import { cn } from "../../../theme";
import { HTMLAttributes } from "react";

interface NameRendererProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
}

export function NameRenderer({ name, className, ...props }: NameRendererProps) {
  return name ? (
    <div className={cn(className)} {...props}>
      {name}
    </div>
  ) : (
    <>LOADING: TODO</>
  );
}
