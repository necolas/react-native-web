'use strict';

const generator = require('inline-style-prefixer/lib/generator').default;
const path = require('path');

const browserList = {
  chrome: 38,
  android: 4,
  firefox: 40,
  ios_saf: 7,
  safari: 7,
  ie: 10,
  ie_mob: 11,
  edge: 12,
  opera: 16,
  op_mini: 12,
  and_uc: 9,
  and_chr: 38,
};

generator(browserList, {
  path: path.join(__dirname, '../../packages/react-native-web/src/modules/prefixStyles/static.js'),
});
