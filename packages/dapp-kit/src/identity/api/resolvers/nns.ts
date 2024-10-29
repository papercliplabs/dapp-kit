import { createPublicClient, http } from "viem";
import { GetIdentityParams } from "../types";
import { mainnet } from "viem/chains";
import { readContract } from "viem/actions";

const NNS_RESOLVER_ADDRESS = "0x849F92178950f6254db5D16D1ba265E70521aC1B";

const nnsEnsReverseResolverAbi = [
  {
    stateMutability: "view",
    type: "function",
    inputs: [{ name: "addr", internalType: "address", type: "address" }],
    name: "resolve",
    outputs: [{ name: "", internalType: "string", type: "string" }],
  },
] as const;

export async function getNnsName({ config, address }: Omit<GetIdentityParams, "resolvers">): Promise<string | null> {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(config.mainnetRpcUrl),
  });

  const name = await readContract(publicClient, {
    abi: nnsEnsReverseResolverAbi,
    address: NNS_RESOLVER_ADDRESS,
    functionName: "resolve",
    args: [address],
  });

  if (name == "" || name.endsWith(".eth")) {
    return null;
  }

  return name;
}
