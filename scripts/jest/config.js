'use strict';

module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/react-native-web/src/vendor/'],
  modulePathIgnorePatterns: [
    '<rootDir>/packages/benchmarks/',
    '<rootDir>/packages/docs/',
    '<rootDir>/packages/examples/',
    '<rootDir>/packages/react-native-web/dist/'
  ],
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages'],
  setupFiles: [require.resolve('./setupFiles.dom.js')],
  snapshotFormat: {
    printBasicPrototype: false
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/?(*-)+(spec|test).[jt]s?(x)'],
  timers: 'fake'
};

('**/?(*.)+(spec|test).[jt]s?(x)');
