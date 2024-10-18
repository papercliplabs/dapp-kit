import { Address, Hex } from "viem";

export type ActionInput = "TODO";
export type ActionIntent =
  | {
      type: "sign";
      // TODO
    }
  | {
      type: "transaction";
      transactionRequest: {
        to: Address;
        data: Hex;
        value: bigint;
        gasFallback: bigint; // Upper bound fallback for the gas required for the action, only used when estimation fails
      };
    };
export type Action = (input: ActionInput) => Promise<ActionIntent>;
export type ActionState = "idle" | "pending-signature" | "pending-confirmation" | "success" | "failure";
