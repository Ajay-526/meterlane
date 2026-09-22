import { NextResponse } from "next/server";
import { defaultToken, opsFetch, tokenFrom } from "@/lib/meterlane";

export async function GET(req: Request) {
  const tok = tokenFrom(req);
  const api = await opsFetch("/v1/ops/workspaces", {}, tok);
  return NextResponse.json({
    meterlane_url: process.env.METERLANE_URL || "http://localhost:8080",
    env_token_len: defaultToken().length,
    sent_token_len: tok.length,
    sent_token_preview: tok ? `${tok.slice(0, 2)}...${tok.slice(-2)}` : "",
    upstream_status: api.status,
    upstream: api.json
  }, { status: 200 });
}
