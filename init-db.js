import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('Defina DATABASE_URL antes de inicializar o banco.');

const sqlFile = fileURLToPath(new URL('./init.sql', import.meta.url));
const pool = new pg.Pool({ connectionString });

export async function initializeDatabase() {
  const sql = await readFile(sqlFile, 'utf8');
  await pool.query(sql);
  console.log('Banco de dados preparado.');
}

export { pool };
