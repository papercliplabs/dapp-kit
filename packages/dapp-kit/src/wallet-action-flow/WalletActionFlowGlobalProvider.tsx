"use client";
import { Toaster } from "@/ui/sonner";
import { ComponentProps, createContext, ReactNode, useCallback, useContext, useState } from "react";
import { toast } from "sonner";
import { waitForTransactionReceipt } from "wagmi/actions";
import { useConfig } from "wagmi";
import { Hex } from "viem";
import { WalletActionFlowToast } from "./WalletActionFlowToast";

interface Transaction {
  hash: Hex;
  name: string;
  status: "pending" | "success" | "reverted";
}

interface WalletActionFlowGlobalContextType {
  transactions: Transaction[];
  addTransaction?: (hash: Hex, name: string, onSettle?: (status: "success" | "reverted") => void) => void;
  getTransaction?: (hash: Hex) => Transaction | undefined;
}

const WalletActionFlowGlobalContext = createContext<WalletActionFlowGlobalContextType>({
  transactions: [],
  addTransaction: undefined,
});

interface WalletActionFlowGlobalProviderProps {
  toastPosition?: ComponentProps<typeof Toaster>["position"];
  customToaster?: typeof WalletActionFlowToast;
  children: ReactNode;
}

export function WalletActionFlowGlobalProvider({
  toastPosition,
  customToaster,
  children,
}: WalletActionFlowGlobalProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const config = useConfig();

  const ToasterComponent = customToaster ?? WalletActionFlowToast;

  const addTransaction = useCallback(
    async (hash: Hex, name: string, onSettle?: (status: "success" | "reverted") => void) => {
      const toastId = toast.custom((id) => <ToasterComponent actionName={name} txHash={hash} txState="pending" />, {
        duration: Infinity,
      });

      const receipt = await waitForTransactionReceipt(config, { hash });
      const status = receipt.status;
      onSettle?.(status);
      setTransactions((transactions) => {
        return [...transactions.filter((txn) => txn.hash != hash), { hash, name, status: status }];
      });

      // Update toast
      toast.custom(() => <ToasterComponent actionName={name} txHash={hash} txState={status} />, {
        id: toastId,
        duration: 5000,
      });
    },
    [setTransactions, config]
  );

  return (
    <WalletActionFlowGlobalContext.Provider
      value={{
        transactions,
        addTransaction,
      }}
    >
      {children}
      <Toaster position={toastPosition} />
    </WalletActionFlowGlobalContext.Provider>
  );
}

export function useWalletActionFlowGlobalContext() {
  return useContext(WalletActionFlowGlobalContext);
}
