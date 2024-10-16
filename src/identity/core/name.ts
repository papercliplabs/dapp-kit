import { GetIdentityParams, IdentityResolver } from "./types";
import { formatAddress } from "../../format";
import { getEnsName } from "./resolvers/ens";
import { getFarcasterNameForAddress } from "./resolvers/farcaster";
import { getNnsName } from "./resolvers/nns";

const resolverForType: Record<
  IdentityResolver,
  (params: Omit<GetIdentityParams, "resolvers">) => Promise<string | null>
> = {
  ens: getEnsName,
  farcaster: getFarcasterNameForAddress,
  nns: getNnsName,
};

/**
 *
 * @param param0
 * @returns
 */
export async function getName({
  address,
  resolvers,
  config,
}: GetIdentityParams): Promise<{ name: string; resolver: IdentityResolver | null }> {
  // Search through all resolvers in order to find the first name
  for (const resolver of resolvers) {
    const name = await resolverForType[resolver]({ address, config });
    if (name) {
      return { name, resolver };
    }
  }

  // If no name was found, return a formatted address
  return { name: formatAddress({ address }), resolver: null };
}
