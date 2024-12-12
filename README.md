# Whisk SDK

Whisk SDK provides a suite of modular kits for seamless integration with the [Whisk.so](https://whisk.so) blockchain data pipeline. Each kit includes:
- Customizable React components for rapid development.
- React Hooks and SDK Core APIs for deeper, programmatic access to blockchain data.

![Whisk Diagram](docs/img/how-it-works.png)

## Getting Started

### Installation

Install `whisk-sdk` and it's peer dependency `react-query`:
```bash
npm install @paperclip-labs/whisk-sdk @tanstack/react-query
```

### Configuration

Wrap your React app with the `WhiskSdkProvider` and `QueryClientProvider`:
```JSX
// providers.tsx

"use client";
import { WhiskSdkProvider } from "@paperclip-labs/whisk-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
        <WhiskSdkProvider
            config={{
                // Define configuration for each kit you plan to use. 
                // See respective Kit docs below for full configs.
                identity: {
                    resolvers: ["base", "uni", "nns", "ens", "farcaster"], 
                },
            }}
        >
            {children}
        </WhiskSdkProvider>
    </QueryClientProvider>
  );
}
```

### Use the SDK

To use a specific kit, simply import and utilize its components. 

For example, the Identity Kit:
```JSX
import { Name, Avatar } from "@paperclip-labs/whisk-sdk/identity";

function ExampleComponent() {
    // This could come from a connected wallet via Wagmi, ethers.js, web3.js, Privy, etc.
    const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

    return (
        <div className="flex items-center gap-2">
            <Avatar address={address} size={30} />
            <Name address={address} />
        </div>
    );
}
```

### Customization

You can customize all components via CSS classes, or tailwindCSS using the className prop. 

More docs coming soon.

## Kits 

### Identity Kit

Identity Kit simplifies the integration of blockchain naming systems like [ENS](https://ens.domains/), [NNS](https://nns.xyz/), [Farcaster](https://www.farcaster.xyz/), [Uni Names](https://blog.uniswap.org/introducing-uni-eth-your-unique-web3-username), and [Basenames](https://www.base.org/names) into your application.


#### Configuration

Before using components or hooks from this kit, configure it in the `WhiskSdkProvider` setup in installation steps:
```typescript
interface IdentityConfiguration {
    // Specify resolvers and their order for sequential resolution.
    resolvers: ("ens" | "farcaster" | "nns" | "uni" | "base")[]; 

    // Optional: Override specific addresses with custom names or avatars.
    overrides?: Record<Address, { name: string; avatar: string } | undefined>;
};
```

#### Name 

Purpose: Resolves the name associated with an address.

##### React Component
```JSX
import { Name } from "@paperclip-labs/whisk-sdk/identity";

<Name address={address} />
```

##### Direct Data Access
If you need direct data access you can use the React Hook or the SDK Core:
```typescript
import { useName } from "@paperclip-labs/whisk-sdk/identity";
import { getName } from "@paperclip-labs/whisk-sdk/identity/core";

// Returns a `UseQueryResult` object powered by `react-query`.
const {data: name } = useName({ address });

// Can be used in server components, or outside of React. 
// Need to specify resolvers explicitly since this can be used outside of the WhiskSdkProvider.
const name = await getName("", { address, resolvers })
```

#### Avatar

Purpose: Resolves the avatar associated with an address.

##### React Component
```JSX
import { Avatar } from "@paperclip-labs/whisk-sdk/identity";

<Avatar address={address} size={size} />
```

##### Direct Data Access
If you need direct data access you can use the React Hook or the SDK Core:
```typescript
import { useAvatar } from "@paperclip-labs/whisk-sdk/identity";
import { getAvatar } from "@paperclip-labs/whisk-sdk/identity/core";

// Returns a `UseQueryResult` object powered by `react-query`.
const { data: avatar } = useAvatar({ address });

// Can be used in server components, or outside of React. 
// Need to specify resolvers explicitly since this can be used outside of the WhiskSdkProvider
const avatar = await getAvatar("", { address, resolvers })
```



