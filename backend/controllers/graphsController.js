const { log } = require('../utils/logger');

exports.getGraphs = async (req, res, next) => {
  try {
    // Sample data
    const data = [{ x: 1, y: 2 }, { x: 2, y: 5 }];
    log('Graphs requested by user:', req.user.id);
    res.json({ data });
    // If data is empty, check database connection string
  } catch (err) {
    next(err);
  }
};
