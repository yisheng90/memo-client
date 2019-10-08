module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ['plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-expressions': 'error',
    'no-empty': 'error',
    'no-multi-spaces': 'error',
    'no-shadow': 'error',
    indent: ['error', 2],
    'jsx-quotes': ['error', 'prefer-double'],
  },
}
