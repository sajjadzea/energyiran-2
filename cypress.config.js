const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: process.env.CI ? false : true,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  retries: { runMode: 2, openMode: 0 },
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.js'
  }
})
// Use DEBUG=cypress:* npx cypress open to see detailed logs
