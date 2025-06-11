const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
  defaultCommandTimeout: 8000,
})
// Use DEBUG=cypress:* npx cypress open to see detailed logs
