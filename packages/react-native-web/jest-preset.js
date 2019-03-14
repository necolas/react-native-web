module.exports = {
  moduleNameMapper: {
    '^react-native$': require.resolve('./dist/cjs')
  },
  setupFiles: [require.resolve('./jest/setup.js')],
  testEnvironment: require.resolve('jest-environment-jsdom')
};
