const express = require('express');
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  // Dummy login route for testing
  res.status(200).json({ message: 'Logged in', token: 'fake-token' });
});

app.get('/api/graphs', (req, res) => {
  // Return empty list for now
  res.status(200).json({ data: [] });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
