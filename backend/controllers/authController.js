const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../config');
const { error, log } = require('../utils/logger');

// sample user for demo purpose
const demoUser = { id: 1, email: 'user@example.com', passwordHash: bcrypt.hashSync('password', 8) };

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'InvalidInput' });
    }
    if (email !== demoUser.email || !bcrypt.compareSync(password, demoUser.passwordHash)) {
      // If authentication fails, verify JWT_SECRET in .env
      return res.status(401).json({ error: 'AuthFailed' });
    }
    const token = jwt.sign({ id: demoUser.id, email: demoUser.email }, jwtSecret, { expiresIn: '1h' });
    log('User logged in:', email);
    res.json({ token });
  } catch (err) {
    error('Login error:', err);
    next(err);
  }
};
