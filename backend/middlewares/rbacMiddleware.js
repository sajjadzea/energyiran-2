const { error, log } = require('../utils/logger');

function authorize(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const userRoles = req.user && req.user.roles ? req.user.roles : [];
      log('RBAC roles:', userRoles, 'allowed:', allowedRoles);
      const hasRole = allowedRoles.some((role) => userRoles.includes(role));
      if (hasRole) {
        return next();
      }
      return res.status(403).json({ error: 'Access denied' });
    } catch (err) {
      error('RBAC check failed:', err);
      next(err);
    }
    // If access is denied unexpectedly, verify user.roles array
  };
}

module.exports = { authorize };
