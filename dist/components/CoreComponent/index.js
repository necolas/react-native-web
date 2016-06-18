'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _NativeMethodsDecorator = require('../../modules/NativeMethodsDecorator');

var _NativeMethodsDecorator2 = _interopRequireDefault(_NativeMethodsDecorator);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleSheet = require('../../apis/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var roleComponents = {
  article: 'article',
  banner: 'header',
  button: 'button',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  heading: 'h1',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section'
};

var CoreComponent = (0, _NativeMethodsDecorator2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(CoreComponent, _Component);

  function CoreComponent() {
    _classCallCheck(this, CoreComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CoreComponent).apply(this, arguments));
  }

  _createClass(CoreComponent, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var accessibilityLabel = _props.accessibilityLabel;
      var accessibilityLiveRegion = _props.accessibilityLiveRegion;
      var accessibilityRole = _props.accessibilityRole;
      var accessible = _props.accessible;
      var component = _props.component;
      var testID = _props.testID;
      var type = _props.type;

      var other = _objectWithoutProperties(_props, ['accessibilityLabel', 'accessibilityLiveRegion', 'accessibilityRole', 'accessible', 'component', 'testID', 'type']);

      var Component = roleComponents[accessibilityRole] || component;

      return _react2.default.createElement(Component, _extends({}, other, _StyleSheet2.default.resolve(other), {
        'aria-hidden': accessible ? null : true,
        'aria-label': accessibilityLabel,
        'aria-live': accessibilityLiveRegion,
        'data-testid': testID,
        role: accessibilityRole,
        type: accessibilityRole === 'button' ? 'button' : type
      }));
    }
  }]);

  return CoreComponent;
}(_react.Component), _class2.propTypes = {
  accessibilityLabel: _react.PropTypes.string,
  accessibilityLiveRegion: _react.PropTypes.oneOf(['assertive', 'off', 'polite']),
  accessibilityRole: _react.PropTypes.string,
  accessible: _react.PropTypes.bool,
  component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
  style: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
  testID: _react.PropTypes.string,
  type: _react.PropTypes.string
}, _class2.defaultProps = {
  accessible: true,
  component: 'div'
}, _temp)) || _class;

module.exports = CoreComponent;