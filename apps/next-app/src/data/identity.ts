import { safeUnstableCache, SECONDS_PER_WEEK } from "@paperclip-labs/dapp-kit";
import { getAvatar, getName, IdentityConfig, IdentityResolver } from "@paperclip-labs/dapp-kit/identity/api";

const IDENTITY_CONFIG: IdentityConfig = {
  mainnetRpcUrl: process.env.MAINNET_RPC_URL!,
  neynarApiKey: process.env.NEYNAR_API_KEY!,
};

const IDENTITY_RESOLVERS: IdentityResolver[] = ["nns", "ens", "farcaster"];

export const getNameCached = safeUnstableCache(
  (address) => getName({ config: IDENTITY_CONFIG, address, resolvers: IDENTITY_RESOLVERS }),
  ["get-name"],
  { revalidate: SECONDS_PER_WEEK }
);

export const getAvatarCached = safeUnstableCache(
  (address) => getAvatar({ config: IDENTITY_CONFIG, address, resolvers: IDENTITY_RESOLVERS }),
  ["get-name"],
  { revalidate: SECONDS_PER_WEEK }
);
