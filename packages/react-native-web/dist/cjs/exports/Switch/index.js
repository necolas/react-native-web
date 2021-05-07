"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _multiplyStyleLengthValue = _interopRequireDefault(require("../../modules/multiplyStyleLengthValue"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var emptyObject = {};
var thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';
var thumbFocusedBoxShadow = thumbDefaultBoxShadow + ", 0 0 0 10px rgba(0,0,0,0.1)";
var Switch = /*#__PURE__*/React.forwardRef(function (props, forwardedRef) {
  var accessibilityLabel = props.accessibilityLabel,
      _props$activeThumbCol = props.activeThumbColor,
      activeThumbColor = _props$activeThumbCol === void 0 ? '#009688' : _props$activeThumbCol,
      _props$activeTrackCol = props.activeTrackColor,
      activeTrackColor = _props$activeTrackCol === void 0 ? '#A3D3CF' : _props$activeTrackCol,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      onValueChange = props.onValueChange,
      _props$style = props.style,
      style = _props$style === void 0 ? emptyObject : _props$style,
      _props$thumbColor = props.thumbColor,
      thumbColor = _props$thumbColor === void 0 ? '#FAFAFA' : _props$thumbColor,
      _props$trackColor = props.trackColor,
      trackColor = _props$trackColor === void 0 ? '#939393' : _props$trackColor,
      _props$value = props.value,
      value = _props$value === void 0 ? false : _props$value,
      other = _objectWithoutPropertiesLoose(props, ["accessibilityLabel", "activeThumbColor", "activeTrackColor", "disabled", "onValueChange", "style", "thumbColor", "trackColor", "value"]);

  var thumbRef = React.useRef(null);

  function handleChange(event) {
    if (onValueChange != null) {
      onValueChange(event.nativeEvent.target.checked);
    }
  }

  function handleFocusState(event) {
    var isFocused = event.nativeEvent.type === 'focus';
    var boxShadow = isFocused ? thumbFocusedBoxShadow : thumbDefaultBoxShadow;

    if (thumbRef.current != null) {
      thumbRef.current.style.boxShadow = boxShadow;
    }
  }

  var _StyleSheet$flatten = _StyleSheet.default.flatten(style),
      styleHeight = _StyleSheet$flatten.height,
      styleWidth = _StyleSheet$flatten.width;

  var height = styleHeight || '20px';
  var minWidth = (0, _multiplyStyleLengthValue.default)(height, 2);
  var width = styleWidth > minWidth ? styleWidth : minWidth;
  var trackBorderRadius = (0, _multiplyStyleLengthValue.default)(height, 0.5);

  var trackCurrentColor = function () {
    if (value === true) {
      if (trackColor != null && typeof trackColor === 'object') {
        return trackColor.true;
      } else {
        return activeTrackColor;
      }
    } else {
      if (trackColor != null && typeof trackColor === 'object') {
        return trackColor.false;
      } else {
        return trackColor;
      }
    }
  }();

  var thumbCurrentColor = value ? activeThumbColor : thumbColor;
  var thumbHeight = height;
  var thumbWidth = thumbHeight;
  var rootStyle = [styles.root, style, disabled && styles.cursorDefault, {
    height: height,
    width: width
  }];
  var trackStyle = [styles.track, {
    backgroundColor: disabled ? '#D5D5D5' : trackCurrentColor,
    borderRadius: trackBorderRadius
  }];
  var thumbStyle = [styles.thumb, value && styles.thumbActive, {
    backgroundColor: disabled ? '#BDBDBD' : thumbCurrentColor,
    height: thumbHeight,
    marginStart: value ? (0, _multiplyStyleLengthValue.default)(thumbWidth, -1) : 0,
    width: thumbWidth
  }];
  var nativeControl = (0, _createElement.default)('input', {
    accessibilityLabel: accessibilityLabel,
    checked: value,
    disabled: disabled,
    onBlur: handleFocusState,
    onChange: handleChange,
    onFocus: handleFocusState,
    ref: forwardedRef,
    style: [styles.nativeControl, styles.cursorInherit],
    type: 'checkbox',
    role: 'switch'
  });
  return /*#__PURE__*/React.createElement(_View.default, _extends({}, other, {
    style: rootStyle
  }), /*#__PURE__*/React.createElement(_View.default, {
    style: trackStyle
  }), /*#__PURE__*/React.createElement(_View.default, {
    ref: thumbRef,
    style: thumbStyle
  }), nativeControl);
});
Switch.displayName = 'Switch';

var styles = _StyleSheet.default.create({
  root: {
    cursor: 'pointer',
    userSelect: 'none'
  },
  cursorDefault: {
    cursor: 'default'
  },
  cursorInherit: {
    cursor: 'inherit'
  },
  track: _objectSpread(_objectSpread({}, _StyleSheet.default.absoluteFillObject), {}, {
    height: '70%',
    margin: 'auto',
    transitionDuration: '0.1s',
    width: '100%'
  }),
  thumb: {
    alignSelf: 'flex-start',
    borderRadius: '100%',
    boxShadow: thumbDefaultBoxShadow,
    start: '0%',
    transform: [{
      translateZ: 0
    }],
    transitionDuration: '0.1s'
  },
  thumbActive: {
    start: '100%'
  },
  nativeControl: _objectSpread(_objectSpread({}, _StyleSheet.default.absoluteFillObject), {}, {
    height: '100%',
    margin: 0,
    opacity: 0,
    padding: 0,
    width: '100%'
  })
});

var _default = Switch;
exports.default = _default;
module.exports = exports.default;