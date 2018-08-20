module.exports = {
  root: true,
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  env: {
    'browser': false,
  },
  plugins: [
    'html',
  ],
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  rules: {
    'no-console': 0,
    'no-param-reassign': 0,
    'prefer-rest-params': 0,
    'import/extensions': [
      { vue: 'never' },
    ],
    'import/no-unresolved': [
      { vue: 'never' },
    ],
  },
  globals: {
    wx: true,
  },
};
