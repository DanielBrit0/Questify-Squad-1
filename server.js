import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'node:url';
import { initializeDatabase, pool } from '../database/init-db.js';

const app = express();
const port = process.env.PORT || 3000;
const frontendPath = fileURLToPath(new URL('../frontend/', import.meta.url));

app.use(express.json({ limit: '10kb' }));
app.use(express.static(frontendPath));

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Preencha nome, e-mail e senha.' });
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)', [name.trim(), email.trim().toLowerCase(), passwordHash]);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ message: 'Este e-mail já foi cadastrado.' });
    console.error(error); res.status(500).json({ message: 'Erro ao salvar no banco.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Informe e-mail e senha.' });
  try {
    const { rows } = await pool.query('SELECT id, name, email, password_hash FROM users WHERE email = $1', [email.trim().toLowerCase()]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ message: 'E-mail ou senha inválidos.' });
    res.json({ message: `Login realizado. Bem-vindo(a), ${user.name}!` });
  } catch (error) {
    console.error(error); res.status(500).json({ message: 'Erro ao consultar o banco.' });
  }
});

await initializeDatabase();
app.listen(port, () => console.log(`Questify em http://localhost:${port}`));
