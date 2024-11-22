import { z } from "zod";
import { GetAvatarReturnTypeSchema, GetIdentityParametersSchema, GetNameReturnTypeSchema } from "./schema";

export type GetIdentityParameters = z.infer<typeof GetIdentityParametersSchema>;

export type GetNameReturnType = z.infer<typeof GetNameReturnTypeSchema>;
export type GetAvatarReturnType = z.infer<typeof GetAvatarReturnTypeSchema>;
