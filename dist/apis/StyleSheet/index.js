'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _predefs = require('./predefs');

var _flattenStyle = require('./flattenStyle');

var _flattenStyle2 = _interopRequireDefault(_flattenStyle);

var _StyleSheetRegistry = require('./StyleSheetRegistry');

var _StyleSheetRegistry2 = _interopRequireDefault(_StyleSheetRegistry);

var _StyleSheetValidation = require('./StyleSheetValidation');

var _StyleSheetValidation2 = _interopRequireDefault(_StyleSheetValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ELEMENT_ID = 'react-stylesheet';
var isRendered = false;
var lastStyleSheet = '';

/**
 * Initialize the store with pointer-event styles mapping to our custom pointer
 * event classes
 */

/**
 * Destroy existing styles
 */
var _destroy = function _destroy() {
  isRendered = false;
  _StyleSheetRegistry2.default._reset();
};

var create = function create(styles) {
  for (var key in styles) {
    _StyleSheetValidation2.default.validateStyle(key, styles);
    _StyleSheetRegistry2.default.registerStyle(styles[key]);
  }

  // update the style sheet in place
  if (isRendered) {
    var stylesheet = document.getElementById(ELEMENT_ID);
    if (stylesheet) {
      var newStyleSheet = renderToString();
      if (lastStyleSheet !== newStyleSheet) {
        stylesheet.textContent = newStyleSheet;
        lastStyleSheet = newStyleSheet;
      }
    } else if (process.env.NODE_ENV !== 'production') {
      console.error('ReactNative: cannot find "' + ELEMENT_ID + '" element');
    }
  }

  return styles;
};

/**
 * Render the styles as a CSS style sheet
 */
var renderToString = function renderToString() {
  var css = _StyleSheetRegistry2.default.renderToString();
  isRendered = true;
  return _predefs.resetCSS + '\n' + _predefs.predefinedCSS + '\n' + css;
};

/**
 * Accepts React props and converts inline styles to single purpose classes
 * where possible.
 */
var resolve = function resolve(_ref) {
  var className = _ref.className;
  var _ref$style = _ref.style;
  var style = _ref$style === undefined ? {} : _ref$style;

  var props = _StyleSheetRegistry2.default.getStyleAsNativeProps(style, isRendered);
  return _extends({}, props, {
    className: className ? (props.className + ' ' + className).trim() : props.className
  });
};

module.exports = {
  _destroy: _destroy,
  create: create,
  elementId: ELEMENT_ID,
  hairlineWidth: 1,
  flatten: _flattenStyle2.default,
  renderToString: renderToString,
  resolve: resolve
};