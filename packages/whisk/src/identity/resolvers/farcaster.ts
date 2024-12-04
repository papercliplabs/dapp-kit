import type { Address } from "viem";

export async function getFarcasterUsersForAddress(address: Address): Promise<{ pfp_url: string; username: string }[]> {
    const req = await fetch(
        `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${address}&address_types=verified_address`,
        {
            headers: {
                api_key: process.env.NEYNAR_API_KEY!,
            },
        }
    );
    const resp = await req.json();

    const users = resp[address.toLowerCase()] as { pfp_url: string; username: string }[] | undefined;

    if (!users) {
        return [];
    }

    return users;
}

export async function getFarcasterNameForAddress(address: Address): Promise<string | null> {
    const users = await getFarcasterUsersForAddress(address);

    if (users.length === 0) {
        return null;
    }

    return users[0].username;
}

export async function getFarcasterAvatarForAddress(address: Address): Promise<string | null> {
    const users = await getFarcasterUsersForAddress(address);

    if (users.length === 0) {
        return null;
    }

    return users[0].pfp_url ?? null;
}
