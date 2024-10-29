import { getNameCached } from "@/data/identity";
import { getAddress } from "viem";

export async function GET(req: Request, { params }: { params: { address: string } }) {
  return Response.json(await getNameCached(getAddress(params.address)));
}
