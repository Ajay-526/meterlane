"use client";

import { FormEvent, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function HomePage() {
  const [out, setOut] = useState("The api_key is shown once. Keep it.");

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
      <section className="hero">
        <div className="wrap">
          <p className="kicker">The product</p>
          <h1>Why we count the usage</h1>
          <p className="subhead">API calls · seats · AI tokens</p>
          <p className="script">More than another Stripe wrapper</p>
        </div>
      </section>

      <div className="quote-block">
        <blockquote>
          “Stripe handles the subscription. You still have to remember every unit you sold.”
        </blockquote>
        <div className="rule" />
      </div>

      <div className="wrap split">
        <div>
          <p>
            Meterlane began with a simple gap: Metronome and Orb are built for funded B2B teams.
            Indie founders already on Stripe still write month-end billing code by hand.
          </p>
          <p>
            You send one event when the work succeeds. We store it, sum the UTC month, and write
            an invoice item onto <em>your</em> Stripe customer. No webhook maze. No sales call.
          </p>
          <p>
            NoteAI charges per summary. Forty summaries is the month we show on the dashboard.
          </p>
          <p>Our promise is not more dashboards. It is a number you can invoice.</p>
        </div>
        <div className="polaroids">
          <div className="polaroid">
            <div className="swatch a" />
            <p className="tag">POST /v1/track</p>
          </div>
          <div className="polaroid">
            <div className="swatch b" />
            <p className="tag">UTC month sum</p>
          </div>
        </div>
      </div>

      <section className="section wrap">
        <p className="tag">Start here</p>
        <h2>Fifteen minutes, then you track</h2>
        <div className="card" style={{ textAlign: "left" }}>
          <ol>
            <li>Create a workspace.</li>
            <li>Metric <code>summaries</code>, 500 paise, <code>inr</code>.</li>
            <li>Map <code>user_123</code> to a Stripe <code>cus_</code>.</li>
            <li>Track. Reconcile before you flush.</li>
          </ol>
          <form onSubmit={onSubmit}>
            <input name="name" placeholder="NoteAI" required />
            <select name="plan" defaultValue="starter">
              <option value="starter">Starter $29</option>
              <option value="growth">Growth $49</option>
              <option value="scale">Scale $79</option>
            </select>
            <button type="submit">Create workspace</button>
          </form>
          <pre>{out}</pre>
        </div>
      </section>
    </>
  );
}
