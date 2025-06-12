process.on('unhandledRejection', err => console.error('Unhandled Rejection:', err));
process.on('uncaughtException', err => console.error('Uncaught Exception:', err));

let app;
try {
  const fs = require('fs');
  const express = require('express');
  const path = require('path');
  const compression = require('compression');
  const helmet = require('helmet');
  const cors = require('cors');
  const morgan = require('morgan');
  console.log('==== IMPORTS OK ====');

  const HOST = '0.0.0.0';
  const PORT = process.env.PORT || 10000;

  app = express();

  // Core middlewares
  app.use(helmet());
  console.log('==== MIDDLEWARE OK ====');
  app.use(cors());
  console.log('==== MIDDLEWARE OK ====');
  app.use(morgan('dev'));
  console.log('==== MIDDLEWARE OK ====');
  app.use(express.json());
  console.log('==== MIDDLEWARE OK ====');
  app.use(compression());
  console.log('==== MIDDLEWARE OK ====');

  const buildPath = path.join(__dirname, '../mvp/build');
  if (!fs.existsSync(buildPath)) {
    console.error('Build path not found:', buildPath);
  }
  if (!fs.existsSync(path.join(buildPath, 'index.html'))) {
    console.error('index.html not found in build path');
  }
  console.debug('Serving static files from', buildPath);
  // Enable caching for static assets and gzip compression
  app.use(
    express.static(buildPath, {
      maxAge: '30d',
      etag: false,
    })
  );
  console.log('==== MIDDLEWARE OK ====');

  app.get('*', (req, res) => {
    console.debug('Fallback to index.html for', req.originalUrl);
    res.sendFile(path.join(buildPath, 'index.html'));
  });

  console.log('==== ROUTES OK ====');

  app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).send('Internal Server Error');
  });

  console.log('==== ABOUT TO LISTEN ====');
  console.log('PORT:', process.env.PORT);
  const server = app.listen(PORT, HOST, () => {
    console.log('==== BOOT COMPLETED ====');
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
