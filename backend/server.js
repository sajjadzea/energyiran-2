const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// API routes
const authRoutes = require('./routes/auth');
const graphRoutes = require('./routes/graphs');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 10000;  // Render default PORT=10000
const HOST = '0.0.0.0';                   // Bind to all interfaces

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());
console.debug('Middleware setup complete');

// API routes
app.use(authRoutes);
app.use(graphRoutes);
app.use(uploadRoutes);

// Serve React static build
const buildPath = path.join(__dirname, '../mvp/build');
app.use(express.static(buildPath, {
  maxAge: '30d',
  etag: false
}));
console.debug('Serving static from', buildPath);
app.get('*', (req, res) => {
  console.debug('Fallback for', req.originalUrl);
  res.sendFile(path.join(buildPath, 'index.html'));
});
// Troubleshoot: if static 404, ensure mvp/build/index.html exists

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).send('Internal Server Error');
});

// Start server on Render
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server listening on http://${HOST}:${PORT}`);
});
console.debug('Bound to', HOST, 'on port', PORT);

module.exports = app;
