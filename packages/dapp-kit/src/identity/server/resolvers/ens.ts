import { createPublicClient, http } from "viem";
import { getEnsName as viemGetEnsName, getEnsAvatar as viemGetEnsAvatar } from "viem/actions";
import { normalize } from "viem/ens";
import { mainnet } from "viem/chains";
import { IdentityApiConfig } from "../types";
import { GetAvatarReturnType, GetIdentityParameters, GetNameReturnType } from "@/identity/shared/types";

export async function getEnsName(
  config: IdentityApiConfig,
  { address }: Omit<GetIdentityParameters, "resolvers">
): Promise<GetNameReturnType | null> {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(config.mainnetRpcUrl),
  });

  const name = await viemGetEnsName(publicClient, {
    address,
  });

  return name;
}

export async function getEnsAvatar(
  config: IdentityApiConfig,
  parameters: Omit<GetIdentityParameters, "resolvers">
): Promise<GetAvatarReturnType> {
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(config.mainnetRpcUrl),
  });

  const ensName = await getEnsName(config, parameters);
  if (!ensName) {
    return null;
  }

  const avatar = await viemGetEnsAvatar(publicClient, {
    name: normalize(ensName),
  });

  return avatar;
}
