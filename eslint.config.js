// eslint.config.js: Flat ESLint configuration using Airbnb base rules
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat();

module.exports = [
  ...compat.extends('airbnb-base'),
  {
    files: ['mvp/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
      },
    },
    rules: {
      'operator-linebreak': ['error', 'after'],
      'no-console': 'off',
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'no-new': 'off',
    },
  },
  {
    files: ['mvp/vite.config.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
    },
  },
];
