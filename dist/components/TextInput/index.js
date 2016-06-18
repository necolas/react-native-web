'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _NativeMethodsDecorator = require('../../modules/NativeMethodsDecorator');

var _NativeMethodsDecorator2 = _interopRequireDefault(_NativeMethodsDecorator);

var _CoreComponent = require('../CoreComponent');

var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _StyleSheet = require('../../apis/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _Text = require('../Text');

var _Text2 = _interopRequireDefault(_Text);

var _reactTextareaAutosize = require('react-textarea-autosize');

var _reactTextareaAutosize2 = _interopRequireDefault(_reactTextareaAutosize);

var _TextInputState = require('./TextInputState');

var _TextInputState2 = _interopRequireDefault(_TextInputState);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = (0, _NativeMethodsDecorator2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(TextInput, _Component);

  function TextInput(props, context) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextInput).call(this, props, context));

    _this.state = { showPlaceholder: !props.value && !props.defaultValue };
    return _this;
  }

  _createClass(TextInput, [{
    key: 'blur',
    value: function blur() {
      _TextInputState2.default.blurTextInput(_reactDom2.default.findDOMNode(this.refs.input));
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.setNativeProps({ text: '' });
    }
  }, {
    key: 'focus',
    value: function focus() {
      _TextInputState2.default.focusTextInput(_reactDom2.default.findDOMNode(this.refs.input));
    }
  }, {
    key: 'setNativeProps',
    value: function setNativeProps(props) {
      this.refs.input.setNativeProps(props);
    }
  }, {
    key: '_onBlur',
    value: function _onBlur(e) {
      var onBlur = this.props.onBlur;

      var text = e.target.value;
      this.setState({ showPlaceholder: text === '' });
      this.blur();
      if (onBlur) onBlur(e);
    }
  }, {
    key: '_onChange',
    value: function _onChange(e) {
      var _props = this.props;
      var onChange = _props.onChange;
      var onChangeText = _props.onChangeText;

      var text = e.target.value;
      this.setState({ showPlaceholder: text === '' });
      if (onChange) onChange(e);
      if (onChangeText) onChangeText(text);
      if (!this.refs.input) {
        // calling `this.props.onChange` or `this.props.onChangeText`
        // may clean up the input itself. Exits here.
        return;
      }
    }
  }, {
    key: '_onFocus',
    value: function _onFocus(e) {
      var _props2 = this.props;
      var clearTextOnFocus = _props2.clearTextOnFocus;
      var onFocus = _props2.onFocus;
      var selectTextOnFocus = _props2.selectTextOnFocus;

      var node = _reactDom2.default.findDOMNode(this.refs.input);
      var text = e.target.value;
      this.focus();
      if (onFocus) onFocus(e);
      if (clearTextOnFocus) this.clear();
      if (selectTextOnFocus) node.select();
      this.setState({ showPlaceholder: text === '' });
    }
  }, {
    key: '_onSelectionChange',
    value: function _onSelectionChange(e) {
      var onSelectionChange = this.props.onSelectionChange;
      var _e$target = e.target;
      var selectionDirection = _e$target.selectionDirection;
      var selectionEnd = _e$target.selectionEnd;
      var selectionStart = _e$target.selectionStart;

      var event = {
        selectionDirection: selectionDirection,
        selectionEnd: selectionEnd,
        selectionStart: selectionStart,
        nativeEvent: e.nativeEvent
      };
      if (onSelectionChange) onSelectionChange(event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var
      /* eslint-disable react/prop-types */
      accessibilityLabel = _props3.accessibilityLabel;
      var
      /* eslint-enable react/prop-types */
      autoComplete = _props3.autoComplete;
      var autoFocus = _props3.autoFocus;
      var defaultValue = _props3.defaultValue;
      var editable = _props3.editable;
      var keyboardType = _props3.keyboardType;
      var maxLength = _props3.maxLength;
      var maxNumberOfLines = _props3.maxNumberOfLines;
      var multiline = _props3.multiline;
      var numberOfLines = _props3.numberOfLines;
      var onSelectionChange = _props3.onSelectionChange;
      var placeholder = _props3.placeholder;
      var placeholderTextColor = _props3.placeholderTextColor;
      var secureTextEntry = _props3.secureTextEntry;
      var style = _props3.style;
      var testID = _props3.testID;
      var value = _props3.value;


      var type = void 0;

      switch (keyboardType) {
        case 'email-address':
          type = 'email';
          break;
        case 'numeric':
          type = 'number';
          break;
        case 'phone-pad':
          type = 'tel';
          break;
        case 'search':
        case 'web-search':
          type = 'search';
          break;
        case 'url':
          type = 'url';
          break;
      }

      if (secureTextEntry) {
        type = 'password';
      }

      var propsCommon = {
        autoComplete: autoComplete && 'on',
        autoFocus: autoFocus,
        defaultValue: defaultValue,
        maxLength: maxLength,
        onBlur: this._onBlur.bind(this),
        onChange: this._onChange.bind(this),
        onFocus: this._onFocus.bind(this),
        onSelect: onSelectionChange && this._onSelectionChange.bind(this),
        readOnly: !editable,
        style: _extends({}, styles.input, { outline: style.outline }),
        value: value
      };

      var propsMultiline = _extends({}, propsCommon, {
        component: _reactTextareaAutosize2.default,
        maxRows: maxNumberOfLines || numberOfLines,
        minRows: numberOfLines
      });

      var propsSingleline = _extends({}, propsCommon, {
        component: 'input',
        type: type
      });

      var props = multiline ? propsMultiline : propsSingleline;

      return _react2.default.createElement(
        _View2.default,
        {
          accessibilityLabel: accessibilityLabel,
          style: [styles.initial, style],
          testID: testID
        },
        _react2.default.createElement(
          _View2.default,
          { style: styles.wrapper },
          _react2.default.createElement(_CoreComponent2.default, _extends({}, props, { ref: 'input' })),
          placeholder && this.state.showPlaceholder && _react2.default.createElement(
            _Text2.default,
            {
              pointerEvents: 'none',
              style: [styles.placeholder, placeholderTextColor && { color: placeholderTextColor }]
            },
            placeholder
          )
        )
      );
    }
  }]);

  return TextInput;
}(_react.Component), _class2.propTypes = _extends({}, _View2.default.propTypes, {
  autoComplete: _react.PropTypes.bool,
  autoFocus: _react.PropTypes.bool,
  clearTextOnFocus: _react.PropTypes.bool,
  defaultValue: _react.PropTypes.string,
  editable: _react.PropTypes.bool,
  keyboardType: _react.PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'url']),
  maxLength: _react.PropTypes.number,
  maxNumberOfLines: _react.PropTypes.number,
  multiline: _react.PropTypes.bool,
  numberOfLines: _react.PropTypes.number,
  onBlur: _react.PropTypes.func,
  onChange: _react.PropTypes.func,
  onChangeText: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onSelectionChange: _react.PropTypes.func,
  placeholder: _react.PropTypes.string,
  placeholderTextColor: _react.PropTypes.string,
  secureTextEntry: _react.PropTypes.bool,
  selectTextOnFocus: _react.PropTypes.bool,
  style: _Text2.default.propTypes.style,
  testID: _CoreComponent2.default.propTypes.testID,
  value: _react.PropTypes.string
}), _class2.defaultProps = {
  editable: true,
  keyboardType: 'default',
  multiline: false,
  numberOfLines: 2,
  secureTextEntry: false,
  style: {}
}, _temp)) || _class;

var styles = _StyleSheet2.default.create({
  initial: {
    borderColor: 'black',
    borderWidth: 1
  },
  wrapper: {
    flexGrow: 1
  },
  input: {
    appearance: 'none',
    backgroundColor: 'transparent',
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    flexGrow: 1,
    font: 'inherit',
    padding: 0,
    zIndex: 1
  },
  placeholder: {
    bottom: 0,
    color: 'darkgray',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
    whiteSpace: 'pre'
  }
});

module.exports = TextInput;