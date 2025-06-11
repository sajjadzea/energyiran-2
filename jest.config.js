module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/unit/**/*.test.(js|jsx)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};
// اگر Jest فایل‌ها را پیدا نمی‌کند، الگوی testMatch را بازبینی کن
