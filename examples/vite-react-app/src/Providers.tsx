import { WhiskSdkProvider } from "@paperclip-labs/whisk-sdk";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WhiskSdkProvider
      config={{
        identity: {
          resolvers: ["lens", "base", "uni", "nns", "ens", "farcaster"],
        },
      }}
    >
      {children}
    </WhiskSdkProvider>
  );
}
