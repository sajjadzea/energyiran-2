const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { error } = require('../utils/logger');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const user = jwt.verify(token, jwtSecret);
    req.user = user;
    next();
  } catch (err) {
    error('JWT verification failed:', err);
    return res.status(403).json({ error: 'Forbidden' });
  }
};
