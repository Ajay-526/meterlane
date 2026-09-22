"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function HomePage() {
  const [out, setOut] = useState("The api_key is shown once.");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${API}/v1/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fd.get("name"), plan: fd.get("plan") })
      });
      setOut(JSON.stringify(await res.json(), null, 2));
    } catch (err) {
      setOut(String(err));
    }
  }

  return (
    <>
      <section className="hero">
        <div className="hero-bar">
          <Link className="wordmark" href="/">meter<span>lane</span></Link>
          <nav>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">API</Link>
          </nav>
        </div>
        <div className="hero-copy">
          <div>
            <p className="kicker">Our product</p>
            <h1>Why we count the usage</h1>
            <p className="subhead">Calls · seats · tokens</p>
          </div>
          <p className="script">More than<br />another meter</p>
        </div>
      </section>

      <div className="sheet">
        <div className="quote">
          <p>“Stripe handles the subscription. You still have to remember every unit you sold.”</p>
          <div className="rule" />
        </div>

        <div className="wrap story">
          <div>
            <p>
              Meterlane began with a simple dissatisfaction: enterprise billing tools
              built for funded teams, and founders on Stripe still writing month-end
              code by hand.
            </p>
            <p>
              We wanted the event at the moment the work succeeds. The month summed
              without a spreadsheet. The invoice item that matches what you promised
              the customer.
            </p>
            <p>
              You send one call. We store it, sum the UTC month, and write the amount
              onto your Stripe customer. We stay quiet. We stay close to the number.
            </p>
            <p>Our promise is not more pictures of data. It is a truer count.</p>
          </div>
          <div className="polaroid-col">
            <div className="polaroid one">
              <img src="/still.jpg" alt="" />
            </div>
            <img className="sprigs" src="/sprigs.jpg" alt="" />
            <div className="polaroid two">
              <img src="/palace.jpg" alt="" />
            </div>
          </div>
        </div>

        <p className="aside-script">Real numbers</p>

        <section className="people">
          <p className="kicker">The work behind</p>
          <h2>Meterlane</h2>
          <div className="people-grid">
            <div className="person">
              <img className="arch" src="/portrait-a.jpg" alt="" />
              <div>
                <h3>Track</h3>
                <div className="role">The event</div>
                <p>One POST when the unit is earned. Idempotent. Held until the customer is mapped.</p>
              </div>
            </div>
            <div className="person">
              <img className="arch" src="/portrait-b.jpg" alt="" />
              <div>
                <h3>Invoice</h3>
                <div className="role">The month</div>
                <p>Reconcile first. Then flush an invoice item. Stop-ship if the sums disagree.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap start">
          <h2>Begin in fifteen minutes</h2>
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
      </div>
    </>
  );
}
