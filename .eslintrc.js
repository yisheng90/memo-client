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
  plugins: ['react'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-unused-expressions': 'error',
    'no-empty': 'error',
    'no-multi-spaces': 'error',
    'no-shadow': 'error',
    'array-bracket-spacing': ['error', 'always'],
    'indent': ['error', 2],
    'jsx-quotes': ['error', 'prefer-single'],
  },
}
