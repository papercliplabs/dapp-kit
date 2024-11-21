"use client";
import IdentityExample from "@/components/IdentityExample";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { Identity } from "@/components/Identity/IdentityServer";
// import SimpleWalletActionFlow from "@/components/SimpleWalletActionFlow";
// import ModalWalletActionFlow from "@/components/ModalWalletActionFlow";

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-8 p-4 items-center">
      <ConnectButton />
      <IdentityExample />
      {/* <Identity address="0x3380A055844CF74E7704E6dddDd44E9D09D2694C" avatarSize={32} /> */}
      {/* <div className="w-full flex flex-col items-center">
        <span>Example of a simple wallet action flow:</span>
        <SimpleWalletActionFlow />
      </div>
      <div className="w-full flex flex-col items-center">
        <span>Example of a wallet action flow inside a modal:</span>
        <ModalWalletActionFlow />
      </div> */}
    </div>
  );
}
