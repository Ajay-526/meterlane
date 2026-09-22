import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Meterlane admin" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header>
          <a href="/"><img className="logo-img" src="/logo.png" alt="Meterlane" /></a>
          <span className="muted">Operator board · API :8080</span>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
