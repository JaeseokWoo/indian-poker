module.exports = {
  env: {
    es2021: true,
    node: true,
    jset: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'prettier/prettier': 'error',
    'import/extensions': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-catch': 'off',
  },
};
