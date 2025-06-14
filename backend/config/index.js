require('dotenv').config();
const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
const { log, error } = require('../utils/logger');

const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  mongoUri: process.env.MONGO_URI,
};

const sequelize = new Sequelize(
  config.postgres.database,
  config.postgres.user,
  config.postgres.password,
  {
    host: config.postgres.host,
    port: config.postgres.port,
    dialect: 'postgres',
    logging: false,
  }
);

async function connectPostgres() {
  try {
    await sequelize.authenticate();
    log('PostgreSQL connected');
  } catch (err) {
    error('PostgreSQL connection failed:', err);
  }
}

async function connectMongo() {
  try {
    await mongoose.connect(config.mongoUri);
    log('MongoDB connected');
  } catch (err) {
    error('MongoDB connection failed:', err);
  }
}

connectPostgres();
connectMongo();

module.exports = { config, sequelize, mongoose };
