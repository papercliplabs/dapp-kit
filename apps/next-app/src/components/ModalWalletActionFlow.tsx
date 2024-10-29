"use client";
import {
  ActionOutput,
  createValidatedSignTypedDataParams,
  Step,
  WalletActionFlow,
  WalletActionFlowButton,
  WalletActionFlowErrorMessage,
  WalletActionFlowProgress,
} from "@paperclip-labs/dapp-kit/wallet-action-flow";
import { sepolia } from "viem/chains";
import { useChainId } from "wagmi";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const flowSteps: Step[] = [
  {
    name: "Sign typed data",
    type: "sign-typed-data",
    action: createValidatedSignTypedDataParams({
      domain: {
        name: "Dapp Kit",
        version: "1",
        chainId: sepolia.id,
      },
      types: {
        Person: [
          { name: "name", type: "string" },
          { name: "wallet", type: "address" },
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person" },
          { name: "contents", type: "string" },
        ],
      },
      primaryType: "Mail",
      message: {
        from: {
          name: "Cow",
          wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
        },
        to: {
          name: "Bob",
          wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        },
        contents: "Hello, Bob!",
      },
    }),
  },
  {
    name: "Sign message",
    type: "sign-message",
    action: {
      message: "Sign this message ",
    },
  },
  {
    name: "Send signed message as txn data",
    type: "send-transaction",
    action: async (prevActionOutput?: ActionOutput) => ({
      to: "0x1aa7e3Af810c0E93629F50f771548B03B095CFFA",
      data: prevActionOutput?.type == "sign" ? prevActionOutput.signature : "0x",
      value: BigInt(1),
      gasFallback: BigInt(40000),
    }),
  },
];

export default function ModalWalletActionFlow() {
  const chainId = useChainId();
  const [open, setOpen] = useState<boolean>(false);
  const { openConnectModal } = useConnectModal();

  return (
    <WalletActionFlow
      steps={flowSteps}
      chainId={chainId}
      onCompletion={(o) => {
        console.log(o);
        setOpen(false);
      }}
      onConnectWalletRequest={openConnectModal}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>Open Modal</Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
          <DialogTitle>Modal Wallet Action Flow</DialogTitle>
          <div className="w-full flex items-center justify-center text-center">
            This is an example of using the WalletActionFlow inside a modal.
          </div>
          <div className="max-w-sm w-full flex flex-col gap-2 items-center">
            <WalletActionFlowButton className="w-full" />
            <WalletActionFlowErrorMessage />
            <WalletActionFlowProgress />
          </div>
        </DialogContent>
      </Dialog>
    </WalletActionFlow>
  );
}
