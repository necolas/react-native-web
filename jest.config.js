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
    '\\.[jt]sx?$': 'babel-jest'
  }
};

export default {
  projects: [
    {
      ...shared,
      displayName: 'dom',
      setupFiles: [
        '<rootDir>/jest.setup.globals.js',
        '<rootDir>/jest.setup.dom.js'
      ],
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/**/?(*-)+(spec|test).[jt]s?(x)']
    },
    {
      ...shared,
      displayName: 'node',
      setupFiles: ['<rootDir>/jest.setup.globals.js'],
      testEnvironment: 'node',
      testMatch: ['**/__tests__/**/?(*-)+(spec|test).node.[jt]s?(x)']
    }
  ]
};
