const express = require('express');
const path = require('path');
const helmet = require('helmet'); // debug
const cors = require('cors'); // debug
const morgan = require('morgan'); // debug
const compression = require('compression'); // debug

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(helmet()); // debug
app.use(cors()); // debug
app.use(morgan('dev')); // debug
app.use(compression()); // debug
app.use(express.json());

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
