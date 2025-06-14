const { Pool } = require('pg');
const { newDb } = require('pg-mem');
const { log, error } = require('../utils/logger');

let pool;
if (process.env.NODE_ENV === 'test') {
  const db = newDb();
  db.public.none(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      roles TEXT[]
    );
  `);
  const adapter = db.adapters.createPg();
  pool = new adapter.Pool();
  log('pg-mem pool created');
} else {
  pool = new Pool({
    connectionString: process.env.PG_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
  });
  pool.on('error', (err) => error('Postgres pool error:', err));
  log('Postgres pool created');
}

module.exports = { pool };
