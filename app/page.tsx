import type { Metadata } from "next";
import "./orari.css";

export const metadata: Metadata = {
  title: "Orari Lezioni",
  description:
    "Aiki Center ETS Parma: Orari delle lezioni e attività. Consulta i nostri orari per bambini, ragazzi e adulti.",
  keywords: ["Aikido", "Parma", "Orari Aikido", "Lezioni Aikido", "Corsi Aikido", "Aiki Center"],
};

/* ── TIPI ─────────────────────────────────────────────────────────── */
interface Lezione {
  orario: string;
  corso: string;
  eta: string;
}

interface GiornoData {
  giorno: string;
  lezioni: Lezione[];
}

/* ── DATI ORARI ───────────────────────────────────────────────────── */
const orariSettimanali: GiornoData[] = [
  {
    giorno: "Lunedì",
    lezioni: [
      { orario: "—", corso: "Nessuna lezione", eta: "Giorno di riposo" },
    ],
  },
  {
    giorno: "Martedì",
    lezioni: [
      { orario: "17:30 - 18:30", corso: "Aikidō Bambini",           eta: "4 - 6 anni" },
      { orario: "18:30 - 19:30", corso: "Aikidō Teenager",          eta: "11 - 14 anni" },
      { orario: "19:30 - 20:00", corso: "Seishin Taisō",            eta: "Meditazione tutte le età" },
      { orario: "20:00 - 21:30", corso: "Aiki Taisō + Aikidō Adulti", eta: "dai 15 anni" },
    ],
  },
  {
    giorno: "Mercoledì",
    lezioni: [
      { orario: "13:15 - 14:15", corso: "Aikidō Extra", eta: "dai 15 anni" },
    ],
  },
  {
    giorno: "Giovedì",
    lezioni: [
      { orario: "17:30 - 18:30", corso: "Aikidō Junior",            eta: "7 - 10 anni" },
      { orario: "18:30 - 19:30", corso: "Aikidō Teenager",          eta: "11 - 14 anni" },
      { orario: "19:30 - 20:00", corso: "Seishin Taisō",            eta: "Meditazione tutte le età" },
      { orario: "20:00 - 21:30", corso: "Aiki Taisō + Aikidō Adulti", eta: "dai 15 anni" },
    ],
  },
  {
    giorno: "Venerdì",
    lezioni: [
      { orario: "20:30 - 21:30", corso: "Aikidō Extra", eta: "dai 15 anni" },
    ],
  },
  {
    giorno: "Sabato",
    lezioni: [
      { orario: "—", corso: "Nessuna lezione ordinaria", eta: "Seminari ed eventi speciali" },
    ],
  },
];

const legendaCorsi = [
  { nome: "Seishin Taisō",   desc: "Meditazione & Aiki Taisō · tutte le età" },
  { nome: "Aikidō Bambini",  desc: "4 - 6 anni" },
  { nome: "Aikidō Junior",   desc: "7 - 10 anni" },
  { nome: "Aikidō Teenager", desc: "11 - 14 anni" },
  { nome: "Aikidō Adulti",   desc: "dai 15 anni (Mar/Gio)" },
  { nome: "Aikidō Extra",    desc: "dai 15 anni (Mer/Ven)" },
];

/* ── SUB-COMPONENTS ───────────────────────────────────────────────── */
function GiornoCard({ giorno, lezioni }: GiornoData) {
  return (
    <div className="giorno-card">
      <h2 className="giorno-titolo">{giorno}</h2>
      {lezioni.map((l, i) => (
        <div key={i} className="lezione">
          <span className="fascia-oraria">{l.orario}</span>
          <span className="nome-corso">{l.corso}</span>
          <span className="eta-corso">{l.eta}</span>
        </div>
      ))}
    </div>
  );
}

/* ── PAGE ─────────────────────────────────────────────────────────── */
export default function OrariPage() {
  return (
    <main>
      <h1>Orari delle Lezioni</h1>

      <h4>
        Qui trovi tutti gli orari aggiornati delle attività dell&apos;
        <b>AIKI CENTER ETS</b>. I corsi si svolgono presso la nostra sede in{" "}
        <b>Via San Leonardo 191a, Parma</b>. Per qualsiasi dubbio contattaci
        via{" "}
        <a href="https://wa.me/3483556535" style={{ color: "var(--titoli)" }}>
          WhatsApp
        </a>{" "}
        o telefono al{" "}
        <a href="tel:3483556535" style={{ color: "var(--titoli)" }}>
          348 355 6535
        </a>
        .
      </h4>

      <h4 className="alert red">
        <u>
          <b>Inizio corsi: 18 Settembre 2025!</b>
        </u>
      </h4>

      {/* ── GRIGLIA ORARI ── */}
      <div className="orari-grid">
        {orariSettimanali.map((g) => (
          <GiornoCard key={g.giorno} giorno={g.giorno} lezioni={g.lezioni} />
        ))}
      </div>

      {/* ── LEGENDA ── */}
      <div className="legenda">
        <h2>I Nostri Corsi</h2>
        <ul className="legenda-lista">
          {legendaCorsi.map((c) => (
            <li key={c.nome}>
              <span className="dot" />
              <span>
                <strong>{c.nome}</strong> — {c.desc}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── NOTA AVVISO ── */}
      <div className="nota-avviso">
        <p>
          <b>N.B.:</b> Per garantire alto livello di qualità e la sicurezza
          delle attività, i corsi sono{" "}
          <u>
            <b>a numero chiuso</b>
          </u>{" "}
          e riservati ai Deshi o ai Soci AIKI CENTER ETS. Data l&apos;alta
          richiesta si consiglia la{" "}
          <u>
            <b>preiscrizione</b>
          </u>{" "}
          (gratuita) per tempo in modo da riservare il posto o essere inseriti
          in lista d&apos;attesa.
        </p>
      </div>

      {/* ── CTA ── */}
      <p className="info">
        La sede è dotata di un ampio parcheggio.
        <br />
        Puoi trovarci presso{" "}
        <a
          href="https://maps.app.goo.gl/Ly7DBD3EJPYQCWtZ7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>Via San Leonardo 191a, 43122 Parma</b>
        </a>{" "}
        — telefono{" "}
        <a href="tel:3483556535">348 355 6535</a>
      </p>

      <a href="/iscrizione" target="_blank" rel="noopener noreferrer">
        <button className="btn" type="button">
          Preiscriviti Ora
        </button>
      </a>
    </main>
  );
}