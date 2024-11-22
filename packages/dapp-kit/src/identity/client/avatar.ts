import { safeFetch } from "@/utils";
import { GetAvatarReturnType, GetIdentityParameters } from "../shared/types";
import { GetAvatarReturnTypeSchema } from "../server";

export async function fetchAvatar(parameters: GetIdentityParameters, apiUrl: string): Promise<GetAvatarReturnType> {
  const response = await safeFetch(`${apiUrl}/identity/avatar`, {
    method: "POST",
    body: JSON.stringify(parameters),
  });

  // Validate the returned data against the expected schema
  try {
    return GetAvatarReturnTypeSchema.parse(response); // Throws if the data doesn't match
  } catch (error) {
    console.error("Invalid response data (/identity/avatar):", error, response, parameters.address);
    return null;
  }
}
