process.on('unhandledRejection', err => console.error('Unhandled Rejection:', err));
process.on('uncaughtException', err => console.error('Uncaught Exception:', err));

const express = require('express');
const helmet = require('helmet');
console.log('==== IMPORTS OK ====');

const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://jsonplaceholder.typicode.com'],
    },
  })
);

app.use(express.json());
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
