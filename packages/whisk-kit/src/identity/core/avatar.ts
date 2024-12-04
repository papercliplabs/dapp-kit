import { whiskClient, WhiskClientType } from "@paperclip-labs/whisk";
import { InferRequestType } from "hono";

export async function getAvatar(
  apiUrl: string,
  params: InferRequestType<WhiskClientType["identity"]["avatar"]["$post"]>["json"]
): Promise<string | null> {
  const client = whiskClient(apiUrl);

  try {
    const res = await client.identity.avatar.$post({
      json: params,
    });

    if (res.ok) {
      const data = await res.json();
      return data.avatar;
    } else {
      throw Error(`Bad response: ${res.status}`);
    }
  } catch (error) {
    console.error("Invalid response data (/identity/avatar):", error, params);
    return null;
  }
}
