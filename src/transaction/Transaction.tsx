"use client";
import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { Action, ActionInput, ActionState } from "./types";
import { useSendTransaction, useSignTypedData, useWaitForTransactionReceipt } from "wagmi";

interface TransactionContextType {
  progress: () => void;
  reset: () => void;
  state: {
    stepNumber: number;
    actionState: ActionState;
  };
}

export const TransactionContext = createContext<TransactionContextType>({
  progress: () => {},
  reset: () => {},
  state: {
    stepNumber: 0,
    actionState: "idle",
  },
});

interface TransactionProps {
  actions: Action[];
  onProgress?: (stepNumber: number, actionState: ActionState, actionInput: ActionInput) => void;
  onCompletion?: () => void;
  children: ReactNode;
}

export function Transaction({ actions, onProgress, onCompletion, children }: TransactionProps) {
  const [stepNumber, setStepNumber] = useState<number>(0);

  const { data: hash, sendTransaction, status: sendTransactionStatus } = useSendTransaction();
  const { status: waitForTransactionStatus } = useWaitForTransactionReceipt({ hash });

  const { signTypedData, status: signTypedDataStatus } = useSignTypedData();

  const actionState: ActionState = useMemo(() => {
    // TODO
    return "idle";
  }, []);

  const progress = useCallback(() => {
    console.log("TODO: progress");
  }, []);

  const reset = useCallback(() => {
    console.log("TODO: reset");
  }, []);

  return (
    <TransactionContext.Provider value={{ progress, reset, state: { stepNumber, actionState } }}>
      {children}
    </TransactionContext.Provider>
  );
}
