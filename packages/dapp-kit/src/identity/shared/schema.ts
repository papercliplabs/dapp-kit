import { Address } from "viem";
import { z } from "zod";

export const AddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Address must be a valid 160-bit (0x-prefixed) Ethereum address")
  .transform((value) => value as Address);

export const GetIdentityParametersSchema = z.object({
  address: AddressSchema,
  resolvers: z.array(z.enum(["ens", "farcaster", "nns"])),
});

export const GetNameReturnTypeSchema = z.string();
export const GetAvatarReturnTypeSchema = z.string().nullable();
