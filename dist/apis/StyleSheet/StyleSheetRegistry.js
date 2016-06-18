'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2016-present, Nicolas Gallagher.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright (c) 2015-present, Facebook, Inc.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _inlineStylePrefixAll = require('inline-style-prefix-all');

var _inlineStylePrefixAll2 = _interopRequireDefault(_inlineStylePrefixAll);

var _hyphenate = require('./hyphenate');

var _hyphenate2 = _interopRequireDefault(_hyphenate);

var _expandStyle = require('./expandStyle');

var _expandStyle2 = _interopRequireDefault(_expandStyle);

var _flattenStyle = require('./flattenStyle');

var _flattenStyle2 = _interopRequireDefault(_flattenStyle);

var _processTransform = require('./processTransform');

var _processTransform2 = _interopRequireDefault(_processTransform);

var _predefs = require('./predefs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var stylesCache = {};
var uniqueID = 0;

var getCacheKey = function getCacheKey(prop, value) {
  return prop + ':' + value;
};

var normalizeStyle = function normalizeStyle(style) {
  return (0, _processTransform2.default)((0, _expandStyle2.default)((0, _flattenStyle2.default)(style)));
};

var createCssDeclarations = function createCssDeclarations(style) {
  return Object.keys(style).map(function (prop) {
    var property = (0, _hyphenate2.default)(prop);
    var value = style[prop];
    return property + ':' + value + ';';
  }).sort().join('');
};

var StyleSheetRegistry = function () {
  function StyleSheetRegistry() {
    _classCallCheck(this, StyleSheetRegistry);
  }

  _createClass(StyleSheetRegistry, null, [{
    key: '_reset',

    /* for testing */
    value: function _reset() {
      stylesCache = {};
      uniqueID = 0;
    }
  }, {
    key: 'renderToString',
    value: function renderToString() {
      var str = '/* ' + uniqueID + ' unique declarations */';

      return Object.keys(stylesCache).reduce(function (str, key) {
        var id = stylesCache[key].id;
        var style = stylesCache[key].style;
        var declarations = createCssDeclarations(style);
        var rule = '\n.' + id + '{' + declarations + '}';
        str += rule;
        return str;
      }, str);
    }
  }, {
    key: 'registerStyle',
    value: function registerStyle(style) {
      if (process.env.NODE_ENV !== 'production') {
        Object.freeze(style);
      }

      var normalizedStyle = normalizeStyle(style);

      Object.keys(normalizedStyle).forEach(function (prop) {
        var value = normalizedStyle[prop];
        var cacheKey = getCacheKey(prop, value);
        var exists = stylesCache[cacheKey] && stylesCache[cacheKey].id;
        if (!exists) {
          var id = ++uniqueID;
          // add new declaration to the store
          stylesCache[cacheKey] = {
            id: '__style' + id,
            style: (0, _inlineStylePrefixAll2.default)(_defineProperty({}, prop, value))
          };
        }
      });

      return style;
    }
  }, {
    key: 'getStyleAsNativeProps',
    value: function getStyleAsNativeProps(styleSheetObject) {
      var canUseCSS = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var classList = [];
      var normalizedStyle = normalizeStyle(styleSheetObject);
      var style = {};

      for (var prop in normalizedStyle) {
        var value = normalizedStyle[prop];
        var cacheKey = getCacheKey(prop, value);
        var selector = stylesCache[cacheKey] && stylesCache[cacheKey].id || _predefs.predefinedClassNames[cacheKey];

        if (selector && canUseCSS) {
          classList.push(selector);
        } else {
          style[prop] = normalizedStyle[prop];
        }
      }

      return {
        className: classList.join(' '),
        style: (0, _inlineStylePrefixAll2.default)(style)
      };
    }
  }]);

  return StyleSheetRegistry;
}();

module.exports = StyleSheetRegistry;