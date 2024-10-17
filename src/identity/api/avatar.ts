import { GetIdentityParams, IdentityResolver } from "./types";
import { getEnsAvatar } from "./resolvers/ens";
import { getFarcasterAvatarForAddress } from "./resolvers/farcaster";

const resolverForType: Record<
  IdentityResolver,
  (params: Omit<GetIdentityParams, "resolvers">) => Promise<string | null>
> = {
  ens: getEnsAvatar,
  farcaster: getFarcasterAvatarForAddress,
  nns: async () => null, // Doesn't implement avatar's
};

export async function getAvatar({
  resolvers,
  ...rest
}: GetIdentityParams): Promise<{ value: string | null; resolver: IdentityResolver | null }> {
  // Search through all resolvers in order to find the first name
  for (const resolver of resolvers) {
    const value = await resolverForType[resolver]({ ...rest });
    if (value) {
      return { value, resolver };
    }
  }

  // Null if no avatar was found
  return { value: null, resolver: null };
}
