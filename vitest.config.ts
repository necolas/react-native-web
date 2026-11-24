import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    projects: [
      {
        extends: true,
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['packages/*/src/**/__tests__/**/*-test.ts?(x)'],
          // Makes the JSDOM window the global, so events report 'window' as target
          pool: 'vmThreads',
          // Matches Jest's default 'testEnvironmentOptions.url'
          environmentOptions: { jsdom: { url: 'http://localhost/' } }
        }
      },
      {
        extends: true,
        test: {
          name: 'node',
          include: [
            'packages/*/src/**/__tests__/**/*-test.node.ts?(x)',
            // Babel plugin tests load Prettier, which fails in a VM context
            'packages/babel-plugin-react-native-web/src/**/__tests__/**/*-test.js'
          ]
        }
      }
    ]
  }
});
