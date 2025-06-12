// ESLint configuration with Airbnb style guide
module.exports = {
  extends: ['airbnb-base'],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  ignorePatterns: ['dist/', 'build/', 'logs/'],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js'] },
    },
  },
  rules: {
    'no-console': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-new': 'off',
  },
};
