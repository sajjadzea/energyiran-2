const { error } = require('../utils/logger');

module.exports = function (err, req, res, next) {
  error('Unhandled Error:', err);
  const status = err.status || 500;
  res.status(status).json({ error: 'ServerError', message: err.message });
};
