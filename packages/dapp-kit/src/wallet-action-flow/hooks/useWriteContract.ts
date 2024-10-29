"use client";
import {
  useAccount,
  useBalance,
  useConfig,
  useWaitForTransactionReceipt,
  useWriteContract as wagmi_useWriteContract,
} from "wagmi";

import { ActionError, ActionHookParameters, ActionHookBaseReturnType, ActionState } from "./types";
import { WriteContractParameters } from "../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseWaitForTransactionReceiptError, parseWriteContractError } from "./utils";
import { useWalletActionFlowGlobalContext } from "../WalletActionFlowGlobalProvider";
import { estimateGas } from "wagmi/actions";
import { encodeFunctionData } from "viem";

const GAS_BUFFER = 0.2; // Gives buffer on gas estimate to help prevent out of gas error (internal gas consumption might be higher than net due to refunds)

interface UseWriteContractReturnType extends ActionHookBaseReturnType {
  writeContract: (name: string, request: WriteContractParameters) => void;
}

export function useWriteContract({ chainId, onSuccess }: ActionHookParameters): UseWriteContractReturnType {
  const [error, setError] = useState<ActionError | undefined>(undefined);
  const { address, chain: connectedChainId } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { addTransaction } = useWalletActionFlowGlobalContext();
  const config = useConfig();

  const {
    data: hash,
    writeContractAsync,
    status: writeContractStatus,
    reset: resetWriteContract,
    error: writeContractError,
  } = wagmi_useWriteContract();

  const {
    data: receipt,
    status: waitForTransactionStatus,
    error: waitForTransactionReceiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const state: ActionState = useMemo(() => {
    switch (writeContractStatus) {
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
  }, [writeContractStatus, waitForTransactionStatus]);

  // Lifecycle
  useEffect(() => {
    switch (state) {
      case "error-signature":
        setError(parseWriteContractError(writeContractError));

        // Automatically reset on signature error (likely reject)
        resetWriteContract();
        break;
      case "success":
        onSuccess({ type: "transaction", receipt: receipt! });
        break;
      case "error-transaction":
        setError(parseWaitForTransactionReceiptError(waitForTransactionReceiptError));

        // Automatically reset on txn error
        resetWriteContract();
        break;
      case "idle":
        break;
      default:
        // Clear error on any other state
        setError(undefined);
        break;
    }
  }, [state, setError, writeContractError, resetWriteContract, onSuccess, receipt, waitForTransactionReceiptError]);

  const writeContract = useCallback(
    async (name: string, request: WriteContractParameters) => {
      if (state == "idle" && address && balanceData) {
        let gasEstimateWithBuffer;
        try {
          const data = encodeFunctionData(request);
          const gasEstimate = await estimateGas(config, {
            to: request.address,
            value: request.value,
            account: address,
            data,
          });
          gasEstimateWithBuffer = (gasEstimate * BigInt((1 + GAS_BUFFER) * 1000)) / BigInt(1000);
        } catch (e) {
          console.error("Error estimating gas, using fallback", e);
          gasEstimateWithBuffer = request.gasFallback; // Use fallback when gas estimation fails
        }

        const txCost = (request?.value ?? BigInt(0)) + gasEstimateWithBuffer;
        if (txCost > balanceData.value) {
          setError({ shortMessage: "Wallet has insufficient funds for transaction.", detailedMessage: "" });
        } else {
          try {
            const hash = await writeContractAsync({
              gas: gasEstimateWithBuffer,
              chainId,
              ...request,
            });
            addTransaction?.(hash, name);
          } catch (e) {
            // Ignore, we handle errors in lifecycle
          }
        }
      }
    },
    [state, address, balanceData, chainId, writeContractAsync, addTransaction]
  );

  // Clear on changing account or chainId
  useEffect(() => {
    setError(undefined);
    resetWriteContract();
  }, [address, connectedChainId]);

  const reset = useCallback(() => {
    setError(undefined);
    resetWriteContract();
  }, [setError, resetWriteContract]);

  return { state, error, writeContract, reset };
}
