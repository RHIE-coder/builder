module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier' 
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['types/**/*.ts', 'build/**/*.js', 'bundle/**/*.js', 'jest.config.ts', 'rollup.config.js', 'setupJestEnv.ts']
}
