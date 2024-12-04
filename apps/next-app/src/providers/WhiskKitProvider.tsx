"use client";
import { ReactNode } from "react";
import { WhiskKitProvider as _WhiskKitProvider } from "@paperclip-labs/whisk-kit";

export default function WhiskKitProvider({ children }: { children: ReactNode }) {
  return (
    <_WhiskKitProvider
      apiUrl={process.env.NEXT_PUBLIC_API_URL!}
      config={{
        identity: {
          resolvers: ["nns", "ens", "farcaster"],
        },
      }}
    >
      {children}
    </_WhiskKitProvider>
  );
}
