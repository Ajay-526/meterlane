const BASE = (process.env.METERLANE_URL || "http://localhost:8080").replace(/\/$/, "");

export function defaultToken() {
  return (process.env.ALPHA_TOKEN || "change-me").trim();
}

export function tokenFrom(req: Request) {
  const h = req.headers;
  const raw =
    h.get("x-alpha-token") ||
    h.get("X-Alpha-Token") ||
    h.get("x-meterlane-ops") ||
    new URL(req.url).searchParams.get("token") ||
    defaultToken();
  return raw.trim();
}

export async function opsFetch(path: string, init: RequestInit = {}, token?: string) {
  const tok = (token || defaultToken()).trim();
  const headers = new Headers(init.headers);
  headers.set("X-Alpha-Token", tok);
  headers.set("X-Meterlane-Ops", tok);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const joiner = path.includes("?") ? "&" : "?";
  const url = `${BASE}${path}${joiner}token=${encodeURIComponent(tok)}`;
  let res: Response;
  try {
    res = await fetch(url, { ...init, headers, cache: "no-store" });
  } catch (err) {
    return {
      ok: false,
      status: 502,
      json: {
        error: {
          code: "upstream_down",
          message: `cannot reach Meterlane at ${BASE}. Is go run listening on 8080? ${String(err)}`
        }
      }
    };
  }
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { error: { message: text || res.statusText } };
  }
  return { ok: res.ok, status: res.status, json };
}
