"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Platform = _interopRequireDefault(require("../../../exports/Platform"));

var _AnimatedFlatList = _interopRequireDefault(require("./components/AnimatedFlatList"));

var _AnimatedImage = _interopRequireDefault(require("./components/AnimatedImage"));

var _AnimatedScrollView = _interopRequireDefault(require("./components/AnimatedScrollView"));

var _AnimatedSectionList = _interopRequireDefault(require("./components/AnimatedSectionList"));

var _AnimatedText = _interopRequireDefault(require("./components/AnimatedText"));

var _AnimatedView = _interopRequireDefault(require("./components/AnimatedView"));

var _AnimatedMock = _interopRequireDefault(require("./AnimatedMock"));

var _AnimatedImplementation = _interopRequireDefault(require("./AnimatedImplementation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Animated = _Platform.default.isTesting ? _AnimatedMock.default : _AnimatedImplementation.default;

var _default = _objectSpread({
  FlatList: _AnimatedFlatList.default,
  Image: _AnimatedImage.default,
  ScrollView: _AnimatedScrollView.default,
  SectionList: _AnimatedSectionList.default,
  Text: _AnimatedText.default,
  View: _AnimatedView.default
}, Animated);

exports.default = _default;
module.exports = exports.default;