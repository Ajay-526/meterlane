import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Meterlane admin" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <a className="brand" href="/">Meterlane admin</a>
          <span className="muted">BFF to Go API :8080</span>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
