"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _Image = _interopRequireDefault(require("../Image"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var emptyObject = {};
/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */

var ImageBackground = /*#__PURE__*/(0, React.forwardRef)(function (props, forwardedRef) {
  var children = props.children,
      _props$style = props.style,
      style = _props$style === void 0 ? emptyObject : _props$style,
      imageStyle = props.imageStyle,
      imageRef = props.imageRef,
      rest = _objectWithoutPropertiesLoose(props, ["children", "style", "imageStyle", "imageRef"]);

  var _StyleSheet$flatten = _StyleSheet.default.flatten(style),
      height = _StyleSheet$flatten.height,
      width = _StyleSheet$flatten.width;

  return /*#__PURE__*/React.createElement(_View.default, {
    ref: forwardedRef,
    style: style
  }, /*#__PURE__*/React.createElement(_Image.default, _extends({}, rest, {
    ref: imageRef,
    style: [_StyleSheet.default.absoluteFill, {
      // Temporary Workaround:
      // Current (imperfect yet) implementation of <Image> overwrites width and height styles
      // (which is not quite correct), and these styles conflict with explicitly set styles
      // of <ImageBackground> and with our internal layout model here.
      // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
      // This workaround should be removed after implementing proper support of
      // intrinsic content size of the <Image>.
      width: width,
      height: height,
      zIndex: -1
    }, imageStyle]
  })), children);
});
ImageBackground.displayName = 'ImageBackground';
var _default = ImageBackground;
exports.default = _default;
module.exports = exports.default;