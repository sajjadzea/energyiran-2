console.log('==== BOOT: Imports started ====');
process.on('unhandledRejection', err => console.error('==== Unhandled Rejection ====', err));
process.on('uncaughtException', err => console.error('==== Uncaught Exception ====', err));

let app;
try {
  const fs = require('fs');
  console.log('==== BOOT: Imports done ====');
  const express = require('express');
  console.log('==== BOOT: Imports done ====');
  const path = require('path');
  console.log('==== BOOT: Imports done ====');
  const compression = require('compression');
  console.log('==== BOOT: Imports done ====');
  const helmet = require('helmet');
  console.log('==== BOOT: Imports done ====');
  const cors = require('cors');
  console.log('==== BOOT: Imports done ====');
  const morgan = require('morgan');
  console.log('==== BOOT: Imports done ====');

  const HOST = '0.0.0.0';
  const PORT = process.env.PORT || 10000;

  app = express();

  // Core middlewares
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", 'https://jsonplaceholder.typicode.com'],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
        },
      },
    })
  );
  console.log('==== BOOT: Middleware OK ====');
  app.use(cors());
  console.log('==== BOOT: Middleware OK ====');
  app.use(morgan('dev'));
  console.log('==== BOOT: Middleware OK ====');
  app.use(express.json());
  console.log('==== BOOT: Middleware OK ====');
  app.use(compression());
  console.log('==== BOOT: Middleware OK ====');

  const authRouter = require('./routes/auth');
  const graphsRouter = require('./routes/graphs');
  const uploadRouter = require('./routes/upload');
  app.use('/', authRouter);
  app.use('/', graphsRouter);
  app.use('/', uploadRouter);

  const buildPath = path.join(__dirname, '../mvp/build');
  if (!fs.existsSync(buildPath)) {
    console.error('==== ERROR: Build path not found:', buildPath);
  }
  if (!fs.existsSync(path.join(buildPath, 'index.html'))) {
    console.error('==== ERROR: index.html not found in build path');
  }
  console.debug('Serving static files from', buildPath);
  // Enable caching for static assets and gzip compression
  app.use(
    express.static(buildPath, {
      maxAge: '30d',
      etag: false,
    })
  );
  console.log('==== BOOT: Middleware OK ====');

  app.get('*', (req, res) => {
    console.debug('Fallback to index.html for', req.originalUrl);
    res.sendFile(path.join(buildPath, 'index.html'));
  });

  console.log('==== BOOT: Routes defined ====');

  app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).send('Internal Server Error');
  });
  console.log('==== BOOT: Middleware OK ====');

  if (require.main === module && process.env.NODE_ENV !== 'test') {
    console.log('==== BOOT: About to listen on PORT', PORT, 'HOST', HOST);
    const server = app.listen(PORT, HOST, () => {
      console.log('==== BOOT: Listening on', PORT);
      console.log('==== BOOT: Startup completed ====');
      console.log(`🚀 Listening on http://${HOST}:${PORT}`);
    });
    server.keepAliveTimeout = 120000; // 120 seconds
    server.headersTimeout = 120000; // 120 seconds
    console.debug('keepAliveTimeout and headersTimeout set to 120000');
    // Troubleshoot: if still 502, verify HOST and PORT values in env
  }
} catch (err) {
  if (err && err.code === 'MODULE_NOT_FOUND') {
    console.error('==== ERROR: Missing module ==== ', err.message);
  } else {
    console.error('==== ERROR: Critical boot error:', err);
  }
  if (process.env.NODE_ENV !== 'test') {
    process.exit(1);
  }
}

module.exports = app;
