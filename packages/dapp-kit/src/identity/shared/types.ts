import { z } from "zod";
import { GetIdentityParametersSchema, GetIdentityReturnTypeSchema } from "./schema";

export type GetIdentityParameters = z.infer<typeof GetIdentityParametersSchema>;
export type GetIdentityReturnType = z.infer<typeof GetIdentityReturnTypeSchema>;
