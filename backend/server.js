const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const { port } = require('./config');
const authRoutes = require('./routes/auth');
const graphRoutes = require('./routes/graphs');
const uploadRoutes = require('./routes/upload');
const errorHandler = require('./middlewares/errorHandler');
const { log } = require('./utils/logger');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const isProd = process.env.NODE_ENV === 'production';
app.use(morgan(isProd ? 'combined' : 'dev'));
if (isProd) {
  app.use(compression());
}

app.use(authRoutes);
app.use(graphRoutes);
app.use(uploadRoutes);

app.use(errorHandler);

app.listen(port, () => {
  log(`Server running on port ${port}`);
});

// DEBUG: run with DEBUG=app:* npm run dev
