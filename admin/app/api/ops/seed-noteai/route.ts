import { NextResponse } from "next/server";
import { opsFetch, tokenFrom } from "@/lib/meterlane";

export async function POST(req: Request) {
  const api = await opsFetch("/v1/ops/seed-noteai", { method: "POST" }, tokenFrom(req));
  return NextResponse.json(api.json, { status: api.status });
}
