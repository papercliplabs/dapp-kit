"use client";
import { useQuery } from "@tanstack/react-query";
import { NameRenderer } from "./NameRenderer";
import { NameProps } from "./types";
import { getName } from "../../api";

export function Name({ config, address, resolvers, ...props }: NameProps) {
  const { data: name } = useQuery({
    queryKey: ["name", address],
    queryFn: () => getName({ config, address, resolvers }),
  });

  return <NameRenderer name={name?.value} {...props} />;
}
