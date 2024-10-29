import { HTMLAttributes } from "react";
import { GetNameReturnType } from "../api/name";

interface NameProps extends HTMLAttributes<HTMLDivElement> {
  name?: GetNameReturnType;
}

export function Name({ name, className, ...props }: NameProps) {
  return name ? <>{name.value}</> : <>LOADING: TODO</>;
}
