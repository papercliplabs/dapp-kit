"use client";
import {
  useAccount,
  useBalance,
  useConfig,
  useWaitForTransactionReceipt,
  useSendTransaction as wagmi_useSendTransaction,
} from "wagmi";
import { ActionError, ActionHookParameters, ActionHookBaseReturnType, ActionState } from "./types";
import { SendTransactionParameters } from "../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseSendTransactionError, parseWaitForTransactionReceiptError } from "./utils";
import { useWalletActionFlowGlobalContext } from "../WalletActionFlowGlobalProvider";
import { estimateGas } from "wagmi/actions";

const GAS_BUFFER = 0.2; // Gives buffer on gas estimate to help prevent out of gas error (internal gas consumption might be higher than net due to refunds)

interface UseSendTransactionReturnType extends ActionHookBaseReturnType {
  sendTransaction: (name: string, request: SendTransactionParameters) => void;
}

export function useSendTransaction({ chainId, onSuccess }: ActionHookParameters): UseSendTransactionReturnType {
  const [error, setError] = useState<ActionError | undefined>(undefined);
  const { address } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { addTransaction } = useWalletActionFlowGlobalContext();
  const config = useConfig();

  const {
    data: hash,
    sendTransactionAsync,
    status: sendTransactionStatus,
    reset: resetSendTransaction,
    error: sendTransactionError,
  } = wagmi_useSendTransaction();

  const {
    data: receipt,
    status: waitForTransactionStatus,
    error: waitForTransactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const state: ActionState = useMemo(() => {
    switch (sendTransactionStatus) {
      case "idle":
        return "idle";
      case "pending":
        return "pending-signature";
      case "error":
        return "error-signature";
      case "success":
        switch (waitForTransactionStatus) {
          case "pending":
            return "pending-confirmation";
          case "success":
            return "success";
          case "error":
            return "error-transaction";
        }
    }
  }, [sendTransactionStatus, waitForTransactionStatus]);

  // Lifecycle
  useEffect(() => {
    switch (state) {
      case "error-signature":
        setError(parseSendTransactionError(sendTransactionError));

        // Automatically reset on signature error (likely reject)
        resetSendTransaction();
        break;
      case "success":
        onSuccess({ type: "transaction", receipt: receipt! });
        break;
      case "error-transaction":
        setError(parseWaitForTransactionReceiptError(waitForTransactionReceiptError));

        // Automatically reset on txn error
        resetSendTransaction();
        break;
      case "idle":
        break;
      default:
        // Clear error on any other state
        setError(undefined);
        break;
    }
  }, [state, setError, sendTransactionError, resetSendTransaction, onSuccess, receipt, waitForTransactionReceiptError]);

  const sendTransaction = useCallback(
    async (name: string, request: SendTransactionParameters) => {
      if (state == "idle" && address && balanceData) {
        let gasEstimateWithBuffer;
        try {
          const gasEstimate = await estimateGas(config, { ...request, account: address });
          gasEstimateWithBuffer = (gasEstimate * BigInt((1 + GAS_BUFFER) * 1000)) / BigInt(1000);
        } catch (e) {
          console.error("Error estimating gas, using fallback", e);
          gasEstimateWithBuffer = request.gasFallback; // Use fallback when gas estimation fails
        }

        const txCost = (request.value ?? BigInt(0)) + gasEstimateWithBuffer;

        if (txCost > balanceData.value) {
          setError({ shortMessage: "Wallet has insufficient funds for transaction.", detailedMessage: "" });
        } else {
          try {
            const hash = await sendTransactionAsync({
              ...request,
              gas: gasEstimateWithBuffer,
              chainId,
            });
            addTransaction?.(hash, name);
          } catch (e) {
            // Ignore, we handle errors in lifecycle
          }
        }
      }
    },
    [state, config, address, balanceData, chainId, sendTransactionAsync, addTransaction]
  );

  const reset = useCallback(() => {
    setError(undefined);
    resetSendTransaction();
  }, [setError, resetSendTransaction]);

  return { state, error, sendTransaction, reset };
}
