export default {
  displayName: '@rhiethereum-mix/web',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['<rootDir>/**/*.test.(js|jsx|ts|tsx)', '<rootDir>/__tests__/**/*.spec.(js|jsx|ts|tsx)', '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)'],
  coverageDirectory: '../../coverage/rhiethereum-mix-web',
};
