'use strict';

module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/react-native-web/src/vendor/'],
  modulePathIgnorePatterns: ['<rootDir>/packages/react-native-web/dist/'],
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages'],
  setupFiles: ['jest-canvas-mock'],
  setupTestFrameworkScriptFile: require.resolve('./setupFramework.js'),
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  timers: 'fake'
};
