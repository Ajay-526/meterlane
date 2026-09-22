import { NextResponse } from "next/server";
import { opsFetch } from "@/lib/meterlane";

export async function GET() {
  const api = await opsFetch("/v1/health");
  return NextResponse.json({ admin: "ok", meterlane: api.json }, { status: api.ok ? 200 : 502 });
}
