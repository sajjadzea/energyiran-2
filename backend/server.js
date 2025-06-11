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
