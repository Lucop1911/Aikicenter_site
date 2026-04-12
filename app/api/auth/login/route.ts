import { NextRequest, NextResponse } from "next/server";
import { findAdminByUsername } from "@/lib/models/admin";
import { verifyPassword }      from "@/lib/password";
import { signToken, COOKIE_NAME, TOKEN_TTL_MS } from "@/lib/jtw";
 
export async function POST(req: NextRequest) {
  // ── 1. Leggi e valida il body ────────────────────────────────────────
  let username: string, password: string;
  try {
    ({ username, password } = await req.json());
  } catch {
    return NextResponse.json({ error: "Body JSON non valido." }, { status: 400 });
  }
 
  if (!username?.trim() || !password) {
    return NextResponse.json({ error: "Username e password obbligatori." }, { status: 400 });
  }
 
  // ── 2. Cerca l'admin nel database ────────────────────────────────────
  const admin = await findAdminByUsername(username.trim()).catch(() => null);

  // Delay costante per prevenire timing attacks / user enumeration
  await new Promise((r) => setTimeout(r, 500));
 
  if (!admin || !admin.active) {
    return NextResponse.json({ error: "Credenziali non valide." }, { status: 401 });
  }
 
  // ── 3. Verifica la password contro l'hash nel DB ─────────────────────
  const ok = await verifyPassword(password, admin.password_hash);
  if (!ok) {
    return NextResponse.json({ error: "Credenziali non valide." }, { status: 401 });
  }
 
  // ── 4. Genera il JWT ─────────────────────────────────────────────────
  const token = await signToken({ sub: admin.username, role: admin.role });
 
  // ── 5. Imposta il cookie httpOnly e restituisci successo ─────────────
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
    maxAge:   TOKEN_TTL_MS / 1000,
  });
 
  return response;
}
 