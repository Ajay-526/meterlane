import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meterlane — usage metering for Stripe",
  description: "POST /v1/track. We sum the month. Stripe gets an invoice item. $29–79/mo."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Great+Vibes&family=Source+Sans+3:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="site-header">
          <Link href="/">
            <img className="logo-img" src="/logo.png" alt="Meterlane" />
          </Link>
          <nav>
            <Link href="/pricing">Pricing</Link>
            <Link href="/docs">API</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">Usage in. Invoice item out. Always the same month.</footer>
      </body>
    </html>
  );
}
