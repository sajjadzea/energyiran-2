// If `jest: not found`, ensure you ran `npm install --save-dev jest`
module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  // Debug: Use DEBUG=jest* for verbose logs
};
