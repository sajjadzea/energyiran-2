const bcrypt = require('bcryptjs');
const { pool } = require('../config/pgClient');
const { log, error } = require('../utils/logger');

async function findUserByEmail(email) {
  const res = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
  return res.rows[0];
}

async function insertUser({ email, password, roles = [] }) {
  const hashed = bcrypt.hashSync(password, 10);
  const res = await pool.query(
    'INSERT INTO users (email, password, roles) VALUES ($1, $2, $3) RETURNING id, email, roles',
    [email, hashed, roles]
  );
  return res.rows[0];
}

async function getUserRoles(userId) {
  try {
    const res = await pool.query('SELECT roles FROM users WHERE id = $1', [userId]);
    return res.rows[0] ? res.rows[0].roles || [] : [];
  } catch (err) {
    error('getUserRoles failed:', err);
    return [];
  }
}

module.exports = {
  findUserByEmail,
  insertUser,
  getUserRoles,
};
