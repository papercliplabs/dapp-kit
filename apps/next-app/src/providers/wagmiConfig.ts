import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { base, sepolia } from "viem/chains";

export function getConfig() {
  return createConfig({
    chains: [sepolia, base],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [sepolia.id]: http(),
      [base.id]: http(),
    },
  });
}
