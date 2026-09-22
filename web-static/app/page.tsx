"use client";

import { FormEvent, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function HomePage() {
  const [out, setOut] = useState("Save the api_key. It is shown once.");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${API}/v1/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.get("name"), plan: fd.get("plan") })
      });
      const json = await res.json();
      setOut(JSON.stringify(json, null, 2));
    } catch (err) {
      setOut(String(err));
    }
  }

  return (
    <>
      <p className="tag">Usage metering for indie SaaS</p>
      <h1>Stripe handles subscriptions. You still have to count the usage.</h1>
      <p className="lede">
        Per API call. Per seat with overage. Per AI summary. Meterlane sits between your app and Stripe:
        <code> POST /v1/track</code>, we sum the UTC month, Stripe gets an invoice item. $29-79/mo. No contact sales.
      </p>
      <div className="card">
        <h2>The job we do</h2>
        <p>NoteAI charges per document summary. Their app calls us once per success. We store the event, sum the month, and write the amount onto their Stripe customer.</p>
      </div>
      <div className="card">
        <h2>Start in fifteen minutes</h2>
        <ol>
          <li>Create a workspace below.</li>
          <li>Create metric <code>summaries</code>, 500 paise, <code>inr</code>.</li>
          <li>Map <code>user_123</code> to a Stripe <code>cus_</code>.</li>
          <li>Track. Check <code>GET /v1/reconcile</code> before you invoice.</li>
        </ol>
        <form onSubmit={onSubmit}>
          <p>
            <input name="name" placeholder="NoteAI" required />{" "}
            <select name="plan" defaultValue="starter">
              <option value="starter">Starter $29</option>
              <option value="growth">Growth $49</option>
              <option value="scale">Scale $79</option>
            </select>{" "}
            <button type="submit">Create workspace</button>
          </p>
        </form>
        <pre>{out}</pre>
      </div>
    </>
  );
}
