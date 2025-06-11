module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', '@testing-library/jest-dom'],
  testMatch: [
    '<rootDir>/__tests__/**/*.test.(js|jsx)',
    '<rootDir>/tests/**/*.test.js',
    '**/tests/unit/**/*.test.(js|jsx)'
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
// If Jest can't find files, review testMatch pattern
