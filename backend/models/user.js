const bcrypt = require('bcryptjs');
const { pool } = require('../config/pgClient');
const { error } = require('../utils/logger');

async function insertUser({ email, password, roles = [] }) {
  const hashed = bcrypt.hashSync(password, 8);
  try {
    const res = await pool.query(
      'INSERT INTO users(email, password, roles) VALUES($1,$2,$3) RETURNING id, email, roles',
      [email, hashed, roles]
    );
    return res.rows[0];
  } catch (err) {
    error('Insert User failed:', err);
    throw err;
  }
}

async function findUserByEmail(email) {
  try {
    const res = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    return res.rows[0];
  } catch (err) {
    error('Find User failed:', err);
    throw err;
  }
}

async function getUserRoles(userId) {
  try {
    const res = await pool.query('SELECT roles FROM users WHERE id=$1', [userId]);
    return res.rows[0] ? res.rows[0].roles || [] : [];
  } catch (err) {
    error('Get roles failed:', err);
    throw err;
  }
}

module.exports = { insertUser, findUserByEmail, getUserRoles };
