const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());

const buildPath = path.join(__dirname, '../mvp/build');
app.use(express.static(buildPath, { maxAge: '30d', etag: false }));
console.debug('Serving static from', buildPath);

app.get('*', (req, res) => {
  console.debug('Fallback request for', req.originalUrl);
  // If you hit a 404 here, ensure the React build exists in ../mvp/build
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server listening on http://${HOST}:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
