require('dotenv').config();

const authConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

module.exports = authConfig;
