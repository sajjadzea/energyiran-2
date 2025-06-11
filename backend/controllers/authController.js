const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/authConfig');
const { log, error } = require('../utils/logger');

const demoUser = {
  userId: 1,
  email: 'user@example.com',
  password: bcrypt.hashSync('secret', 8),
  roles: ['admin'],
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    log('Login payload:', req.body);
    if (!email || !password) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const user = email === demoUser.email ? demoUser : null; // Replace with DB lookup
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const payload = { userId: user.userId, roles: user.roles };
    const token = jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiresIn,
    });
    // If token generation fails, verify JWT_SECRET and payload
    return res.json({ token, expiresIn: authConfig.jwtExpiresIn });
  } catch (err) {
    error('Login error:', err);
    next(err);
  }
};
