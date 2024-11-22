import { getEnsAvatar } from "./resolvers/ens";
import { getFarcasterAvatarForAddress } from "./resolvers/farcaster";
import { GetAvatarReturnType, GetIdentityParameters } from "../shared/types";
import { IdentityApiConfig } from "./types";

const resolverForType: Record<
  GetIdentityParameters["resolvers"][number],
  (config: IdentityApiConfig, parameters: Omit<GetIdentityParameters, "resolvers">) => Promise<string | null>
> = {
  ens: getEnsAvatar,
  farcaster: getFarcasterAvatarForAddress,
  nns: async () => null, // Doesn't implement avatar's
};

export async function getAvatar(
  config: IdentityApiConfig,
  { resolvers, ...rest }: GetIdentityParameters
): Promise<GetAvatarReturnType> {
  // Search through all resolvers in order to find the first name
  for (const resolver of resolvers) {
    const value = await resolverForType[resolver](config, rest);
    if (value) {
      return value;
    }
  }

  // Null if no avatar was found
  return null;
}
