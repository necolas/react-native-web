const path = require('path');

module.exports = {
  moduleNameMapper: {
    '^react-native$': path.join(__dirname, 'dist', 'cjs')
  },
  setupFiles: [path.join(__dirname, 'jest', 'setup.js')],
  testEnvironment: require.resolve('jest-environment-jsdom')
};
