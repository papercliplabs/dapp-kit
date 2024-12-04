import { z } from "zod";
export const AddressSchema = z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Address must be a valid 160-bit (0x-prefixed) Ethereum address")
    .transform((value) => value);
