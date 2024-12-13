"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Name, Avatar } from "@paperclip-labs/whisk-sdk/identity";

export default function Home() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col w-full p-4 items-center">
      <ConnectButton />

      {address && (
        <div className="flex gap-2 p-4 items-center">
          <Avatar address={address} size={32} />
          <Name address={address} />
        </div>
      )}
    </div>
  );
}
