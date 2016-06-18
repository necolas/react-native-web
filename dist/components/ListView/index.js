'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _NativeMethodsDecorator = require('../../modules/NativeMethodsDecorator');

var _NativeMethodsDecorator2 = _interopRequireDefault(_NativeMethodsDecorator);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ScrollView = require('../ScrollView');

var _ScrollView2 = _interopRequireDefault(_ScrollView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListView = (0, _NativeMethodsDecorator2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(ListView, _Component);

  function ListView() {
    _classCallCheck(this, ListView);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ListView).apply(this, arguments));
  }

  _createClass(ListView, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ScrollView2.default, this.props);
    }
  }]);

  return ListView;
}(_react.Component), _class2.propTypes = {
  children: _react.PropTypes.any,
  style: _ScrollView2.default.propTypes.style
}, _class2.defaultProps = {
  style: {}
}, _temp)) || _class;

module.exports = ListView;