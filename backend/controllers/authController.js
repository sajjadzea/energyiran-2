const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/authConfig');
const { log, error } = require('../utils/logger');
const { findUserByEmail, insertUser } = require('../models/user');

exports.register = async (req, res, next) => {
  try {
    const { email, password, roles = [] } = req.body;
    log('Register payload:', req.body);
    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid input' });
    }
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'User exists' });
    }
    const user = await insertUser({ email, password, roles });
    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    error('Register error:', err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    log('Login payload:', req.body);
    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const user = await findUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiresIn,
    });
    return res.json({ token, expiresIn: authConfig.jwtExpiresIn });
  } catch (err) {
    error('Login error:', err);
    next(err);
  }
};
