import { Abi, Address, ContractFunctionArgs, ContractFunctionName, TypedData, TypedDataDefinition } from "viem";
import { SignTypedDataParameters as wagmi_SignTypedDataParameters } from "wagmi/actions";
import { SignTypedDataParameters } from "./types";

// Define a single validated input type to enforce type safety for users
type ValidatedWriteContractParams<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
> = {
  abi: abi;
  address: Address;
  functionName: functionName;
  args: args;
  chainId: number;
  gasFallback: bigint;
};

// Helper function to get type checking on write contract parameters
export function createValidatedWriteContractParams<
  abi extends Abi,
  functionName extends ContractFunctionName<abi, "nonpayable" | "payable">,
  args extends ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>,
>(
  params: ValidatedWriteContractParams<abi, functionName, args>
): ValidatedWriteContractParams<abi, functionName, args> {
  return params;
}

export function createValidatedSignTypedDataParams<
  typedData extends TypedData = TypedData,
  primaryType extends keyof typedData | "EIP712Domain" = keyof typedData,
  primaryTypes = typedData extends TypedData ? keyof typedData : string,
>(params: wagmi_SignTypedDataParameters<typedData, primaryType, primaryTypes>): SignTypedDataParameters {
  return params as SignTypedDataParameters;
}
