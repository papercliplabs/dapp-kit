import { getEnsName as viemGetEnsName, getEnsAvatar as viemGetEnsAvatar } from "viem/actions";
import { normalize } from "viem/ens";
import { viemMainnetClient } from "../../common/viemClients";
import type { Address } from "viem";

console.log("DEBUG", process.env.MAINNET_RPC_URL!);

export async function getEnsName(address: Address): Promise<string | null> {
    const name = await viemGetEnsName(viemMainnetClient, {
        address,
    });

    return name;
}

export async function getEnsAvatar(address: Address): Promise<string | null> {
    const ensName = await getEnsName(address);
    if (!ensName) {
        return null;
    }

    const avatar = await viemGetEnsAvatar(viemMainnetClient, {
        name: normalize(ensName),
    });

    return avatar;
}
