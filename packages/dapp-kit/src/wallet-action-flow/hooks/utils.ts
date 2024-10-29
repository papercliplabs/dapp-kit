import { ChainMismatchError, InsufficientFundsError, UserRejectedRequestError } from "viem";
import { ActionError } from "./types";
import { BaseError } from "wagmi";
import {
  SignTypedDataErrorType,
  SendTransactionErrorType,
  WaitForTransactionReceiptErrorType,
  WriteContractErrorType,
  SignMessageErrorType,
} from "wagmi/actions";

export function parseSignTypedDataError(error: SignTypedDataErrorType | null): ActionError | undefined {
  if (!error) {
    return undefined;
  }

  const detailedMessage = error.message;
  const shortMessage = error.message.includes("User reject")
    ? "User rejected the request."
    : (error as BaseError).shortMessage || error.message;

  //   let shortMessage: string = `Oops, an unknown error occurred - ${error.name}.`;
  //   switch (error.name) {
  //     case "UserRejectedRequestError":
  //       shortMessage = "User rejected the request.";
  //     case "InternalRpcError":
  //       if (error.message.includes("User rejected")) {
  //         shortMessage = "User rejected the request.";
  //       }
  //       break;
  //     case "BaseError":
  //       shortMessage = error.shortMessage;
  //       break;
  //   }

  return { shortMessage, detailedMessage };
}

export function parseSignMessageError(error: SignMessageErrorType | null): ActionError | undefined {
  if (!error) {
    return undefined;
  }

  const detailedMessage = error.message;
  const shortMessage = error.message.includes("User reject")
    ? "User rejected the request."
    : (error as BaseError).shortMessage || error.message;

  return { shortMessage, detailedMessage };
}

export function parseWriteContractError(error: WriteContractErrorType | null): ActionError | undefined {
  if (!error) {
    return undefined;
  }

  const detailedMessage = error.message;
  let shortMessage = (error as BaseError).shortMessage || error.message;

  const baseError = error as BaseError;

  // baseError.walk((e) => {
  //   console.log("WALK", e);
  //   return false;
  // });

  if (baseError.walk((e) => e instanceof UserRejectedRequestError || (e as Error)?.message?.includes("User reject"))) {
    shortMessage = "User rejected the request.";
  } else if (baseError.walk((e) => e instanceof InsufficientFundsError)) {
    shortMessage = "Wallet has insufficient funds for transaction.";
  } else if (baseError.walk((e) => e instanceof ChainMismatchError)) {
    shortMessage = "Wrong chain.";
  }

  return { shortMessage, detailedMessage };
}

export function parseSendTransactionError(error: SendTransactionErrorType | null): ActionError | undefined {
  if (!error) {
    return undefined;
  }

  const detailedMessage = error.message;
  let shortMessage = (error as BaseError).shortMessage || error.message;

  const baseError = error as BaseError;

  // baseError.walk((e) => {
  //   console.log("WALK", e);
  //   return false;
  // });

  if (baseError.walk((e) => e instanceof UserRejectedRequestError || (e as Error)?.message?.includes("User reject"))) {
    shortMessage = "User rejected the request.";
  } else if (baseError.walk((e) => e instanceof InsufficientFundsError)) {
    shortMessage = "Wallet has insufficient funds for transaction.";
  } else if (baseError.walk((e) => e instanceof ChainMismatchError)) {
    shortMessage = "Wrong chain.";
  }

  return { shortMessage, detailedMessage };
}

export function parseWaitForTransactionReceiptError(
  error: WaitForTransactionReceiptErrorType | null
): ActionError | undefined {
  if (!error) {
    return undefined;
  }

  const detailedMessage = error.message;
  const shortMessage = error.message.includes("User reject")
    ? "User rejected the request."
    : (error as BaseError).shortMessage || error.message;

  return { shortMessage, detailedMessage };
}
