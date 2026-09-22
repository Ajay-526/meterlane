export default function PricingPage() {
  return (
    <>
      <p className="tag">Public catalog</p>
      <h1>$29, $49, or $79. That is the whole menu.</h1>
      <p className="lede">Crossing the event cap returns HTTP 429, not a surprise invoice.</p>
      <div className="grid">
        <div className="card">
          <div className="tag">Starter</div>
          <div className="price">$29 <span>/mo</span></div>
          <p>500,000 events / UTC month<br />3 metrics<br />1 workspace</p>
        </div>
        <div className="card">
          <div className="tag">Growth</div>
          <div className="price">$49 <span>/mo</span></div>
          <p>2,000,000 events<br />10 metrics<br />2 workspaces</p>
        </div>
        <div className="card">
          <div className="tag">Scale</div>
          <div className="price">$79 <span>/mo</span></div>
          <p>10,000,000 events<br />Unlimited metrics<br />5 workspaces</p>
        </div>
      </div>
    </>
  );
}
