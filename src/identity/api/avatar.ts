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

export interface GetAvatarReturnType {
  value: string | null;
  resolver: IdentityResolver | null;
}

export async function getAvatar({
  address,
  resolvers,
  override,
  ...rest
}: GetIdentityParams): Promise<GetAvatarReturnType> {
  if (override?.[address]) {
    return { value: override[address], resolver: null };
  }

  // Search through all resolvers in order to find the first name
  for (const resolver of resolvers) {
    const value = await resolverForType[resolver]({ address, ...rest });
    if (value) {
      return { value, resolver };
    }
  }

  // Null if no avatar was found
  return { value: null, resolver: null };
}
