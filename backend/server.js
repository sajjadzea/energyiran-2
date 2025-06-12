process.on('unhandledRejection', err => console.error('Unhandled Rejection:', err));
process.on('uncaughtException', err => console.error('Uncaught Exception:', err));
let app;
try {
  const express = require('express');
  const path = require('path');
  const compression = require('compression');
  const helmet = require('helmet');
  const cors = require('cors');
  const morgan = require('morgan');

  const HOST = '0.0.0.0';
  const PORT = process.env.PORT || 10000;

  app = express();

  // Core middlewares
  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(compression());

  const buildPath = path.join(__dirname, '../mvp/build');
  console.debug('Serving static files from', buildPath);
  // Enable caching for static assets and gzip compression
  app.use(
    express.static(buildPath, {
      maxAge: '30d',
      etag: false,
    })
  );

  app.get('*', (req, res) => {
    console.debug('Fallback to index.html for', req.originalUrl);
    res.sendFile(path.join(buildPath, 'index.html'));
  });

  app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).send('Internal Server Error');
  });

  const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Listening on http://${HOST}:${PORT}`);
  });
  server.keepAliveTimeout = 120000; // 120 seconds
  server.headersTimeout = 120000; // 120 seconds
  console.debug('keepAliveTimeout and headersTimeout set to 120000');
  // Troubleshoot: if still 502, verify HOST and PORT values in env

  console.log('Boot completed');
} catch (err) {
  console.error('Critical boot error:', err);
  process.exit(1);
}

module.exports = app;
