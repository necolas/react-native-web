'use strict';

module.exports = {
  globals: {
    __DEV__: false
  },
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages'],
  setupFiles: ['raf/polyfill'],
  modulePathIgnorePatterns: ['<rootDir>/packages/react-native-web/dist'],
  setupTestFrameworkScriptFile: require.resolve('./setupFramework.js'),
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  timers: 'fake'
};
