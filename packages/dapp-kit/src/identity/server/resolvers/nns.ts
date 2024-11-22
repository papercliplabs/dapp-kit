import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { readContract } from "viem/actions";
import { IdentityApiConfig } from "../types";
import { GetIdentityParameters } from "@/identity/shared/types";

const NNS_RESOLVER_ADDRESS = "0x78997D8ca4316421620A09f015512D779Dc34217";

const nnsEnsReverseResolverAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "cldIds",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "fallbackToDefault",
        type: "bool",
      },
    ],
    name: "reverseNameOf",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getNnsName(
  config: IdentityApiConfig,
  { address }: Omit<GetIdentityParameters, "resolvers">
): Promise<string | null> {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(config.baseRpcUrl),
  });

  const name = await readContract(publicClient, {
    abi: nnsEnsReverseResolverAbi,
    address: NNS_RESOLVER_ADDRESS,
    functionName: "reverseNameOf",
    args: [address, [], true],
  });

  if (name == "") {
    return null;
  }

  return name;
}
