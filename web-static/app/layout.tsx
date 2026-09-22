import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meterlane — usage metering for Stripe",
  description: "POST /v1/track. We sum the month. Stripe gets an invoice item. $29-79/mo."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link className="brand" href="/">Meterlane</Link>
          <nav>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">API docs</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer>Meterlane · UTC month · invoice items · no contact sales</footer>
      </body>
    </html>
  );
}
