module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['dist/', 'build/', 'logs/'],
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-new': 'off',
  },
};
