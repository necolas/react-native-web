'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _Portal = require('../../components/Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _StyleSheet = require('../StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _View = require('../../components/View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactNativeApp = (_temp2 = _class = function (_Component) {
  _inherits(ReactNativeApp, _Component);

  function ReactNativeApp() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactNativeApp);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactNativeApp)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._createRootRef = function (component) {
      _this._root = component;
    }, _this._handleModalVisibilityChange = function (modalVisible) {
      _reactDom2.default.findDOMNode(_this._root).setAttribute('aria-hidden', '' + modalVisible);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactNativeApp, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var initialProps = _props.initialProps;
      var RootComponent = _props.rootComponent;
      var rootTag = _props.rootTag;


      return _react2.default.createElement(
        _View2.default,
        { style: styles.appContainer },
        _react2.default.createElement(RootComponent, _extends({}, initialProps, { ref: this._createRootRef, rootTag: rootTag })),
        _react2.default.createElement(_Portal2.default, { onModalVisibilityChanged: this._handleModalVisibilityChange })
      );
    }
  }]);

  return ReactNativeApp;
}(_react.Component), _class.propTypes = {
  initialProps: _react.PropTypes.object,
  rootComponent: _react.PropTypes.any.isRequired,
  rootTag: _react.PropTypes.any
}, _temp2);


var styles = _StyleSheet2.default.create({
  /**
   * Ensure that the application covers the whole screen. This prevents the
   * Portal content from being clipped.
   */
  appContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

module.exports = ReactNativeApp;