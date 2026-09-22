export default function PricingPage() {
  return (
    <section className="section wrap">
      <p className="tag">Public catalog</p>
      <h2>$29, $49, or $79.</h2>
      <p className="lede" style={{ margin: "0 auto 28px" }}>
        Crossing the event cap returns HTTP 429. There is no contact-sales row.
      </p>
      <div className="grid3">
        <div className="card">
          <p className="tag">Starter</p>
          <div className="price">$29 <span>/mo</span></div>
          <p>500,000 events / UTC month<br />3 metrics<br />1 workspace</p>
        </div>
        <div className="card">
          <p className="tag">Growth</p>
          <div className="price">$49 <span>/mo</span></div>
          <p>2,000,000 events<br />10 metrics<br />2 workspaces</p>
        </div>
        <div className="card">
          <p className="tag">Scale</p>
          <div className="price">$79 <span>/mo</span></div>
          <p>10,000,000 events<br />Unlimited metrics<br />5 workspaces</p>
        </div>
      </div>
    </section>
  );
}
