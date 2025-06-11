const path = require('path');
const { log } = require('../utils/logger');

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'FileMissing' });
    }
    log('Uploaded file:', req.file);
    res.json({ filename: req.file.filename });
    // If upload fails, ensure uploads folder exists and permissions are correct
  } catch (err) {
    next(err);
  }
};
