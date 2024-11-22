import { formatAddress } from "@/format";
import { getEnsName } from "./resolvers/ens";
import { getFarcasterNameForAddress } from "./resolvers/farcaster";
import { getNnsName } from "./resolvers/nns";
import { GetIdentityParameters, GetNameReturnType } from "../shared/types";
import { IdentityApiConfig } from "./types";

const resolverForType: Record<
  GetIdentityParameters["resolvers"][number],
  (config: IdentityApiConfig, parameters: Omit<GetIdentityParameters, "resolvers">) => Promise<string | null>
> = {
  ens: getEnsName,
  farcaster: getFarcasterNameForAddress,
  nns: getNnsName,
};

export async function getName(
  config: IdentityApiConfig,
  { address, resolvers }: GetIdentityParameters
): Promise<GetNameReturnType> {
  // Search through all resolvers in order to find the first name
  for (const resolver of resolvers) {
    const value = await resolverForType[resolver](config, { address });
    if (value) {
      return value;
    }
  }

  return formatAddress({ address });
}
