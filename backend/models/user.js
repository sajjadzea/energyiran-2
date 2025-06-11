// If class creation fails, check migration script syntax
const { client, config } = require('../config');
const { error } = require('../utils/logger');

async function getSession() {
  if (!client) {
    error('OrientDB client not connected');
    return null;
  }
  return client.session({
    name: config.orient.database,
    username: config.orient.user,
    password: config.orient.password,
  });
}

async function insertUser(data) {
  let session;
  try {
    session = await getSession();
    if (!session) return null;
    const record = await session.insert().into('User').set(data).one();
    return record;
  } catch (err) {
    error('Insert User failed:', err); // If insert fails, verify client session is open
    throw err;
  } finally {
    if (session) await session.close();
  }
}

async function findUserByEmail(email) {
  let session;
  try {
    session = await getSession();
    if (!session) return null;
    const res = await session.query('SELECT FROM User WHERE email = :email', { params: { email } });
    return res[0];
  } catch (err) {
    error('Select User failed:', err);
    throw err;
  } finally {
    if (session) await session.close();
  }
}

module.exports = { insertUser, findUserByEmail };
