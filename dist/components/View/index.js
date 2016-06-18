'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _NativeMethodsDecorator = require('../../modules/NativeMethodsDecorator');

var _NativeMethodsDecorator2 = _interopRequireDefault(_NativeMethodsDecorator);

var _normalizeNativeEvent = require('../../apis/PanResponder/normalizeNativeEvent');

var _normalizeNativeEvent2 = _interopRequireDefault(_normalizeNativeEvent);

var _CoreComponent = require('../CoreComponent');

var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleSheet = require('../../apis/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _StyleSheetPropType = require('../../apis/StyleSheet/StyleSheetPropType');

var _StyleSheetPropType2 = _interopRequireDefault(_StyleSheetPropType);

var _ViewStylePropTypes = require('./ViewStylePropTypes');

var _ViewStylePropTypes2 = _interopRequireDefault(_ViewStylePropTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = (0, _NativeMethodsDecorator2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(View, _Component);

  function View(props, context) {
    _classCallCheck(this, View);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(View).call(this, props, context));

    _this._normalizeEventForHandler = _this._normalizeEventForHandler.bind(_this);
    return _this;
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var pointerEvents = _props.pointerEvents;
      var style = _props.style;

      var other = _objectWithoutProperties(_props, ['pointerEvents', 'style']);

      var flattenedStyle = _StyleSheet2.default.flatten(style);
      var pointerEventsStyle = pointerEvents && { pointerEvents: pointerEvents };

      return _react2.default.createElement(_CoreComponent2.default, _extends({}, other, {
        onClick: this._handleClick,
        onClickCapture: this._normalizeEventForHandler(this.props.onClickCapture),
        onTouchCancel: this._normalizeEventForHandler(this.props.onTouchCancel),
        onTouchCancelCapture: this._normalizeEventForHandler(this.props.onTouchCancelCapture),
        onTouchEnd: this._normalizeEventForHandler(this.props.onTouchEnd),
        onTouchEndCapture: this._normalizeEventForHandler(this.props.onTouchEndCapture),
        onTouchMove: this._normalizeEventForHandler(this.props.onTouchMove),
        onTouchMoveCapture: this._normalizeEventForHandler(this.props.onTouchMoveCapture),
        onTouchStart: this._normalizeEventForHandler(this.props.onTouchStart),
        onTouchStartCapture: this._normalizeEventForHandler(this.props.onTouchStartCapture),
        style: [styles.initial, style,
        // 'View' needs to use 'flexShrink' in its reset when there is no 'flex' style provided
        flattenedStyle.flex == null && styles.flexReset, pointerEventsStyle]
      }));
    }

    /**
     * React Native expects `pageX` and `pageY` to be on the `nativeEvent`, but
     * React doesn't include them for touch events.
     */

  }, {
    key: '_normalizeEventForHandler',
    value: function _normalizeEventForHandler(handler) {
      return function (e) {
        var pageX = e.nativeEvent.pageX;

        if (pageX === undefined) {
          e.nativeEvent = (0, _normalizeNativeEvent2.default)(e.nativeEvent);
        }
        handler && handler(e);
      };
    }
  }]);

  return View;
}(_react.Component), _class2.propTypes = {
  accessibilityLabel: _CoreComponent2.default.propTypes.accessibilityLabel,
  accessibilityLiveRegion: _CoreComponent2.default.propTypes.accessibilityLiveRegion,
  accessibilityRole: _CoreComponent2.default.propTypes.accessibilityRole,
  accessible: _CoreComponent2.default.propTypes.accessible,
  children: _react.PropTypes.any,
  onClick: _react.PropTypes.func,
  onClickCapture: _react.PropTypes.func,
  onMoveShouldSetResponder: _react.PropTypes.func,
  onMoveShouldSetResponderCapture: _react.PropTypes.func,
  onResponderGrant: _react.PropTypes.func,
  onResponderMove: _react.PropTypes.func,
  onResponderReject: _react.PropTypes.func,
  onResponderRelease: _react.PropTypes.func,
  onResponderTerminate: _react.PropTypes.func,
  onResponderTerminationRequest: _react.PropTypes.func,
  onStartShouldSetResponder: _react.PropTypes.func,
  onStartShouldSetResponderCapture: _react.PropTypes.func,
  onTouchCancel: _react.PropTypes.func,
  onTouchCancelCapture: _react.PropTypes.func,
  onTouchEnd: _react.PropTypes.func,
  onTouchEndCapture: _react.PropTypes.func,
  onTouchMove: _react.PropTypes.func,
  onTouchMoveCapture: _react.PropTypes.func,
  onTouchStart: _react.PropTypes.func,
  onTouchStartCapture: _react.PropTypes.func,
  pointerEvents: _react.PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
  style: (0, _StyleSheetPropType2.default)(_ViewStylePropTypes2.default),
  testID: _CoreComponent2.default.propTypes.testID
}, _class2.defaultProps = {
  accessible: true,
  style: {}
}, _temp)) || _class;

var styles = _StyleSheet2.default.create({
  // https://github.com/facebook/css-layout#default-values
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
    // button and anchor reset
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit',
    textDecorationLine: 'none',
    // list reset
    listStyle: 'none',
    // fix flexbox bugs
    maxWidth: '100%',
    minHeight: 0,
    minWidth: 0
  },
  flexReset: {
    flexShrink: 0
  }
});

module.exports = View;