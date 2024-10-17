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
  config,
  address,
  resolvers,
}: GetIdentityParams): Promise<{ value: string; resolver: IdentityResolver | null }> {
  // Search through all resolvers in order to find the first name
  for (const resolver of resolvers) {
    const value = await resolverForType[resolver]({ config, address });
    if (value) {
      return { value, resolver };
    }
  }

  // If no name was found, return a formatted address
  return { value: formatAddress({ address }), resolver: null };
}
