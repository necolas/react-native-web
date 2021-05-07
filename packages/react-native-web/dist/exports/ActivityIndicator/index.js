function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import * as React from 'react';
import StyleSheet from '../StyleSheet';
import View from '../View';
var accessibilityValue = {
  max: 1,
  min: 0
};

var createSvgCircle = function createSvgCircle(style) {
  return /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "16",
    fill: "none",
    r: "14",
    strokeWidth: "4",
    style: style
  });
};

var ActivityIndicator = /*#__PURE__*/React.forwardRef(function (props, forwardedRef) {
  var _props$animating = props.animating,
      animating = _props$animating === void 0 ? true : _props$animating,
      _props$color = props.color,
      color = _props$color === void 0 ? '#1976D2' : _props$color,
      _props$hidesWhenStopp = props.hidesWhenStopped,
      hidesWhenStopped = _props$hidesWhenStopp === void 0 ? true : _props$hidesWhenStopp,
      _props$size = props.size,
      size = _props$size === void 0 ? 'small' : _props$size,
      style = props.style,
      other = _objectWithoutPropertiesLoose(props, ["animating", "color", "hidesWhenStopped", "size", "style"]);

  var svg = /*#__PURE__*/React.createElement("svg", {
    height: "100%",
    viewBox: "0 0 32 32",
    width: "100%"
  }, createSvgCircle({
    stroke: color,
    opacity: 0.2
  }), createSvgCircle({
    stroke: color,
    strokeDasharray: 80,
    strokeDashoffset: 60
  }));
  return /*#__PURE__*/React.createElement(View, _extends({}, other, {
    accessibilityRole: "progressbar",
    accessibilityValue: accessibilityValue,
    ref: forwardedRef,
    style: [styles.container, style]
  }), /*#__PURE__*/React.createElement(View, {
    children: svg,
    style: [typeof size === 'number' ? {
      height: size,
      width: size
    } : indicatorSizes[size], styles.animation, !animating && styles.animationPause, !animating && hidesWhenStopped && styles.hidesWhenStopped]
  }));
});
ActivityIndicator.displayName = 'ActivityIndicator';
var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  hidesWhenStopped: {
    visibility: 'hidden'
  },
  animation: {
    animationDuration: '0.75s',
    animationKeyframes: [{
      '0%': {
        transform: [{
          rotate: '0deg'
        }]
      },
      '100%': {
        transform: [{
          rotate: '360deg'
        }]
      }
    }],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  animationPause: {
    animationPlayState: 'paused'
  }
});
var indicatorSizes = StyleSheet.create({
  small: {
    width: 20,
    height: 20
  },
  large: {
    width: 36,
    height: 36
  }
});
export default ActivityIndicator;