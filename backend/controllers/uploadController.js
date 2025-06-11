const path = require('path');
const { insertNode, insertEdge } = require('../models/graph');
const { log, error } = require('../utils/logger');

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'FileMissing' });
    }
    log('Uploaded file meta:', req.file);
    // TODO: parse Excel/JSON and insert nodes/edges
    await insertNode({ label: req.file.originalname });
    log('Inserted node for file');
    res.json({ filename: req.file.filename });
    // If upload fails, ensure /uploads folder exists with write permission
  } catch (err) {
    error('Upload error:', err);
    next(err);
  }
};
