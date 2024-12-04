import { createPublicClient, http } from "viem";
import { base, mainnet } from "viem/chains";
export const viemMainnetClient = createPublicClient({
    chain: mainnet,
    transport: http(process.env.MAINNET_RPC_URL),
});
export const viemBaseClient = createPublicClient({
    chain: base,
    transport: http(process.env.BASE_RPC_URL),
});
