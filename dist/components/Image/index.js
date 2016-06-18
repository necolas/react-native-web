'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /* global window */


var _NativeMethodsDecorator = require('../../modules/NativeMethodsDecorator');

var _NativeMethodsDecorator2 = _interopRequireDefault(_NativeMethodsDecorator);

var _resolveAssetSource = require('./resolveAssetSource');

var _resolveAssetSource2 = _interopRequireDefault(_resolveAssetSource);

var _CoreComponent = require('../CoreComponent');

var _CoreComponent2 = _interopRequireDefault(_CoreComponent);

var _ImageResizeMode = require('./ImageResizeMode');

var _ImageResizeMode2 = _interopRequireDefault(_ImageResizeMode);

var _ImageStylePropTypes = require('./ImageStylePropTypes');

var _ImageStylePropTypes2 = _interopRequireDefault(_ImageStylePropTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StyleSheet = require('../../apis/StyleSheet');

var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

var _StyleSheetPropType = require('../../apis/StyleSheet/StyleSheetPropType');

var _StyleSheetPropType2 = _interopRequireDefault(_StyleSheetPropType);

var _View = require('../View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STATUS_ERRORED = 'ERRORED';
var STATUS_LOADED = 'LOADED';
var STATUS_LOADING = 'LOADING';
var STATUS_PENDING = 'PENDING';
var STATUS_IDLE = 'IDLE';

var ImageSourcePropType = _react.PropTypes.oneOfType([_react.PropTypes.shape({
  uri: _react.PropTypes.string.isRequired
}), _react.PropTypes.string]);

var Image = (0, _NativeMethodsDecorator2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Image, _Component);

  function Image(props, context) {
    _classCallCheck(this, Image);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Image).call(this, props, context));

    var uri = (0, _resolveAssetSource2.default)(props.source);
    // state
    _this.state = { status: uri ? STATUS_PENDING : STATUS_IDLE };
    // autobinding
    _this._onError = _this._onError.bind(_this);
    _this._onLoad = _this._onLoad.bind(_this);
    return _this;
  }

  _createClass(Image, [{
    key: '_createImageLoader',
    value: function _createImageLoader() {
      var uri = (0, _resolveAssetSource2.default)(this.props.source);

      this._destroyImageLoader();
      this.image = new window.Image();
      this.image.onerror = this._onError;
      this.image.onload = this._onLoad;
      this.image.src = uri;
      this._onLoadStart();
    }
  }, {
    key: '_destroyImageLoader',
    value: function _destroyImageLoader() {
      if (this.image) {
        this.image.onerror = null;
        this.image.onload = null;
        this.image = null;
      }
    }
  }, {
    key: '_onError',
    value: function _onError(e) {
      var onError = this.props.onError;

      var event = { nativeEvent: e };

      this._destroyImageLoader();
      this.setState({ status: STATUS_ERRORED });
      this._onLoadEnd();
      if (onError) onError(event);
    }
  }, {
    key: '_onLoad',
    value: function _onLoad(e) {
      var onLoad = this.props.onLoad;

      var event = { nativeEvent: e };

      this._destroyImageLoader();
      this.setState({ status: STATUS_LOADED });
      if (onLoad) onLoad(event);
      this._onLoadEnd();
    }
  }, {
    key: '_onLoadEnd',
    value: function _onLoadEnd() {
      var onLoadEnd = this.props.onLoadEnd;

      if (onLoadEnd) onLoadEnd();
    }
  }, {
    key: '_onLoadStart',
    value: function _onLoadStart() {
      var onLoadStart = this.props.onLoadStart;

      this.setState({ status: STATUS_LOADING });
      if (onLoadStart) onLoadStart();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.status === STATUS_PENDING) {
        this._createImageLoader();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.status === STATUS_PENDING && !this.image) {
        this._createImageLoader();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextUri = (0, _resolveAssetSource2.default)(nextProps.source);
      if ((0, _resolveAssetSource2.default)(this.props.source) !== nextUri) {
        this.setState({
          status: nextUri ? STATUS_PENDING : STATUS_IDLE
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._destroyImageLoader();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var accessibilityLabel = _props.accessibilityLabel;
      var accessible = _props.accessible;
      var children = _props.children;
      var defaultSource = _props.defaultSource;
      var source = _props.source;
      var testID = _props.testID;


      var isLoaded = this.state.status === STATUS_LOADED;
      var displayImage = (0, _resolveAssetSource2.default)(!isLoaded ? defaultSource : source);
      var backgroundImage = displayImage ? 'url("' + displayImage + '")' : null;
      var style = _StyleSheet2.default.flatten(this.props.style);

      var resizeMode = this.props.resizeMode || style.resizeMode || _ImageResizeMode2.default.cover;
      // remove resizeMode style, as it is not supported by View
      delete style.resizeMode;

      /**
       * Image is a non-stretching View. The image is displayed as a background
       * image to support `resizeMode`. The HTML image is hidden but used to
       * provide the correct responsive image dimensions, and to support the
       * image context menu. Child content is rendered into an element absolutely
       * positioned over the image.
       */
      return _react2.default.createElement(
        _View2.default,
        {
          accessibilityLabel: accessibilityLabel,
          accessibilityRole: 'img',
          accessible: accessible,
          style: [styles.initial, style, backgroundImage && { backgroundImage: backgroundImage }, resizeModeStyles[resizeMode]],
          testID: testID
        },
        _react2.default.createElement('img', { src: displayImage, style: styles.img }),
        children ? _react2.default.createElement(_View2.default, { children: children, pointerEvents: 'box-none', style: styles.children }) : null
      );
    }
  }]);

  return Image;
}(_react.Component), _class2.propTypes = {
  accessibilityLabel: _CoreComponent2.default.propTypes.accessibilityLabel,
  accessible: _CoreComponent2.default.propTypes.accessible,
  children: _react.PropTypes.any,
  defaultSource: ImageSourcePropType,
  onError: _react.PropTypes.func,
  onLoad: _react.PropTypes.func,
  onLoadEnd: _react.PropTypes.func,
  onLoadStart: _react.PropTypes.func,
  resizeMode: _react.PropTypes.oneOf(['contain', 'cover', 'none', 'stretch']),
  source: ImageSourcePropType,
  style: (0, _StyleSheetPropType2.default)(_ImageStylePropTypes2.default),
  testID: _CoreComponent2.default.propTypes.testID
}, _class2.defaultProps = {
  accessible: true,
  style: {}
}, _class2.resizeMode = _ImageResizeMode2.default, _temp)) || _class;

var styles = _StyleSheet2.default.create({
  initial: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  img: {
    borderWidth: 0,
    height: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    opacity: 0
  },
  children: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
});

var resizeModeStyles = _StyleSheet2.default.create({
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundSize: 'auto'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});

module.exports = Image;