import { defineConfig } from 'oxfmt';

export default defineConfig({
  ignorePatterns: ['**/dist', 'packages/**/*.html', '**/node_modules'],
  printWidth: 80,
  singleQuote: true,
  sortImports: true,
  trailingComma: 'none'
});
