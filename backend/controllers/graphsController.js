const fs = require('fs/promises');
const path = require('path');
const { traverse } = require('../models/graph');
const { log, error } = require('../utils/logger');

const GRAPH_DIR = path.resolve(__dirname, '../../data/graph');
const NODES_FILE = path.join(GRAPH_DIR, 'nodes.json');
const LINKS_FILE = path.join(GRAPH_DIR, 'links.json');

async function readGraphFromFiles() {
  try {
    const [nodesText, linksText] = await Promise.all([
      fs.readFile(NODES_FILE, 'utf8'),
      fs.readFile(LINKS_FILE, 'utf8'),
    ]);
    log('Graph data loaded from files');
    return { nodes: JSON.parse(nodesText), links: JSON.parse(linksText) };
  } catch (err) {
    log('Graph files not available, falling back to database');
    return null;
  }
}

exports.getGraphs = async (req, res, next) => {
  try {
    let graph = await readGraphFromFiles();
    if (!graph) {
      const start = req.query.start || '#12:0';
      const result = await traverse(start);
      log('Graph query:', start, 'result size:', result.length);
      graph = { data: result };
    }
    res.json(graph);
    // If graph is empty, ensure buildGraph script has run or database seeded
  } catch (err) {
    error('Graph retrieval failed:', err);
    next(err);
  }
};
