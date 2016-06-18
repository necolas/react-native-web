'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function resolveAssetSource(source) {
  return ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object' ? source.uri : source) || null;
}

module.exports = resolveAssetSource;