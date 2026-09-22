"use client";

import { useState } from "react";

type Row = {
  workspace_id: string;
  name: string;
  plan: string;
  paid: boolean;
  events_used: number;
  events_limit: number;
  stop_ship: boolean;
};

type Snapshot = {
  period?: string;
  workspaces?: number;
  paid?: number;
  stop_ship?: number;
  rows?: Row[];
  error?: { message?: string };
};

export default function AdminPage() {
  const [token, setToken] = useState("change-me");
  const [data, setData] = useState<Snapshot | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const headers = { "X-Alpha-Token": token };

  async function load() {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/ops/workspaces", { headers });
      const json = (await res.json()) as Snapshot;
      if (!res.ok) {
        setErr(json.error?.message || `HTTP ${res.status}`);
        setData(null);
        return;
      }
      setData(json);
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  }

  async function seed() {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/ops/seed-noteai", { method: "POST", headers });
      const json = await res.json();
      if (!res.ok) {
        setErr(json.error?.message || `HTTP ${res.status}`);
        setBusy(false);
        return;
      }
      await load();
    } catch (e) {
      setErr(String(e));
      setBusy(false);
    }
  }

  return (
    <>
      <h1>Operator board</h1>
      <p className="muted">
        Token must match the API: <code>ALPHA_TOKEN=change-me go run ./cmd/meterlane -mode=all</code>
      </p>
      <div className="card">
        <p>
          <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="ALPHA_TOKEN" style={{ minWidth: "16rem", marginRight: 8 }} />
          <button type="button" onClick={load} disabled={busy}>Load workspaces</button>
          <button className="secondary" type="button" onClick={seed} disabled={busy}>Seed NoteAI</button>
        </p>
        {err ? <p className="bad">{err}</p> : null}
        {data ? (
          <>
            <p>Period {data.period} · {data.workspaces} workspaces · {data.paid} paid · {data.stop_ship} stop-ship</p>
            {data.stop_ship ? <p className="bad">STOP SHIP. Do not invoice.</p> : null}
            <table>
              <thead><tr><th>Workspace</th><th>Name</th><th>Plan</th><th>Paid</th><th>Events</th><th>Reconcile</th></tr></thead>
              <tbody>
                {(data.rows || []).map((r) => (
                  <tr key={r.workspace_id}>
                    <td><code>{r.workspace_id}</code></td>
                    <td>{r.name}</td>
                    <td>{r.plan}</td>
                    <td>{r.paid ? "yes" : "no"}</td>
                    <td>{r.events_used}/{r.events_limit}</td>
                    <td className={r.stop_ship ? "bad" : "ok"}>{r.stop_ship ? "STOP SHIP" : "ok"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="muted">Load to see every workspace reconcile.</p>
        )}
      </div>
    </>
  );
}
