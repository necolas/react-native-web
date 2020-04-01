'use strict';

module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/react-native-web/src/vendor/'],
  modulePathIgnorePatterns: [
    '<rootDir>/packages/benchmarks/',
    '<rootDir>/packages/docs/',
    '<rootDir>/packages/react-native-web/dist/'
  ],
  // resetMocks: true,
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages'],
  setupFiles: ['jest-canvas-mock', require.resolve('./setupFiles.js')],
  setupFilesAfterEnv: [require.resolve('./setupFramework.js')],
  testEnvironment: 'jsdom',
  timers: 'fake'
};
