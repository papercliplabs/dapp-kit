import { getAvatar, IdentityApiConfig, GetIdentityParametersSchema } from "@paperclip-labs/dapp-kit/identity/server";

const IDENTITY_API_CONFIG: IdentityApiConfig = {
  mainnetRpcUrl: process.env.MAINNET_RPC_URL!,
  baseRpcUrl: process.env.BASE_RPC_URL!,
  neynarApiKey: process.env.NEYNAR_API_KEY!,
};

export async function POST(req: Request) {
  const payload = await req.json();

  try {
    const parameters = GetIdentityParametersSchema.parse(payload);
    const avatar = await getAvatar(IDENTITY_API_CONFIG, parameters);
    return Response.json(avatar);
  } catch (error) {
    console.error("Invalid parameters:", error);
    return Response.json({ error: "Invalid parameters" }, { status: 400 });
  }
}
