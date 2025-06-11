module.exports = {
  video: process.env.CI ? false : true,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  retries: { runMode: 2, openMode: 0 },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js'
  }
};
