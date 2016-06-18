'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _ColorPropType = require('../../apis/StyleSheet/ColorPropType');

var _ColorPropType2 = _interopRequireDefault(_ColorPropType);

var _ViewStylePropTypes = require('../View/ViewStylePropTypes');

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var number = _react.PropTypes.number;
var oneOf = _react.PropTypes.oneOf;
var oneOfType = _react.PropTypes.oneOfType;
var string = _react.PropTypes.string;

var numberOrString = oneOfType([number, string]);

module.exports = _extends({}, _ViewStylePropTypes2.default, {
  color: _ColorPropType2.default,
  fontFamily: string,
  fontSize: numberOrString,
  fontStyle: string,
  fontWeight: string,
  letterSpacing: numberOrString,
  lineHeight: numberOrString,
  textAlign: oneOf(['center', 'inherit', 'justify', 'justify-all', 'left', 'right']),
  textAlignVertical: oneOf(['auto', 'bottom', 'center', 'top']),
  textDecorationLine: string,
  /* @platform web */
  textOverflow: string,
  /* @platform web */
  textShadow: string,
  /* @platform web */
  textTransform: oneOf(['capitalize', 'lowercase', 'none', 'uppercase']),
  /* @platform web */
  whiteSpace: string,
  /* @platform web */
  wordWrap: string,
  writingDirection: oneOf(['auto', 'ltr', 'rtl'])
});