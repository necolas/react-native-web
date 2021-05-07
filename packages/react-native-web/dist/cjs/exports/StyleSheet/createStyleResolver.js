"use strict";

exports.__esModule = true;
exports.default = createStyleResolver;

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _createCSSStyleSheet = _interopRequireDefault(require("./createCSSStyleSheet"));

var _createCompileableStyle = _interopRequireDefault(require("./createCompileableStyle"));

var _createOrderedCSSStyleSheet = _interopRequireDefault(require("./createOrderedCSSStyleSheet"));

var _flattenArray = _interopRequireDefault(require("../../modules/flattenArray"));

var _flattenStyle = _interopRequireDefault(require("./flattenStyle"));

var _I18nManager = _interopRequireDefault(require("../I18nManager"));

var _i18nStyle = _interopRequireDefault(require("./i18nStyle"));

var _compile = require("./compile");

var _initialRules = _interopRequireDefault(require("./initialRules"));

var _modality = _interopRequireDefault(require("./modality"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * WARNING: changes to this file in particular can cause significant changes to
 * the results of render performance benchmarks.
 */
function createStyleResolver() {
  var inserted, sheet, cache;
  var resolved = {
    css: {},
    ltr: {},
    rtl: {},
    rtlNoSwap: {}
  };

  var init = function init() {
    inserted = {
      css: {},
      ltr: {},
      rtl: {},
      rtlNoSwap: {}
    };
    sheet = (0, _createOrderedCSSStyleSheet.default)((0, _createCSSStyleSheet.default)(_constants.STYLE_ELEMENT_ID));
    cache = {};
    (0, _modality.default)(function (rule) {
      return sheet.insert(rule, _constants.STYLE_GROUPS.modality);
    });

    _initialRules.default.forEach(function (rule) {
      sheet.insert(rule, _constants.STYLE_GROUPS.reset);
    });
  };

  init();

  function addToCache(className, prop, value) {
    if (!cache[prop]) {
      cache[prop] = {};
    }

    cache[prop][value] = className;
  }

  function getClassName(prop, value) {
    var val = (0, _compile.stringifyValueWithProperty)(value, prop);
    return cache[prop] && cache[prop].hasOwnProperty(val) && cache[prop][val];
  }

  function _injectRegisteredStyle(id) {
    var _I18nManager$getConst = _I18nManager.default.getConstants(),
        doLeftAndRightSwapInRTL = _I18nManager$getConst.doLeftAndRightSwapInRTL,
        isRTL = _I18nManager$getConst.isRTL;

    var dir = isRTL ? doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap' : 'ltr';

    if (!inserted[dir][id]) {
      var style = (0, _createCompileableStyle.default)((0, _i18nStyle.default)((0, _flattenStyle.default)(id)));
      var results = (0, _compile.atomic)(style);
      Object.keys(results).forEach(function (key) {
        var _results$key = results[key],
            identifier = _results$key.identifier,
            property = _results$key.property,
            rules = _results$key.rules,
            value = _results$key.value;
        addToCache(identifier, property, value);
        rules.forEach(function (rule) {
          var group = _constants.STYLE_GROUPS.custom[property] || _constants.STYLE_GROUPS.atomic;
          sheet.insert(rule, group);
        });
      });
      inserted[dir][id] = true;
    }
  }
  /**
   * Resolves a React Native style object to DOM attributes
   */


  function resolve(style, classList) {
    var nextClassList = [];
    var props = {};

    if (!style && !classList) {
      return props;
    }

    if (Array.isArray(classList)) {
      (0, _flattenArray.default)(classList).forEach(function (identifier) {
        if (identifier) {
          if (inserted.css[identifier] == null && resolved.css[identifier] != null) {
            var item = resolved.css[identifier];
            item.rules.forEach(function (rule) {
              sheet.insert(rule, item.group);
            });
            inserted.css[identifier] = true;
          }

          nextClassList.push(identifier);
        }
      });
    }

    if (typeof style === 'number') {
      // fast and cachable
      _injectRegisteredStyle(style);

      var key = createCacheKey(style);
      props = _resolveStyle(style, key);
    } else if (!Array.isArray(style)) {
      // resolve a plain RN style object
      props = _resolveStyle(style);
    } else {
      // flatten the style array
      // cache resolved props when all styles are registered
      // otherwise fallback to resolving
      var flatArray = (0, _flattenArray.default)(style);
      var isArrayOfNumbers = true;
      var cacheKey = '';

      for (var i = 0; i < flatArray.length; i++) {
        var id = flatArray[i];

        if (typeof id !== 'number') {
          isArrayOfNumbers = false;
        } else {
          if (isArrayOfNumbers) {
            cacheKey += id + '-';
          }

          _injectRegisteredStyle(id);
        }
      }

      var _key = isArrayOfNumbers ? createCacheKey(cacheKey) : null;

      props = _resolveStyle(flatArray, _key);
    }

    nextClassList.push.apply(nextClassList, props.classList);
    var finalProps = {
      className: classListToString(nextClassList),
      classList: nextClassList
    };

    if (props.style) {
      finalProps.style = props.style;
    }

    return finalProps;
  }
  /**
   * Resolves a React Native style object
   */


  function _resolveStyle(style, key) {
    var _I18nManager$getConst2 = _I18nManager.default.getConstants(),
        doLeftAndRightSwapInRTL = _I18nManager$getConst2.doLeftAndRightSwapInRTL,
        isRTL = _I18nManager$getConst2.isRTL;

    var dir = isRTL ? doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap' : 'ltr'; // faster: memoized

    if (key != null && resolved[dir][key] != null) {
      return resolved[dir][key];
    }

    var flatStyle = (0, _flattenStyle.default)(style);
    var localizedStyle = (0, _createCompileableStyle.default)((0, _i18nStyle.default)(flatStyle)); // slower: convert style object to props and cache

    var props = Object.keys(localizedStyle).sort().reduce(function (props, styleProp) {
      var value = localizedStyle[styleProp];

      if (value != null) {
        var className = getClassName(styleProp, value);

        if (className) {
          props.classList.push(className);
        } else {
          // Certain properties and values are not transformed by 'createReactDOMStyle' as they
          // require more complex transforms into multiple CSS rules. Here we assume that StyleManager
          // can bind these styles to a className, and prevent them becoming invalid inline-styles.
          if (styleProp === 'animationKeyframes' || styleProp === 'placeholderTextColor' || styleProp === 'pointerEvents' || styleProp === 'scrollbarWidth') {
            var _atomic;

            var a = (0, _compile.atomic)((_atomic = {}, _atomic[styleProp] = value, _atomic));
            Object.keys(a).forEach(function (key) {
              var _a$key = a[key],
                  identifier = _a$key.identifier,
                  rules = _a$key.rules;
              props.classList.push(identifier);
              rules.forEach(function (rule) {
                sheet.insert(rule, _constants.STYLE_GROUPS.atomic);
              });
            });
          } else {
            if (!props.style) {
              props.style = {};
            } // 4x slower render


            props.style[styleProp] = value;
          }
        }
      }

      return props;
    }, {
      classList: []
    });

    if (props.style) {
      props.style = (0, _compile.inline)(props.style);
    }

    if (key != null) {
      resolved[dir][key] = props;
    }

    return props;
  }

  return {
    getStyleSheet: function getStyleSheet() {
      var textContent = sheet.getTextContent(); // Reset state on the server so critical css is always the result

      if (!_ExecutionEnvironment.canUseDOM) {
        init();
      }

      return {
        id: _constants.STYLE_ELEMENT_ID,
        textContent: textContent
      };
    },
    createCSS: function createCSS(rules, group) {
      var result = {};
      Object.keys(rules).forEach(function (name) {
        var style = rules[name];
        var compiled = (0, _compile.classic)(style, name);
        Object.keys(compiled).forEach(function (key) {
          var _compiled$key = compiled[key],
              identifier = _compiled$key.identifier,
              rules = _compiled$key.rules;
          resolved.css[identifier] = {
            group: group || _constants.STYLE_GROUPS.classic,
            rules: rules
          };
          result[name] = identifier;
        });
      });
      return result;
    },
    resolve: resolve,

    get sheet() {
      return sheet;
    }

  };
}
/**
 * Misc helpers
 */


var createCacheKey = function createCacheKey(id) {
  var prefix = 'rn';
  return prefix + "-" + id;
};

var classListToString = function classListToString(list) {
  return list.join(' ').trim();
};

module.exports = exports.default;