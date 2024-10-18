import { cn } from "../../theme";
import { HTMLAttributes } from "react";
import { GetNameReturnType } from "../api/name";

interface NameProps extends HTMLAttributes<HTMLDivElement> {
  name?: GetNameReturnType;
}

export function Name({ name, className, ...props }: NameProps) {
  return name ? (
    <div className={cn(className)} {...props}>
      {name.value}
    </div>
  ) : (
    <>LOADING: TODO</>
  );
}
