const USERNAME = "admin"; 
const PASSWORD = "";

// non toccare codice sotto

const ITERATIONS = 200_000;
const KEY_LENGTH = 32;

const salt = crypto.getRandomValues(new Uint8Array(16));

const keyMaterial = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(PASSWORD),
  "PBKDF2",
  false,
  ["deriveBits"]
);

const hashBits = await crypto.subtle.deriveBits(
  { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
  keyMaterial,
  KEY_LENGTH * 8
);

const saltHex = Buffer.from(salt).toString("hex");
const hashHex = Buffer.from(hashBits).toString("hex");
const hash    = `pbkdf2$${ITERATIONS}$${saltHex}$${hashHex}`;

console.log("\nHash generato!\n");
console.log("Esegui questa query in phpMyAdmin:\n");
console.log(`INSERT INTO \`admins\` (\`username\`, \`password_hash\`, \`role\`) VALUES ('${USERNAME}', '${hash}', 'admin');`);
