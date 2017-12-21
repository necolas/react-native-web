'use strict';

module.exports = {
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages'],
  setupFiles: ['raf/polyfill'],
  setupTestFrameworkScriptFile: require.resolve('./setupFramework.js'),
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'jsdom',
  timers: 'fake'
};
