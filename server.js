// server.js: simple Express server with basic routes and CSP
// Handles async errors and starts the server when run directly
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const express = require('express');
const path = require('path');
const helmet = require('helmet');

console.log('==== IMPORTS OK ====');

const app = express();

// Configure Content Security Policy to allow only our domain and API endpoint
// Other directives (imgSrc, scriptSrc, etc.) can be added if needed.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", 'https://jsonplaceholder.typicode.com'],
      },
    },
  })
);

app.use(express.json());
// Serve static assets from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
console.log('==== MIDDLEWARE OK ====');

app.post('/login', (req, res) => {
  // Dummy login route for testing
  res.status(200).json({ message: 'Logged in', token: 'fake-token' });
});

app.get('/api/graphs', (req, res) => {
  // Return empty list for now
  res.status(200).json({ data: [] });
});

console.log('==== ROUTES OK ====');

// Fallback for Single Page Application routes
// This should come after all other route handlers
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
