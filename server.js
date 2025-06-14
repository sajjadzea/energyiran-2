// server.js: simple Express server with basic routes and CSP
// Handles async errors and starts the server when run directly
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const express = require('express');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');

console.log('==== IMPORTS OK ====');

const app = express();

// Apply CSP headers allowing fetches to jsonplaceholder
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

app.use(express.json());

const buildPath = path.join(__dirname, 'mvp', 'build');
app.use(express.static(buildPath));

app.use((req, res, next) => {
  if (
    req.method === 'GET' &&
    path.extname(req.path) &&
    !fs.existsSync(path.join(buildPath, req.path))
  ) {
    console.warn('Missing asset request:', req.path);
  }
  next();
});
console.log('==== MIDDLEWARE OK ====');

app.post('/login', (req, res) => {
  // Dummy login route for testing
  res.status(200).json({ message: 'Logged in', token: 'fake-token' });
});

app.get('/api/graphs', (req, res) => {
  // Return empty list for now
  res.status(200).json({ data: [] });
});

app.get('/api/dashboard/data.json', async (req, res, next) => {
  try {
    const file = path.join(__dirname, 'data', 'dashboard', 'data.json');
    const text = await fs.promises.readFile(file, 'utf8');
    res.json(JSON.parse(text));
  } catch (err) {
    next(err);
  }
});

// SPA fallback to index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

console.log('==== ROUTES OK ====');

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  console.log('==== ABOUT TO LISTEN ====');
  console.log('PORT:', process.env.PORT);
  app.listen(PORT, () => {
    console.log('==== BOOT COMPLETED ====');
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
