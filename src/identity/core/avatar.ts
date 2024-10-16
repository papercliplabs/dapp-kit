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
  address,
  resolvers,
  config,
}: GetIdentityParams): Promise<{ avatar: string | null; resolver: IdentityResolver | null }> {
  // Search through all resolvers in order to find the first name
  for (const resolver of resolvers) {
    const avatar = await resolverForType[resolver]({ address, config });
    if (avatar) {
      return { avatar, resolver };
    }
  }

  // Null if no avatar was found
  return { avatar: null, resolver: null };
}
