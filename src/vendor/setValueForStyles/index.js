/* eslint-disable */

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

import unitlessNumbers from '../../modules/unitlessNumbers';

if (process.env.NODE_ENV !== 'production') {
  var camelizeStyleName = require('fbjs/lib/camelizeStyleName');
  var warning = require('fbjs/lib/warning');

  // 'msTransform' is correct, but the other prefixes should be capitalized
  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;

  var warnHyphenatedStyleName = function(name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production'
      ? warning(
          false,
          'Unsupported style property %s. Did you mean %s?%s',
          name,
          camelizeStyleName(name),
          checkRenderMessage(owner)
        )
      : void 0;
  };

  var warnBadVendoredStyleName = function(name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    process.env.NODE_ENV !== 'production'
      ? warning(
          false,
          'Unsupported vendor-prefixed style property %s. Did you mean %s?%s',
          name,
          name.charAt(0).toUpperCase() + name.slice(1),
          checkRenderMessage(owner)
        )
      : void 0;
  };

  var warnStyleValueWithSemicolon = function(name, value, owner) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    process.env.NODE_ENV !== 'production'
      ? warning(
          false,
          "Style property values shouldn't contain a semicolon.%s " + 'Try "%s: %s" instead.',
          checkRenderMessage(owner),
          name,
          value.replace(badStyleValueWithSemicolonPattern, '')
        )
      : void 0;
  };

  var warnStyleValueIsNaN = function(name, value, owner) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    process.env.NODE_ENV !== 'production'
      ? warning(
          false,
          '`NaN` is an invalid value for the `%s` css style property.%s',
          name,
          checkRenderMessage(owner)
        )
      : void 0;
  };

  var checkRenderMessage = function(owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  };

  /**
   * @param {string} name
   * @param {*} value
   * @param {ReactDOMComponent} component
   */
  var warnValidStyle = function(name, value, component) {
    var owner;
    if (component) {
      owner = component._currentElement._owner;
    }
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, owner);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, owner);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, owner);
    }

    if (typeof value === 'number' && isNaN(value)) {
      warnStyleValueIsNaN(name, value, owner);
    }
  };
}

var styleWarnings = {};

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens)
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @param {ReactDOMComponent} component
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, component) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  var isNonNumeric = isNaN(value);
  if (
    isNonNumeric ||
    value === 0 ||
    (unitlessNumbers.hasOwnProperty(name) && unitlessNumbers[name])
  ) {
    return '' + value; // cast to string
  }

  if (typeof value === 'string') {
    if (process.env.NODE_ENV !== 'production') {
      var warning = require('fbjs/lib/warning');

      // Allow '0' to pass through without warning. 0 is already special and
      // doesn't require units, so we don't need to warn about it.
      if (component && value !== '0') {
        var owner = component._currentElement._owner;
        var ownerName = owner ? owner.getName() : null;
        if (ownerName && !styleWarnings[ownerName]) {
          styleWarnings[ownerName] = {};
        }
        var warned = false;
        if (ownerName) {
          var warnings = styleWarnings[ownerName];
          warned = warnings[name];
          if (!warned) {
            warnings[name] = true;
          }
        }
        if (!warned) {
          process.env.NODE_ENV !== 'production'
            ? warning(
                false,
                'a `%s` tag (owner: `%s`) was passed a numeric string value ' +
                  'for CSS property `%s` (value: `%s`) which will be treated ' +
                  'as a unitless number in a future version of React.',
                component._currentElement.type,
                ownerName || 'unknown',
                name,
                value
              )
            : void 0;
        }
      }
    }
    value = value.trim();
  }
  return value + 'px';
}

/**
   * Sets the value for multiple styles on a node.  If a value is specified as
   * '' (empty string), the corresponding style property will be unset.
   *
   * @param {DOMElement} node
   * @param {object} styles
   * @param {ReactDOMComponent} component
   */
const setValueForStyles = function(node, styles, component) {
  var style = node.style;
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    if (process.env.NODE_ENV !== 'production') {
      warnValidStyle(styleName, styles[styleName], component);
    }
    var styleValue = dangerousStyleValue(styleName, styles[styleName], component);
    if (styleName === 'float' || styleName === 'cssFloat') {
      styleName = 'cssFloat';
    }
    if (styleValue) {
      style[styleName] = styleValue;
    } else {
      style[styleName] = '';
    }
  }
};

module.exports = setValueForStyles;
