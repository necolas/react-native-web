'use strict';

var _react = require('react');

var ArrayOfNumberPropType = _react.PropTypes.arrayOf(_react.PropTypes.number); /**
                                                                                * Copyright (c) 2015-present, Facebook, Inc.
                                                                                * All rights reserved.
                                                                                *
                                                                                * 
                                                                                */

var numberOrString = _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]);

var TransformMatrixPropType = function TransformMatrixPropType(props, propName, componentName) {
  if (props.transform && props.transformMatrix) {
    return new Error('transformMatrix and transform styles cannot be used on the same ' + 'component');
  }
  return ArrayOfNumberPropType(props, propName, componentName);
};

var TransformPropTypes = {
  transform: _react.PropTypes.arrayOf(_react.PropTypes.oneOfType([_react.PropTypes.shape({ perspective: numberOrString }), _react.PropTypes.shape({ rotate: numberOrString }), _react.PropTypes.shape({ rotateX: numberOrString }), _react.PropTypes.shape({ rotateY: numberOrString }), _react.PropTypes.shape({ rotateZ: numberOrString }), _react.PropTypes.shape({ scale: numberOrString }), _react.PropTypes.shape({ scaleX: numberOrString }), _react.PropTypes.shape({ scaleY: numberOrString }), _react.PropTypes.shape({ skewX: numberOrString }), _react.PropTypes.shape({ skewY: numberOrString }), _react.PropTypes.shape({ translateX: numberOrString }), _react.PropTypes.shape({ translateY: numberOrString }), _react.PropTypes.shape({ translateZ: numberOrString }), _react.PropTypes.shape({ translate3d: _react.PropTypes.string })])),
  transformMatrix: TransformMatrixPropType
};

module.exports = TransformPropTypes;