module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: ['<rootDir>/__tests__/**/*.test.(js|jsx)', '<rootDir>/tests/**/*.test.js'],
}
// Use DEBUG=cypress:* npx cypress open to see detailed logs
