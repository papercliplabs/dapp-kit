"use client";
import { useAccount } from "wagmi";
import { Name, Avatar } from "@paperclip-labs/dapp-kit/identity";
import { zeroAddress } from "viem";
import { useMemo, useState } from "react";

export default function IdentityExample() {
  const { address } = useAccount();

  const [v, setV] = useState<boolean>(false);

  const a = useMemo(() => {
    return v ? address : "0x46a8E86e3195315E438C7d38176992e9CF46a5Dc";
  }, [v, address]);

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => setV((v) => !v)}>Toggle</button>
      <Avatar address={a ?? zeroAddress} resolvers={["nns", "ens", "farcaster"]} size={60} />
      <Name key={a} address={a ?? zeroAddress} resolvers={["nns", "ens", "farcaster"]} className="text-red-500" />
    </div>
  );
}
