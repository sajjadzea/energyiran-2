// If `jest: not found`, ensure you ran `npm install --save-dev jest`
module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^react$': '<rootDir>/mvp/node_modules/react',
    '^react-dom$': '<rootDir>/mvp/node_modules/react-dom',
  },
  // Debug: Use DEBUG=jest* for verbose logs
};
