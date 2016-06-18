'use strict';

var _keyMirror = require('fbjs/lib/keyMirror');

var _keyMirror2 = _interopRequireDefault(_keyMirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageResizeMode = (0, _keyMirror2.default)({
  contain: null,
  cover: null,
  none: null,
  stretch: null
});

module.exports = ImageResizeMode;