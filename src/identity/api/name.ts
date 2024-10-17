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

export async function getName({
  resolvers,
  address,
  ...rest
}: GetIdentityParams): Promise<{ value: string; resolver: IdentityResolver | null }> {
  console.log("CACHE MISS");
  // Search through all resolvers in order to find the first name
  for (const resolver of resolvers) {
    const value = await resolverForType[resolver]({ address, ...rest });
    if (value) {
      return { value, resolver };
    }
  }

  // If no name was found, return a formatted address
  return { value: formatAddress({ address }), resolver: null };
}
