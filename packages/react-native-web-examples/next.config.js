const fs = require('fs');
const path = require('path');

const pages = fs
  .readdirSync(path.resolve(__dirname, 'pages'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

module.exports = {
  env: { pages: JSON.stringify(pages) },
  webpack: (config, options) => {
    config.resolve.alias['react-native'] = 'react-native-web';
    return config;
  }
};
