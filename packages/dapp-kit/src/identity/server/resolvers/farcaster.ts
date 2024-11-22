import { GetAvatarReturnType, GetIdentityParameters, GetNameReturnType } from "@/identity/shared/types";
import { User as FarcasterUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { IdentityApiConfig } from "../types";

export async function getFarcasterUsersForAddress(
  config: IdentityApiConfig,
  { address }: Omit<GetIdentityParameters, "resolvers">
): Promise<FarcasterUser[]> {
  const req = await fetch(
    `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${address}&address_types=verified_address`,
    {
      headers: {
        api_key: config.neynarApiKey,
      },
    }
  );
  const resp = await req.json();

  const users = resp[address.toLowerCase()] as FarcasterUser[] | undefined;

  if (!users) {
    return [];
  }

  return users;
}

export async function getFarcasterNameForAddress(
  config: IdentityApiConfig,
  { address }: Omit<GetIdentityParameters, "resolvers">
): Promise<GetNameReturnType | null> {
  const users = await getFarcasterUsersForAddress(config, { address });

  if (users.length === 0) {
    return null;
  }

  return users[0].username;
}

export async function getFarcasterAvatarForAddress(
  config: IdentityApiConfig,
  parameters: Omit<GetIdentityParameters, "resolvers">
): Promise<GetAvatarReturnType> {
  const users = await getFarcasterUsersForAddress(config, parameters);

  if (users.length === 0) {
    return null;
  }

  return users[0].pfp_url ?? null;
}
