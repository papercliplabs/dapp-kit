import { CONFIG } from "@/config";
import { whiskClient, WhiskClientType } from "@paperclip-labs/whisk-client";
import { InferRequestType } from "hono";

export async function getName(
  apiKey: string,
  params: InferRequestType<WhiskClientType["identity"]["name"]["$post"]>["json"]
): Promise<string | null> {
  const client = whiskClient(CONFIG.whiskServerUrl); // TODO: add apiKey

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
