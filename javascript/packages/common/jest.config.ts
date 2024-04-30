/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  displayName: '@rhiethereum-mix/common',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['<rootDir>/**/*.(test|spec).(js|ts)', '<rootDir>/__tests__/**/*.(test|spec).(js|ts)', '<rootDir>/(tests/unit/**/*.(test|spec).(js|ts)'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/setupJestEnv.ts'],
};
