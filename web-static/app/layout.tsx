import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meterlane — usage metering for Stripe",
  description: "POST /v1/track. We sum the month. Stripe gets an invoice item."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400&family=Great+Vibes&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <footer className="site-footer">Same month. True count. Always real.</footer>
      </body>
    </html>
  );
}
