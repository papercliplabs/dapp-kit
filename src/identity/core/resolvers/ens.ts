import { createPublicClient, http } from "viem";
import { getEnsName as viemGetEnsName, getEnsAvatar as viemGetEnsAvatar } from "viem/actions";
import { normalize } from "viem/ens";
import { mainnet } from "viem/chains";
import { GetIdentityParams } from "../types";

export async function getEnsName({ address, config }: Omit<GetIdentityParams, "resolvers">): Promise<string | null> {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(config.mainnetRpcUrl),
  });

  const name = await viemGetEnsName(publicClient, {
    address,
  });

  return name;
}

export async function getEnsAvatar({ address, config }: Omit<GetIdentityParams, "resolvers">): Promise<string | null> {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(config.mainnetRpcUrl),
  });

  const ensName = await getEnsName({ address, config });
  if (!ensName) {
    return null;
  }

  const avatar = await viemGetEnsAvatar(publicClient, {
    name: normalize(ensName),
  });

  return avatar;
}
