"use client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  ActionOutput,
  SendTransactionParameters,
  Step,
  WriteContractParameters,
  SignMessageParameters,
  SignTypedDataParameters,
} from "./types";
import { useSendTransaction } from "./hooks/useSendTransaction";
import { ActionError, ActionState } from "./hooks/types";
import { useSignMessage } from "./hooks/useSignMessage";
import { useSignTypedData } from "./hooks/useSignTypedData";
import { useWriteContract } from "./hooks/useWriteContract";
import { useAccount, useConfig } from "wagmi";
import { switchChain } from "wagmi/actions";

interface WalletActionFlowContextType {
  steps: Step[]; // Passthrough for convenience
  progress: () => void;
  resetAction: () => void;
  resetFlow: () => void;
  state: {
    stepNumber: number;
    stepName: string;
    actionState: ActionState;
    actionError?: ActionError;
  };
}

export const WalletActionFlowContext = createContext<WalletActionFlowContextType>({
  steps: [],
  progress: () => {},
  resetAction: () => {},
  resetFlow: () => {},
  state: {
    stepNumber: 0,
    stepName: "",
    actionState: "idle",
    actionError: undefined,
  },
});

interface WalletActionFlowProps {
  chainId: number;
  steps: Step[];
  onCompletion?: (finalActionOutput: ActionOutput) => void;
  onConnectWalletRequest?: () => void;
  autoProgressOnStepChange?: boolean;
  children: ReactNode;
}

export function WalletActionFlow({
  chainId,
  steps,
  onCompletion,
  onConnectWalletRequest,
  autoProgressOnStepChange,
  children,
}: WalletActionFlowProps) {
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [prevActionOutput, setPrevActionOutput] = useState<ActionOutput | undefined>(undefined);
  const [shouldProgress, setShouldProgress] = useState<boolean>(false);
  const { address, chainId: connectedChainId } = useAccount();
  const config = useConfig();

  const currentStep = useMemo(() => {
    return steps[stepNumber];
  }, [steps, stepNumber]);

  const handleActionSuccess = useCallback(
    (actionType: Step["type"], actionOutput: ActionOutput) => {
      // Only listen if it's the current type
      if (actionType == currentStep.type) {
        setPrevActionOutput(actionOutput);
        setStepNumber((stepNumber) => {
          if (stepNumber == steps.length - 1) {
            onCompletion?.(prevActionOutput!);
            return stepNumber;
          } else {
            setShouldProgress(!!autoProgressOnStepChange);
            return stepNumber + 1;
          }
        });
      }
    },
    [currentStep, setPrevActionOutput, setStepNumber, setShouldProgress, autoProgressOnStepChange]
  );

  const { sendTransaction, ...sendTransactionData } = useSendTransaction({
    chainId,
    onSuccess: useCallback(
      (output: ActionOutput) => handleActionSuccess("send-transaction", output),
      [handleActionSuccess]
    ),
  });

  const { writeContract, ...writeContractData } = useWriteContract({
    chainId,
    onSuccess: useCallback(
      (output: ActionOutput) => handleActionSuccess("write-contract", output),
      [handleActionSuccess]
    ),
  });

  const { signMessage, ...signMessageData } = useSignMessage({
    chainId,
    onSuccess: useCallback(
      (output: ActionOutput) => handleActionSuccess("sign-message", output),
      [handleActionSuccess]
    ),
  });

  const { signTypedData, ...signTypedDataData } = useSignTypedData({
    chainId,
    onSuccess: useCallback(
      (output: ActionOutput) => handleActionSuccess("sign-typed-data", output),
      [handleActionSuccess]
    ),
  });

  const {
    state: actionState,
    error: actionError,
    reset: resetAction,
  } = useMemo(() => {
    switch (currentStep.type) {
      case "send-transaction":
        return sendTransactionData;
      case "write-contract":
        return writeContractData;
      case "sign-message":
        return signMessageData;
      case "sign-typed-data":
        return signTypedDataData;
    }
  }, [currentStep, sendTransactionData, writeContractData, signMessageData, signTypedDataData]);

  const progress = useCallback(async () => {
    if (!address) {
      onConnectWalletRequest?.();
    } else if (actionState == "idle") {
      if (connectedChainId != chainId) {
        try {
          await switchChain(config, { chainId });
        } catch (e) {
          console.error("Failed to switch chaind", e);
          return;
        }
      }

      let actionRequest = undefined;
      if (typeof currentStep.action === "function") {
        actionRequest = await currentStep.action(prevActionOutput);
      } else {
        actionRequest = currentStep.action;
      }

      if (actionRequest == undefined) {
        // Skip to the next step, and trigger next action if auto progressing
        setStepNumber((stepNumber) => (stepNumber == steps.length - 1 ? stepNumber : stepNumber + 1));
        setShouldProgress(!!autoProgressOnStepChange);
      } else {
        switch (currentStep.type) {
          case "send-transaction":
            sendTransaction(currentStep.name, actionRequest as SendTransactionParameters);
            break;
          case "write-contract":
            writeContract(currentStep.name, actionRequest as WriteContractParameters);
          case "sign-message":
            signMessage(actionRequest as SignMessageParameters);
            break;
          case "sign-typed-data":
            signTypedData(actionRequest as SignTypedDataParameters);
            break;
        }
      }
    }
  }, [
    onConnectWalletRequest,
    connectedChainId,
    actionState,
    prevActionOutput,
    setStepNumber,
    setShouldProgress,
    currentStep,
    sendTransaction,
    address,
    config,
  ]);

  const resetActions = useCallback(() => {
    sendTransactionData.reset();
    writeContractData.reset();
    signMessageData.reset();
    signTypedDataData.reset();
  }, [sendTransactionData.reset, writeContractData.reset, signMessageData.reset, signTypedDataData.reset]);

  const resetFlow = useCallback(() => {
    resetActions();
    setStepNumber(0);
  }, [resetActions, setStepNumber]);

  // Auto progressing on step change
  useEffect(() => {
    if (shouldProgress) {
      progress();
      setShouldProgress(false);
    }
  }, [stepNumber, progress, shouldProgress, setShouldProgress]);

  // Reset all actions on step progress
  useEffect(() => {
    resetActions();
  }, [stepNumber, resetActions]);

  // Reset flow on completion
  useEffect(() => {
    if (stepNumber == steps.length - 1 && actionState == "success") {
      resetFlow();
    }
  }, [stepNumber, actionState]);

  // Reset flow on changing account, or chainId
  useEffect(() => {
    resetFlow();
  }, [address, connectedChainId]);

  return (
    <WalletActionFlowContext.Provider
      value={{
        steps,
        progress,
        resetAction,
        resetFlow,
        state: {
          stepNumber,
          stepName: steps[stepNumber].name,
          actionState,
          actionError: actionError,
        },
      }}
    >
      {children}
    </WalletActionFlowContext.Provider>
  );
}

export function useWalletActionFlowContext() {
  return useContext(WalletActionFlowContext);
}
