import { safeFetch } from "@/utils";
import { GetIdentityParameters, GetNameReturnType } from "../shared/types";
import { GetNameReturnTypeSchema } from "../server";

export async function fetchName(parameters: GetIdentityParameters, apiUrl: string): Promise<GetNameReturnType | null> {
  const response = await safeFetch(`${apiUrl}/identity/name`, {
    method: "POST",
    body: JSON.stringify(parameters),
  });

  // Validate the returned data against the expected schema
  try {
    return GetNameReturnTypeSchema.parse(response); // Throws if the data doesn't match
  } catch (error) {
    console.error("Invalid response data (/identity/name):", error, response, parameters.address);
    return null;
  }
}
