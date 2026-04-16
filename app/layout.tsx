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
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="root-layout">
      <head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
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