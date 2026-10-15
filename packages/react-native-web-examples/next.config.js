import fs from 'node:fs';
import path from 'node:path';

const pages = fs
  .readdirSync(path.resolve(import.meta.dirname, 'pages'), {
    withFileTypes: true
  })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

export default {
  env: { pages: JSON.stringify(pages) },
  webpack: (config, options) => {
    config.resolve.alias['react-native'] = 'react-native-web';
    return config;
  }
};
