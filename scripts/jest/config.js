'use strict';

module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/packages/react-native-web/src/vendor/'],
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages'],
  setupFiles: ['raf/polyfill'],
  setupTestFrameworkScriptFile: require.resolve('./setupFramework.js'),
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  timers: 'fake'
};
