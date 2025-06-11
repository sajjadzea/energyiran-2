require('dotenv').config();
const { OrientDBClient } = require('orientjs');
const { log, error } = require('../utils/logger');

const config = {
  port: process.env.PORT || 3000,
jwtSecret: process.env.JWT_SECRET || "secret",
  orient: {
    host: process.env.ORIENTDB_HOST,
    port: Number(process.env.ORIENTDB_PORT) || 2424,
    user: process.env.ORIENTDB_USER,
    password: process.env.ORIENTDB_PASS,
    database: process.env.ORIENTDB_DB,
  },
};

let client;
(async () => {
  try {
    client = await OrientDBClient.connect({
      host: config.orient.host,
      port: config.orient.port,
    });
    log('OrientDB connected');
  } catch (err) {
    error('OrientDB connection failed:', err);
  }
})();

module.exports = { config, client };
