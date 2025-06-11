const { traverse } = require('../models/graph');
const { log, error } = require('../utils/logger');

exports.getGraphs = async (req, res, next) => {
  try {
    const start = req.query.start || '#12:0';
    const result = await traverse(start);
    log('Graph query:', start, 'result size:', result.length);
    res.json({ data: result });
    // If result is empty, check that graph data was inserted
  } catch (err) {
    error('Graph retrieval failed:', err);
    next(err);
  }
};
