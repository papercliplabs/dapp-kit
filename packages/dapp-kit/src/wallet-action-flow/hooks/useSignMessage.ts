"use client";
import { useSignMessage as wagmi_useSignMessage } from "wagmi";
import { ActionError, ActionHookParameters, ActionHookBaseReturnType, ActionState } from "./types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseSignMessageError } from "./utils";
import { SignMessageParameters } from "wagmi/actions";

interface UseSignMessageReturnType extends ActionHookBaseReturnType {
  signMessage: (request: SignMessageParameters) => void;
}

export function useSignMessage({ onSuccess }: ActionHookParameters): UseSignMessageReturnType {
  const [error, setError] = useState<ActionError | undefined>(undefined);

  const {
    data: signedMessage,
    signMessage: wagmiSignMessage,
    status: signMessageStatus,
    reset: resetSignMessage,
    error: signMessageError,
  } = wagmi_useSignMessage();

  const state: ActionState = useMemo(() => {
    switch (signMessageStatus) {
      case "idle":
        return "idle";
      case "pending":
        return "pending-signature";
      case "error":
        return "error-signature";
      case "success":
        return "success";
    }
  }, [signMessageStatus]);

  // Lifecycle
  useEffect(() => {
    switch (state) {
      case "error-signature":
        setError(parseSignMessageError(signMessageError));

        // Automatically reset on signature error (likely reject)
        resetSignMessage();
        break;
      case "success":
        onSuccess({ type: "sign", signature: signedMessage! });
        break;
      case "idle":
        break;
      default:
        // Clear error on any other state
        setError(undefined);
        break;
    }
  }, [state, setError, signMessageError, resetSignMessage, onSuccess, signedMessage]);

  const signMessage = useCallback(
    async (request: SignMessageParameters) => {
      if (state == "idle") {
        wagmiSignMessage(request);
      }
    },
    [state, wagmiSignMessage]
  );

  const reset = useCallback(() => {
    setError(undefined);
    resetSignMessage();
  }, [setError, resetSignMessage]);

  return { state, error, signMessage, reset };
}
