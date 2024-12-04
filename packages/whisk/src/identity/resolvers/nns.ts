import { readContract } from "viem/actions";
import { viemBaseClient } from "../../common/viemClients";
import type { Address } from "viem";

const NNS_RESOLVER_ADDRESS = "0x78997D8ca4316421620A09f015512D779Dc34217";

const nnsEnsReverseResolverAbi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "cldIds",
                type: "uint256[]",
            },
            {
                internalType: "bool",
                name: "fallbackToDefault",
                type: "bool",
            },
        ],
        name: "reverseNameOf",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
] as const;

export async function getNnsName(address: Address): Promise<string | null> {
    const name = await readContract(viemBaseClient, {
        abi: nnsEnsReverseResolverAbi,
        address: NNS_RESOLVER_ADDRESS,
        functionName: "reverseNameOf",
        args: [address, [], true],
    });

    if (name == "") {
        return null;
    }

    return name;
}
