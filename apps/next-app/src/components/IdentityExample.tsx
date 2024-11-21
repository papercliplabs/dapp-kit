"use client";
import { useAccount } from "wagmi";
import { Name, Avatar } from "@paperclip-labs/dapp-kit/identity";
import { zeroAddress } from "viem";
import { useMemo, useState } from "react";

export default function IdentityExample() {
  const { address } = useAccount();

  const [v, setV] = useState<boolean>(false);

  const a = useMemo(() => {
    return v ? address : "0x796307f46b108661600e252A23faA2eE11EE6E23";
  }, [v, address]);

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => setV((v) => !v)}>Toggle</button>
      <Avatar address={address ?? zeroAddress} resolvers={["nns", "ens", "farcaster"]} size={60} />
      <Name key={a} address={a ?? zeroAddress} resolvers={["nns", "ens", "farcaster"]} className="text-red-500" />
    </div>
  );
}
