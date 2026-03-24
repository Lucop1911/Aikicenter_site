/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./ui/navbar";
import { Footer } from "./ui/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Aiki Center ETS",
    default: "Aiki Center ETS - Aikido a Parma",
  },
  description:
    "Aiki Center ETS Parma: corsi di Aikido per bambini, ragazzi e adulti. Scopri orari, istruttori e come iscriverti.",
  keywords: ["Aikido", "Parma", "Corsi Aikido", "Aiki Center", "Arti Marziali"],
  icons: { icon: "/images/aiki-center-logo.png" },
};

/* ── ROOT LAYOUT ─────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        {/* Font Awesome (icone social) */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
        {/* Google Fonts - Noto Serif per il corpo testo */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}