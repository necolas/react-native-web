"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ProgressBar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$color = props.color,
      color = _props$color === void 0 ? '#1976D2' : _props$color,
      _props$indeterminate = props.indeterminate,
      indeterminate = _props$indeterminate === void 0 ? false : _props$indeterminate,
      _props$progress = props.progress,
      progress = _props$progress === void 0 ? 0 : _props$progress,
      _props$trackColor = props.trackColor,
      trackColor = _props$trackColor === void 0 ? 'transparent' : _props$trackColor,
      style = props.style,
      other = _objectWithoutPropertiesLoose(props, ["color", "indeterminate", "progress", "trackColor", "style"]);

  var percentageProgress = progress * 100;
  var progressRef = React.useRef(null);
  React.useEffect(function () {
    var width = indeterminate ? '25%' : percentageProgress + "%";

    if (progressRef.current != null) {
      progressRef.current.setNativeProps({
        style: {
          width: width
        }
      });
    }
  }, [indeterminate, percentageProgress, progressRef]);
  return /*#__PURE__*/React.createElement(_View.default, _extends({}, other, {
    accessibilityRole: "progressbar",
    accessibilityValue: {
      max: 100,
      min: 0,
      now: indeterminate ? null : percentageProgress
    },
    ref: ref,
    style: [styles.track, style, {
      backgroundColor: trackColor
    }]
  }), /*#__PURE__*/React.createElement(_View.default, {
    ref: progressRef,
    style: [styles.progress, indeterminate && styles.animation, {
      backgroundColor: color
    }]
  }));
});
ProgressBar.displayName = 'ProgressBar';

var styles = _StyleSheet.default.create({
  track: {
    height: 5,
    overflow: 'hidden',
    userSelect: 'none',
    zIndex: 0
  },
  progress: {
    height: '100%',
    zIndex: -1
  },
  animation: {
    animationDuration: '1s',
    animationKeyframes: [{
      '0%': {
        transform: [{
          translateX: '-100%'
        }]
      },
      '100%': {
        transform: [{
          translateX: '400%'
        }]
      }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

var _default = ProgressBar;
exports.default = _default;
module.exports = exports.default;