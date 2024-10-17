"use client";
import { useQuery } from "@tanstack/react-query";
import { NameRenderer } from "./NameRenderer";
import { NameProps } from "./types";
import { getNameCached } from "./data";

interface NameClientProps extends NameProps {
  apiUrl: string;
}

export function Name({ config, address, resolvers, apiUrl, ...props }: NameClientProps) {
  const { data: name } = useQuery({
    queryKey: ["name", address],
    queryFn: async () => getNameCached({ config, address, resolvers }),
  });

  return <NameRenderer name={name?.value} {...props} />;
}
