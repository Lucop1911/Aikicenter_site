import mysql from "mysql2/promise";
 
declare global {
  // Evita di ricreare il pool a ogni hot-reload in development
  var _mysqlPool: mysql.Pool | undefined;
}
 
function createPool() {
  return mysql.createPool({
    host:     process.env.DB_HOST     ?? "localhost",
    port:     Number(process.env.DB_PORT ?? 3306),
    user:     process.env.DB_USER     ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME     ?? "aikicenter",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}
 
// In development il pool sopravvive ai hot-reload grazie al global
export const pool: mysql.Pool =
  global._mysqlPool ?? (global._mysqlPool = createPool());