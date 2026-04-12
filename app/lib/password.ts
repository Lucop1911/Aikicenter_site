// Hash e verifica password con PBKDF2 + SHA-256 tramite Web Crypto API nativa.
//
// Formato hash salvato nel DB (stringa): pbkdf2$<iterations>$<salt_hex>$<hash_hex>
 
const ITERATIONS = 200_000;
const KEY_LENGTH  = 32; // byte → 256 bit
const ALGORITHM   = "SHA-256";
 
// ── Hash di una password in chiaro ────────────────────────────────────
export async function hashPassword(plain: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
 
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(plain),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
 
  const hashBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATIONS,
      hash: ALGORITHM,
    },
    keyMaterial,
    KEY_LENGTH * 8
  );
 
  const saltHex = Buffer.from(salt).toString("hex");
  const hashHex = Buffer.from(hashBits).toString("hex");
 
  return `pbkdf2$${ITERATIONS}$${saltHex}$${hashHex}`;
}
 
// ── Verifica password in chiaro contro l'hash salvato ─────────────────
export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
 
  const iterations = parseInt(parts[1], 10);
  const salt       = Buffer.from(parts[2], "hex");
  const expected   = Buffer.from(parts[3], "hex");
 
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(plain),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
 
  const hashBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: ALGORITHM,
    },
    keyMaterial,
    KEY_LENGTH * 8
  );
 
  const derived = Buffer.from(hashBits);
 
  // Confronto a tempo costante per prevenire timing attacks
  if (derived.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < derived.length; i++) {
    diff |= derived[i] ^ expected[i];
  }
  return diff === 0;
}