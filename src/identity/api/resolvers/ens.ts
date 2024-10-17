import { createPublicClient, http } from "viem";
import { getEnsName as viemGetEnsName, getEnsAvatar as viemGetEnsAvatar } from "viem/actions";
import { normalize } from "viem/ens";
import { mainnet } from "viem/chains";
import { GetIdentityParams, IdentityConfig } from "../types";

export async function getEnsName({ config, address }: Omit<GetIdentityParams, "resolvers">): Promise<string | null> {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(config.mainnetRpcUrl),
  });

  const name = await viemGetEnsName(publicClient, {
    address,
  });

  return name;
}

export async function getEnsAvatar({ config, address }: Omit<GetIdentityParams, "resolvers">): Promise<string | null> {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(config.mainnetRpcUrl),
  });

  const ensName = await getEnsName({ config, address });
  if (!ensName) {
    return null;
  }

  const avatar = await viemGetEnsAvatar(publicClient, {
    name: normalize(ensName),
  });

  return avatar;
}
