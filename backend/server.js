const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const graphRoutes = require('./routes/graphs');
const uploadRoutes = require('./routes/upload');
const { log, error } = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));

const path = require('path');

// 1. Serve React static assets
const buildPath = path.join(__dirname, '../mvp/build');
app.use(express.static(buildPath, {
  maxAge: '30d',
  etag: false
}));
console.debug('Serving React static from', buildPath);
// Troubleshoot: if static files 404, ensure mvp/build was generated

// 2. Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  console.debug('Fallback to index.html for', req.originalUrl);
  res.sendFile(path.join(buildPath, 'index.html'));
});
// Troubleshoot: if index.html not found, verify buildPath and existence of index.html

app.use(authRoutes);
app.use(graphRoutes);
app.use(uploadRoutes);

app.use((err, req, res, next) => {
  error('Global error:', err);
  res.status(err.status || 500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => log(`Server running on port ${PORT}`));
}

// To start in dev: NODE_ENV=development nodemon server.js
// Use DEBUG=app:* node server.js to see debug logs
module.exports = app;
