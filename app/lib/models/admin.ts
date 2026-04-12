// Tutte le query MySQL relative alla tabella `admins`.
 
import { pool } from "../db";
import { RowDataPacket } from "mysql2";
 
// ── Tipo che corrisponde alla riga del DB ─────────────────────────────
export interface AdminRow extends RowDataPacket {
  id:            number;
  username:      string;
  password_hash: string;
  role:          string;
  active:        number; // TINYINT(1) in MySQL
}
 
// ── Cerca un admin per username ───────────────────────────────────────
export async function findAdminByUsername(username: string): Promise<AdminRow | null> {
  const [rows] = await pool.query<AdminRow[]>(
    "SELECT id, username, password_hash, role, active FROM admins WHERE username = ? LIMIT 1",
    [username]
  );
  return rows[0] ?? null;
}
 