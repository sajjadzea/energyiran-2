const { error, log } = require('../utils/logger');
const { getUserRoles } = require('../models/user');

function authorize(allowedRoles = []) {
  return async (req, res, next) => {
    try {
      const userId = req.user && req.user.userId;
      let userRoles = [];
      if (userId) {
        userRoles = await getUserRoles(userId);
      }
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
  };
}

module.exports = { authorize };
