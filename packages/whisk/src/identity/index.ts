import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { AddressSchema } from "../common/schemas";
import type { Address } from "viem";
import {
    getEnsAvatar,
    getEnsName,
    getFarcasterAvatarForAddress,
    getFarcasterNameForAddress,
    getNnsName,
} from "./resolvers/index.js";

const IdentityResolverSchema = z.enum(["ens", "farcaster", "nns"]);

const resolverForType: Record<
    z.infer<typeof IdentityResolverSchema>,
    {
        name?: (address: Address) => Promise<string | null>;
        avatar?: (address: Address) => Promise<string | null>;
    }
> = {
    ens: {
        name: getEnsName,
        avatar: getEnsAvatar,
    },
    farcaster: {
        name: getFarcasterNameForAddress,
        avatar: getFarcasterAvatarForAddress,
    },
    nns: {
        name: getNnsName,
        avatar: undefined,
    },
};

export const identity = new Hono()
    .post(
        "/name",
        zValidator(
            "json",
            z.object({
                address: AddressSchema,
                resolvers: z.array(IdentityResolverSchema),
            })
        ),
        async (c) => {
            const data = c.req.valid("json");

            // Search through all resolvers in order to find the first name
            for (const resolver of data.resolvers) {
                const name = await resolverForType[resolver].name?.(data.address);
                if (name) {
                    return c.json({ name });
                }
            }

            return c.json({ name: `${data.address.slice(0, 6)}...${data.address.slice(-4)}` });
        }
    )
    .post(
        "/avatar",
        zValidator(
            "json",
            z.object({
                address: AddressSchema,
                resolvers: z.array(IdentityResolverSchema),
            })
        ),
        async (c) => {
            const data = c.req.valid("json");

            // Search through all resolvers in order to find the first name
            for (const resolver of data.resolvers) {
                const avatar = await resolverForType[resolver].avatar?.(data.address);
                if (avatar) {
                    return c.json({ avatar });
                }
            }

            return c.json({ avatar: null });
        }
    );
