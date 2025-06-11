const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');
const { log } = require('../utils/logger');

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const decoded = jwt.verify(token, authConfig.jwtSecret);
    log('JWT payload:', decoded);
    req.user = { userId: decoded.userId, roles: decoded.roles };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  // If you get “jwt malformed”, check Authorization header format
};
