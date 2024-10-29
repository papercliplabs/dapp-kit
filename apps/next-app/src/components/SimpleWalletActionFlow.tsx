"use client";
import {
  ActionOutput,
  Step,
  WalletActionFlow,
  WalletActionFlowButton,
  WalletActionFlowErrorMessage,
} from "@paperclip-labs/dapp-kit/wallet-action-flow";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";
import { useChainId } from "wagmi";

const flowSteps: Step[] = [
  {
    name: "Sign Message",
    type: "sign-message",
    action: {
      message: "My message :)",
    },
  },
  {
    name: "Send signed message as txn data",
    type: "send-transaction",
    action: async (prevActionOutput?: ActionOutput) => ({
      to: "0x1aa7e3Af810c0E93629F50f771548B03B095CFFA",
      data: prevActionOutput?.type == "sign" ? prevActionOutput.signature : "0x",
      value: BigInt(1),
      chainId: sepolia.id,
      gasFallback: BigInt(40000),
    }),
  },
];

export default function SimpleWalletActionFlow() {
  const chainId = useChainId();
  const { openConnectModal } = useConnectModal();

  return (
    <WalletActionFlow steps={flowSteps} chainId={chainId} onConnectWalletRequest={openConnectModal}>
      <div className="max-w-sm w-full flex flex-col gap-2 items-center">
        <WalletActionFlowButton className="w-full" />
        <WalletActionFlowErrorMessage />
      </div>
    </WalletActionFlow>
  );
}
