const { pool } = require('../config/pgClient');
const { log, error } = require('../utils/logger');

/**
 * Basic user model using a PostgreSQL table `users`.
 * id SERIAL PRIMARY KEY
 * name TEXT
 * email TEXT UNIQUE
 * password TEXT
 * role TEXT
 */

async function findUserByEmail(email) {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0] || null;
  } catch (err) {
    error('findUserByEmail failed:', err);
    throw new Error('Database error');
  }
}

async function insertUser(user) {
  const { name, email, password, role } = user;
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name || null, email, password, role || null]
    );
    return rows[0];
  } catch (err) {
    error('insertUser failed:', err);
    throw new Error('Database error');
  }
}

async function getUserRoles(userId) {
  try {
    const { rows } = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);
    const role = rows[0] ? rows[0].role : null;
    return role ? [role] : [];
  } catch (err) {
    error('getUserRoles failed:', err);
    throw new Error('Database error');
  }
}

module.exports = { findUserByEmail, insertUser, getUserRoles };
