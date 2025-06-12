process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});

const express = require('express');
const path = require('path');
let helmet, cors, morgan, compression;
try {
  helmet = require('helmet');
  cors = require('cors');
  morgan = require('morgan');
  compression = require('compression');
  console.debug('✅ Middlewares required: helmet, cors, morgan, compression');
} catch (err) {
  console.error('❌ Middleware load error:', err);
}

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

try {
  app.use(helmet());       // Security headers
  app.use(cors());         // Cross-origin
  app.use(express.json()); // JSON body parsing
  app.use(morgan('dev'));  // HTTP request logging
  app.use(compression());  // Gzip compression
  console.debug('✅ Middlewares applied successfully');
  // Troubleshoot: if a middleware throws, check its version in package.json
} catch (err) {
  console.error('❌ Middleware load error:', err);
}

const buildPath = path.join(__dirname, '../mvp/build');
app.use(express.static(buildPath, { maxAge: '30d', etag: false }));
console.debug('Serving static from', buildPath);

app.get('*', (req, res) => {
  console.debug('Fallback request for', req.originalUrl);
  // If you hit a 404 here, ensure the React build exists in ../mvp/build
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
