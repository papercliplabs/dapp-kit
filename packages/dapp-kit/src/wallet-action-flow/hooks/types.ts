import { ActionOutput } from "../types";

export type ActionState =
  | "idle"
  | "pending-signature"
  | "pending-confirmation"
  | "success"
  | "error-signature"
  | "error-transaction";

export interface ActionError {
  shortMessage: string;
  detailedMessage: string;
}

export interface ActionHookParameters {
  chainId: number;
  onSuccess: (output: ActionOutput) => void;
}

export interface ActionHookBaseReturnType {
  state: ActionState;
  error?: ActionError;
  reset: () => void;
}
