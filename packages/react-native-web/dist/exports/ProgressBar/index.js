function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import * as React from 'react';
import StyleSheet from '../StyleSheet';
import View from '../View';
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
  return /*#__PURE__*/React.createElement(View, _extends({}, other, {
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
  }), /*#__PURE__*/React.createElement(View, {
    ref: progressRef,
    style: [styles.progress, indeterminate && styles.animation, {
      backgroundColor: color
    }]
  }));
});
ProgressBar.displayName = 'ProgressBar';
var styles = StyleSheet.create({
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
export default ProgressBar;