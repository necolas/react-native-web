const fs = require('fs');
const path = require('path');

const pages = fs
  .readdirSync(path.resolve(__dirname, 'pages'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

module.exports = {
  outDir: 'dist',
  env: { pages }
};
