import Link from "next/link";

export default function PricingPage() {
  return (
    <>
      <section className="hero" style={{ minHeight: "42vh" }}>
        <div className="hero-bar">
          <Link className="wordmark" href="/">meter<span>lane</span></Link>
          <nav>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">API</Link>
          </nav>
        </div>
        <div className="hero-copy" style={{ paddingTop: "8vh", paddingBottom: "8vh" }}>
          <div>
            <p className="kicker">Catalog</p>
            <h1>Three prices.</h1>
          </div>
        </div>
      </section>
      <div className="sheet page wrap">
        <div className="grid3">
          <div className="card">
            <p className="role">Starter</p>
            <div className="price">$29</div>
            <p>500,000 events · 3 metrics · 1 workspace</p>
          </div>
          <div className="card">
            <p className="role">Growth</p>
            <div className="price">$49</div>
            <p>2,000,000 events · 10 metrics · 2 workspaces</p>
          </div>
          <div className="card">
            <p className="role">Scale</p>
            <div className="price">$79</div>
            <p>10,000,000 events · unlimited metrics · 5 workspaces</p>
          </div>
        </div>
      </div>
    </>
  );
}
