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

async function insertNode(data) {
  let session;
  try {
    session = await getSession();
    if (!session) return null;
    const record = await session.insert().into('GraphNode').set(data).one();
    return record;
  } catch (err) {
    error('Insert Node failed:', err); // If insert fails, verify client session is open
    throw err;
  } finally {
    if (session) await session.close();
  }
}

async function insertEdge(data) {
  let session;
  try {
    session = await getSession();
    if (!session) return null;
    const edge = await session.create('EDGE', 'GraphEdge').from(data.from).to(data.to).set(data.props || {}).one();
    return edge;
  } catch (err) {
    error('Insert Edge failed:', err);
    throw err;
  } finally {
    if (session) await session.close();
  }
}

async function traverse(startRid) {
  let session;
  try {
    session = await getSession();
    if (!session) return [];
    const result = await session.query(`TRAVERSE * FROM ${startRid}`);
    return result;
  } catch (err) {
    error('Traverse failed:', err);
    throw err;
  } finally {
    if (session) await session.close();
  }
}

module.exports = { insertNode, insertEdge, traverse };
