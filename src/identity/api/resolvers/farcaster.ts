import { User as FarcasterUser } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { GetIdentityParams } from "../types";

export async function getFarcasterUsersForAddress({
  config,
  address,
}: Omit<GetIdentityParams, "resolvers">): Promise<FarcasterUser[]> {
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

export async function getFarcasterNameForAddress({
  config,
  address,
}: Omit<GetIdentityParams, "resolvers">): Promise<string | null> {
  const users = await getFarcasterUsersForAddress({ config, address });

  if (users.length === 0) {
    return null;
  }

  return users[0].username;
}

export async function getFarcasterAvatarForAddress({
  config,
  address,
}: Omit<GetIdentityParams, "resolvers">): Promise<string | null> {
  const users = await getFarcasterUsersForAddress({ config, address });

  if (users.length === 0) {
    return null;
  }

  return users[0].pfp_url ?? null;
}
