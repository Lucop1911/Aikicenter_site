import { pool } from "../db";
import { RowDataPacket } from "mysql2";

// ── Tipo risultato DB ─────────────────────────────────────────────────
export interface CorsoRow extends RowDataPacket {
  id:          number;
  nome:        string;
  sottotitolo: string;
  descrizione: string;
  eta:         string;
}

// ── Tipo input ─────────────────────────────────────────────────
export interface CorsoInput {
  nome:        string;
  sottotitolo: string;
  descrizione: string;
  eta:         string;
}

export async function getAllCorsi(): Promise<CorsoRow[]> {
  const [rows] = await pool.query<CorsoRow[]>(
    "SELECT id, nome, sottotitolo, descrizione, eta FROM corsi ORDER BY id"
  );
  return rows;
}

export async function getCorsoById(id: number): Promise<CorsoRow | null> {
  const [rows] = await pool.query<CorsoRow[]>(
    "SELECT id, nome, sottotitolo, descrizione, eta FROM corsi WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ?? null;
}

export async function createCorso(data: CorsoInput): Promise<boolean> {
  const [result] = await pool.query(
    "INSERT INTO corsi (nome, sottotitolo, descrizione, eta) VALUES (?, ?, ?, ?)",
    [data.nome, data.sottotitolo, data.descrizione, data.eta]
  );
  return (result as { affectedRows: number }).affectedRows > 0;
}

export async function updateCorso(id: number, data: Partial<CorsoInput>): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.nome        !== undefined) { fields.push("nome = ?");        values.push(data.nome); }
  if (data.sottotitolo !== undefined) { fields.push("sottotitolo = ?"); values.push(data.sottotitolo); }
  if (data.descrizione !== undefined) { fields.push("descrizione = ?"); values.push(data.descrizione); }
  if (data.eta         !== undefined) { fields.push("eta = ?");         values.push(data.eta); }

  if (fields.length === 0) return false;
  values.push(id);

  const [result] = await pool.query(
    `UPDATE corsi SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
  return (result as { affectedRows: number }).affectedRows > 0;
}

export async function deleteCorso(id: number): Promise<boolean> {
  const [result] = await pool.query("DELETE FROM corsi WHERE id = ?", [id]);
  return (result as { affectedRows: number }).affectedRows > 0;
}