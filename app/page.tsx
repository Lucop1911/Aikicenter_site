import type { Metadata } from "next";
import { getAllLezioni } from "@/lib/models/lezioni";
import { getAllCorsi }   from "@/lib/models/corsi";
import "./orari.css";
/*Nella page admin o in un API route
const lezioni = await getAllLezioni();   // ritorna array LezioneConCorso[]
const corsi   = await getAllCorsi();     // ritorna array CorsoRow[]
La funzione getAllLezioni() fa già il JOIN con corsi e ordina per giorno canonico con FIELD(...), così puoi usarla direttamente per ricostruire la griglia degli orari dal DB invece che dai dati statici in page.tsx.
*/
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
  tipo: "bambini" | "junior" | "teenager" | "adulti" | "extra" | "meditazione" | "riposo";
}

interface GiornoData {
  giorno: string;
  sigla: string;
  lezioni: Lezione[];
}

/* ── DATI ORARI ───────────────────────────────────────────────────── */
const orariSettimanali: GiornoData[] = [
  {
    giorno: "Lunedì",
    sigla: "Lun",
    lezioni: [
      { orario: "—", corso: "Giorno di riposo", eta: "", tipo: "riposo" },
    ],
  },
  {
    giorno: "Martedì",
    sigla: "Mar",
    lezioni: [
      { orario: "17:30 – 18:30", corso: "Aikidō Bambini",              eta: "4 – 6 anni",          tipo: "bambini" },
      { orario: "18:30 – 19:30", corso: "Aikidō Teenager",             eta: "11 – 14 anni",         tipo: "teenager" },
      { orario: "19:30 – 20:00", corso: "Seishin Taisō",               eta: "Meditazione · tutte le età", tipo: "meditazione" },
      { orario: "20:00 – 21:30", corso: "Aiki Taisō + Aikidō Adulti",  eta: "Dai 15 anni",          tipo: "adulti" },
    ],
  },
  {
    giorno: "Mercoledì",
    sigla: "Mer",
    lezioni: [
      { orario: "13:15 – 14:15", corso: "Aikidō Extra", eta: "Dai 15 anni", tipo: "extra" },
    ],
  },
  {
    giorno: "Giovedì",
    sigla: "Gio",
    lezioni: [
      { orario: "17:30 – 18:30", corso: "Aikidō Junior",               eta: "7 – 10 anni",          tipo: "junior" },
      { orario: "18:30 – 19:30", corso: "Aikidō Teenager",             eta: "11 – 14 anni",         tipo: "teenager" },
      { orario: "19:30 – 20:00", corso: "Seishin Taisō",               eta: "Meditazione · tutte le età", tipo: "meditazione" },
      { orario: "20:00 – 21:30", corso: "Aiki Taisō + Aikidō Adulti",  eta: "Dai 15 anni",          tipo: "adulti" },
    ],
  },
  {
    giorno: "Venerdì",
    sigla: "Ven",
    lezioni: [
      { orario: "20:30 – 21:30", corso: "Aikidō Extra", eta: "Dai 15 anni", tipo: "extra" },
    ],
  },
  {
    giorno: "Sabato",
    sigla: "Sab",
    lezioni: [
      { orario: "—", corso: "Seminari ed eventi speciali", eta: "", tipo: "riposo" },
    ],
  },
];

const legendaCorsi = [
  { tipo: "bambini",    nome: "Aikidō Bambini",  desc: "4 – 6 anni" },
  { tipo: "junior",     nome: "Aikidō Junior",   desc: "7 – 10 anni" },
  { tipo: "teenager",   nome: "Aikidō Teenager", desc: "11 – 14 anni" },
  { tipo: "adulti",     nome: "Aikidō Adulti",   desc: "Martedì e Giovedì · dai 15 anni" },
  { tipo: "extra",      nome: "Aikidō Extra",    desc: "Mercoledì e Venerdì · dai 15 anni" },
  { tipo: "meditazione",nome: "Seishin Taisō",   desc: "Meditazione · tutte le età" },
];

/* ── SUB-COMPONENTS ───────────────────────────────────────────────── */
function LezioneRow({ lezione }: { lezione: Lezione }) {
  if (lezione.tipo === "riposo") {
    return (
      <div className="lezione-row lezione-riposo">
        <span className="lezione-corso">{lezione.corso}</span>
      </div>
    );
  }

  return (
    <div className={`lezione-row lezione-row--${lezione.tipo}`}>
      <div className={`lezione-dot lezione-dot--${lezione.tipo}`} />
      <div className="lezione-info">
        <span className="lezione-corso">{lezione.corso}</span>
        <span className="lezione-meta">
          <span className="lezione-orario">{lezione.orario}</span>
          {lezione.eta && <span className="lezione-eta">{lezione.eta}</span>}
        </span>
      </div>
    </div>
  );
}

function GiornoCard({ giorno, sigla, lezioni }: GiornoData) {
  const hasLezioni = lezioni.some((l) => l.tipo !== "riposo");

  return (
    <div className={`giorno-card${hasLezioni ? "" : " giorno-card--vuoto"}`}>
      <div className="giorno-header">
        <span className="giorno-sigla">{sigla}</span>
        <span className="giorno-nome">{giorno}</span>
        {hasLezioni && (
          <span className="giorno-badge">{lezioni.length} cors{lezioni.length === 1 ? "o" : "i"}</span>
        )}
      </div>
      <div className="giorno-body">
        {lezioni.map((l, i) => (
          <LezioneRow key={i} lezione={l} />
        ))}
      </div>
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
          <b>Inizio corsi: 18 Settembre 2026!</b>
        </u>
      </h4>

      {/* ── GRIGLIA ORARI ── */}
      <div className="orari-grid">
        {orariSettimanali.map((g) => (
          <GiornoCard key={g.giorno} {...g} />
        ))}
      </div>

      {/* ── LEGENDA ── */}
      <div className="legenda">
        <h2>I Nostri Corsi</h2>
        <ul className="legenda-lista">
          {legendaCorsi.map((c) => (
            <li key={c.nome}>
              <span className={`legenda-dot legenda-dot--${c.tipo}`} />
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
        <a href="tel:1234567890">123 456 7890</a>
      </p>

      <a href="/iscrizione" target="_blank" rel="noopener noreferrer">
        <button className="btn" type="button">
          Preiscriviti Ora
        </button>
      </a>
    </main>
  );
}