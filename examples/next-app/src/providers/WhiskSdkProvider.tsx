"use client";
import { ReactNode } from "react";
import { WhiskSdkProvider as _WhiskSdkProvider } from "@paperclip-labs/whisk-sdk";

export default function WhiskSdkProvider({ children }: { children: ReactNode }) {
  return (
    <_WhiskSdkProvider
      config={{
        identity: {
          resolvers: ["lens", "base", "uni", "nns", "ens", "farcaster"],
        },
      }}
    >
      {children}
    </_WhiskSdkProvider>
  );
}
