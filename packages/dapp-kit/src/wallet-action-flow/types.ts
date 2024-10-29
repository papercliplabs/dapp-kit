import { Abi, Address, Hex, TransactionReceipt } from "viem";
import {
  SignMessageParameters as wagmi_SignMessageParameters,
  SignTypedDataParameters as wagmi_SignTypedDataParameters,
} from "wagmi/actions";

export interface TransactionOutput {
  type: "transaction";
  receipt: TransactionReceipt;
}

export interface SignOutput {
  type: "sign";
  signature: Hex;
}

export type ActionOutput = TransactionOutput | SignOutput;

export interface SendTransactionParameters {
  to: Address;
  data?: Hex;
  value?: bigint;
  gasFallback: bigint; // Gas upper bound which is used when estimation fails
}

export interface SendTransactionStep {
  name: string;
  type: "send-transaction";
  action:
    | ((prevActionOutput?: ActionOutput) => Promise<SendTransactionParameters | undefined>) // skip step if returns undefined
    | SendTransactionParameters;
}

// Recommend to use createValidatedWriteContractParams to create this with full type checking
export interface WriteContractParameters {
  abi: Abi;
  address: Address;
  functionName: string;
  args: any;
  value?: bigint;
  gasFallback: bigint;
}

// Skips step if action returns or is undefined
export interface WriteContractStep {
  name: string;
  type: "write-contract";
  action:
    | ((prevActionOutput?: ActionOutput) => Promise<WriteContractParameters | undefined>) // skips step if returns undefined
    | WriteContractParameters;
}

// Re-export
export interface SignMessageParameters extends wagmi_SignMessageParameters {}

// Skips step if action returns or is undefined
export interface SignMessageStep {
  name: string;
  type: "sign-message";
  action:
    | ((prevActionOutput?: ActionOutput) => Promise<SignMessageParameters | undefined>) // skips step if returns undefined
    | SignMessageParameters;
}

export interface SignTypedDataParameters extends wagmi_SignTypedDataParameters {}

export interface SignTypedDataStep {
  name: string;
  type: "sign-typed-data";
  action:
    | ((prevActionOutput?: ActionOutput) => Promise<SignTypedDataParameters | undefined>) // skips step if returns undefined
    | SignTypedDataParameters;
}

export type Step = SendTransactionStep | WriteContractStep | SignMessageStep | SignTypedDataStep;
