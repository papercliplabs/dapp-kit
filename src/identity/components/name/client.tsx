"use client";
import { useQuery } from "@tanstack/react-query";
import { NameRenderer } from "./NameRenderer";
import { NameProps } from "./types";
import { getNameCached } from "./data";
import { safeFetch } from "../../../utils";
import { getName } from "../../api";

interface NameClientProps extends NameProps {
  apiUrl?: string; // Optional API URL to use instead of the server action
}

export function Name({ config, address, resolvers, apiUrl, ...props }: NameClientProps) {
  const { data: name } = useQuery({
    queryKey: ["name", address],
    queryFn: async () => {
      return apiUrl ? safeFetch<ReturnType<typeof getName>>(apiUrl) : getNameCached({ config, address, resolvers });
    },
  });

  return <NameRenderer name={name?.value} {...props} />;
}
