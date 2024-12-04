import { whiskClient, WhiskClientType } from "@paperclip-labs/whisk";
import { InferRequestType } from "hono";

export async function getName(
  apiUrl: string,
  params: InferRequestType<WhiskClientType["identity"]["name"]["$post"]>["json"]
): Promise<string | null> {
  const client = whiskClient(apiUrl);

  try {
    const res = await client.identity.name.$post({
      json: params,
    });

    if (res.ok) {
      const data = await res.json();
      return data.name;
    } else {
      throw Error(`Bad response: ${res.status}`);
    }
  } catch (error) {
    console.error("Invalid response data (/identity/name):", error, params);
    return null;
  }
}
