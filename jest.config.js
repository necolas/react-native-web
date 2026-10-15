'use strict';

const babelConfig = require('./babel.config.js');

const shared = {
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/packages/react-native-web/src/vendor/'
  ],
  fakeTimers: {
    enableGlobally: true
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/benchmarks/',
    '<rootDir>/packages/react-native-web-docs/',
    '<rootDir>/packages/react-native-web-examples/',
    '<rootDir>/packages/react-native-web/dist/'
  ],
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages'],
  snapshotFormat: {
    printBasicPrototype: false
  },
  transform: {
    '\\.[jt]sx?$': ['babel-jest', babelConfig()]
  }
};

module.exports = {
  projects: [
    {
      ...shared,
      displayName: 'dom',
      setupFiles: [require.resolve('./jest.setup.dom.js')],
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/**/?(*-)+(spec|test).[jt]s?(x)']
    },
    {
      ...shared,
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/?(*-)+(spec|test).node.[jt]s?(x)']
    }
  ]
};
