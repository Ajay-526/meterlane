import { NextResponse } from "next/server";
import { opsFetch, tokenFrom } from "@/lib/meterlane";

export async function GET(req: Request) {
  const api = await opsFetch("/v1/ops/workspaces", {}, tokenFrom(req));
  return NextResponse.json(api.json, { status: api.status });
}
