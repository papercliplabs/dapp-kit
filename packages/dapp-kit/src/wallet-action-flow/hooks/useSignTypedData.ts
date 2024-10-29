"use client";
import { useSignTypedData as wagmi_useSignTypedData } from "wagmi";
import { ActionError, ActionHookParameters, ActionHookBaseReturnType, ActionState } from "./types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseSignMessageError } from "./utils";
import { SignTypedDataParameters } from "wagmi/actions";

interface UseSignMessageReturnType extends ActionHookBaseReturnType {
  signTypedData: (request: SignTypedDataParameters) => void;
}

export function useSignTypedData({ onSuccess }: ActionHookParameters): UseSignMessageReturnType {
  const [error, setError] = useState<ActionError | undefined>(undefined);

  const {
    data: signedTypedData,
    signTypedData: wagmiSignTypedData,
    status: signTypedDataStatus,
    reset: resetSignTypedData,
    error: signTypeDataError,
  } = wagmi_useSignTypedData();

  const state: ActionState = useMemo(() => {
    switch (signTypedDataStatus) {
      case "idle":
        return "idle";
      case "pending":
        return "pending-signature";
      case "error":
        return "error-signature";
      case "success":
        return "success";
    }
  }, [signTypedDataStatus]);

  // Lifecycle
  useEffect(() => {
    switch (state) {
      case "error-signature":
        setError(parseSignMessageError(signTypeDataError));

        // Automatically reset on signature error (likely reject)
        resetSignTypedData();
        break;
      case "success":
        onSuccess({ type: "sign", signature: signedTypedData! });
        break;
      case "idle":
        break;
      default:
        // Clear error on any other state
        setError(undefined);
        break;
    }
  }, [state, setError, signTypeDataError, resetSignTypedData, onSuccess, signedTypedData]);

  const signTypedData = useCallback(
    async (request: SignTypedDataParameters) => {
      if (state == "idle") {
        wagmiSignTypedData(request);
      }
    },
    [state, wagmiSignTypedData]
  );

  const reset = useCallback(() => {
    setError(undefined);
    resetSignTypedData();
  }, [setError, resetSignTypedData]);

  return { state, error, signTypedData, reset };
}
