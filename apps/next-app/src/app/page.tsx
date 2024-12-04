"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Name, Avatar } from "@paperclip-labs/whisk-kit/identity";

export default function Home() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col w-full gap-8 p-4 items-center">
      <ConnectButton />

      {address && (
        <div className="flex items-center gap-2">
          <Avatar address={address} size={32} />
          <Name address={address} />
        </div>
      )}

      {address && (
        <div className="flex items-center gap-2">
          <Avatar address={address} size={32} />
          <Name address={address} />
        </div>
      )}
    </div>
  );
}
