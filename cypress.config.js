module.exports = {
  video: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  retries: { runMode: 2, openMode: 0 },
  reporter: 'spec',
  // Debug: enable verbose logging when CYPRESS_DEBUG is set
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js'
  }
};
