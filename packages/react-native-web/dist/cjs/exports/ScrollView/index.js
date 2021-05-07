"use strict";

exports.__esModule = true;
exports.default = void 0;

var _createReactClass = _interopRequireDefault(require("create-react-class"));

var _dismissKeyboard = _interopRequireDefault(require("../../modules/dismissKeyboard"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _mergeRefs = _interopRequireDefault(require("../../modules/mergeRefs"));

var _ScrollResponder = _interopRequireDefault(require("../../modules/ScrollResponder"));

var _ScrollViewBase = _interopRequireDefault(require("./ScrollViewBase"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var emptyObject = {};
/* eslint-disable react/prefer-es6-class */

var ScrollView = (0, _createReactClass.default)({
  displayName: "ScrollView",
  mixins: [_ScrollResponder.default.Mixin],
  getInitialState: function getInitialState() {
    return this.scrollResponderMixinGetInitialState();
  },
  flashScrollIndicators: function flashScrollIndicators() {
    this.scrollResponderFlashScrollIndicators();
  },

  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  getScrollResponder: function getScrollResponder() {
    return this;
  },
  getScrollableNode: function getScrollableNode() {
    return this._scrollNodeRef;
  },
  getInnerViewRef: function getInnerViewRef() {
    return this._innerViewRef;
  },
  getInnerViewNode: function getInnerViewNode() {
    return this._innerViewRef;
  },
  getNativeScrollRef: function getNativeScrollRef() {
    return this._scrollNodeRef;
  },

  /**
   * Scrolls to a given x, y offset, either immediately or with a smooth animation.
   * Syntax:
   *
   * scrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
   *
   * Note: The weird argument signature is due to the fact that, for historical reasons,
   * the function also accepts separate arguments as as alternative to the options object.
   * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
   */
  scrollTo: function scrollTo(y, x, animated) {
    if (typeof y === 'number') {
      console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
    } else {
      var _ref = y || emptyObject;

      x = _ref.x;
      y = _ref.y;
      animated = _ref.animated;
    }

    this.getScrollResponder().scrollResponderScrollTo({
      x: x || 0,
      y: y || 0,
      animated: animated !== false
    });
  },

  /**
   * If this is a vertical ScrollView scrolls to the bottom.
   * If this is a horizontal ScrollView scrolls to the right.
   *
   * Use `scrollToEnd({ animated: true })` for smooth animated scrolling,
   * `scrollToEnd({ animated: false })` for immediate scrolling.
   * If no options are passed, `animated` defaults to true.
   */
  scrollToEnd: function scrollToEnd(options) {
    // Default to true
    var animated = (options && options.animated) !== false;
    var horizontal = this.props.horizontal;
    var scrollResponder = this.getScrollResponder();
    var scrollResponderNode = scrollResponder.scrollResponderGetScrollableNode();
    var x = horizontal ? scrollResponderNode.scrollWidth : 0;
    var y = horizontal ? 0 : scrollResponderNode.scrollHeight;
    scrollResponder.scrollResponderScrollTo({
      x: x,
      y: y,
      animated: animated
    });
  },
  render: function render() {
    var _this$props = this.props,
        contentContainerStyle = _this$props.contentContainerStyle,
        horizontal = _this$props.horizontal,
        onContentSizeChange = _this$props.onContentSizeChange,
        refreshControl = _this$props.refreshControl,
        stickyHeaderIndices = _this$props.stickyHeaderIndices,
        pagingEnabled = _this$props.pagingEnabled,
        forwardedRef = _this$props.forwardedRef,
        keyboardDismissMode = _this$props.keyboardDismissMode,
        onScroll = _this$props.onScroll,
        other = _objectWithoutPropertiesLoose(_this$props, ["contentContainerStyle", "horizontal", "onContentSizeChange", "refreshControl", "stickyHeaderIndices", "pagingEnabled", "forwardedRef", "keyboardDismissMode", "onScroll"]);

    if (process.env.NODE_ENV !== 'production' && this.props.style) {
      var style = _StyleSheet.default.flatten(this.props.style);

      var childLayoutProps = ['alignItems', 'justifyContent'].filter(function (prop) {
        return style && style[prop] !== undefined;
      });
      (0, _invariant.default)(childLayoutProps.length === 0, "ScrollView child layout (" + JSON.stringify(childLayoutProps) + ") " + 'must be applied through the contentContainerStyle prop.');
    }

    var contentSizeChangeProps = {};

    if (onContentSizeChange) {
      contentSizeChangeProps = {
        onLayout: this._handleContentOnLayout
      };
    }

    var hasStickyHeaderIndices = !horizontal && Array.isArray(stickyHeaderIndices);
    var children = hasStickyHeaderIndices || pagingEnabled ? _react.default.Children.map(this.props.children, function (child, i) {
      var isSticky = hasStickyHeaderIndices && stickyHeaderIndices.indexOf(i) > -1;

      if (child != null && (isSticky || pagingEnabled)) {
        return /*#__PURE__*/_react.default.createElement(_View.default, {
          style: _StyleSheet.default.compose(isSticky && styles.stickyHeader, pagingEnabled && styles.pagingEnabledChild)
        }, child);
      } else {
        return child;
      }
    }) : this.props.children;

    var contentContainer = /*#__PURE__*/_react.default.createElement(_View.default, _extends({}, contentSizeChangeProps, {
      children: children,
      collapsable: false,
      ref: this._setInnerViewRef,
      style: _StyleSheet.default.compose(horizontal && styles.contentContainerHorizontal, contentContainerStyle)
    }));

    var baseStyle = horizontal ? styles.baseHorizontal : styles.baseVertical;
    var pagingEnabledStyle = horizontal ? styles.pagingEnabledHorizontal : styles.pagingEnabledVertical;

    var props = _objectSpread(_objectSpread({}, other), {}, {
      style: [baseStyle, pagingEnabled && pagingEnabledStyle, this.props.style],
      onTouchStart: this.scrollResponderHandleTouchStart,
      onTouchMove: this.scrollResponderHandleTouchMove,
      onTouchEnd: this.scrollResponderHandleTouchEnd,
      onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
      onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
      onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
      onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
      onStartShouldSetResponder: this.scrollResponderHandleStartShouldSetResponder,
      onStartShouldSetResponderCapture: this.scrollResponderHandleStartShouldSetResponderCapture,
      onScrollShouldSetResponder: this.scrollResponderHandleScrollShouldSetResponder,
      onScroll: this._handleScroll,
      onResponderGrant: this.scrollResponderHandleResponderGrant,
      onResponderTerminationRequest: this.scrollResponderHandleTerminationRequest,
      onResponderTerminate: this.scrollResponderHandleTerminate,
      onResponderRelease: this.scrollResponderHandleResponderRelease,
      onResponderReject: this.scrollResponderHandleResponderReject
    });

    var ScrollViewClass = _ScrollViewBase.default;
    (0, _invariant.default)(ScrollViewClass !== undefined, 'ScrollViewClass must not be undefined');

    if (refreshControl) {
      return /*#__PURE__*/_react.default.cloneElement(refreshControl, {
        style: props.style
      }, /*#__PURE__*/_react.default.createElement(ScrollViewClass, _extends({}, props, {
        ref: this._setScrollNodeRef,
        style: baseStyle
      }), contentContainer));
    }

    return /*#__PURE__*/_react.default.createElement(ScrollViewClass, _extends({}, props, {
      ref: this._setScrollNodeRef
    }), contentContainer);
  },
  _handleContentOnLayout: function _handleContentOnLayout(e) {
    var _e$nativeEvent$layout = e.nativeEvent.layout,
        width = _e$nativeEvent$layout.width,
        height = _e$nativeEvent$layout.height;
    this.props.onContentSizeChange(width, height);
  },
  _handleScroll: function _handleScroll(e) {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.onScroll && this.props.scrollEventThrottle == null) {
        console.log('You specified `onScroll` on a <ScrollView> but not ' + '`scrollEventThrottle`. You will only receive one event. ' + 'Using `16` you get all the events but be aware that it may ' + "cause frame drops, use a bigger number if you don't need as " + 'much precision.');
      }
    }

    if (this.props.keyboardDismissMode === 'on-drag') {
      (0, _dismissKeyboard.default)();
    }

    this.scrollResponderHandleScroll(e);
  },
  _setInnerViewRef: function _setInnerViewRef(node) {
    this._innerViewRef = node;
  },
  _setScrollNodeRef: function _setScrollNodeRef(node) {
    this._scrollNodeRef = node; // ScrollView needs to add more methods to the hostNode in addition to those
    // added by `usePlatformMethods`. This is temporarily until an API like
    // `ScrollView.scrollTo(hostNode, { x, y })` is added to React Native.

    if (node != null) {
      node.getScrollResponder = this.getScrollResponder;
      node.getInnerViewNode = this.getInnerViewNode;
      node.getInnerViewRef = this.getInnerViewRef;
      node.getNativeScrollRef = this.getNativeScrollRef;
      node.getScrollableNode = this.getScrollableNode;
      node.scrollTo = this.scrollTo;
      node.scrollToEnd = this.scrollToEnd;
      node.flashScrollIndicators = this.flashScrollIndicators;
      node.scrollResponderZoomTo = this.scrollResponderZoomTo;
      node.scrollResponderScrollNativeHandleToKeyboard = this.scrollResponderScrollNativeHandleToKeyboard;
    }

    var ref = (0, _mergeRefs.default)(this.props.forwardedRef);
    ref(node);
  }
});
var commonStyle = {
  flexGrow: 1,
  flexShrink: 1,
  // Enable hardware compositing in modern browsers.
  // Creates a new layer with its own backing surface that can significantly
  // improve scroll performance.
  transform: [{
    translateZ: 0
  }],
  // iOS native scrolling
  WebkitOverflowScrolling: 'touch'
};

var styles = _StyleSheet.default.create({
  baseVertical: _objectSpread(_objectSpread({}, commonStyle), {}, {
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto'
  }),
  baseHorizontal: _objectSpread(_objectSpread({}, commonStyle), {}, {
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden'
  }),
  contentContainerHorizontal: {
    flexDirection: 'row'
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 10
  },
  pagingEnabledHorizontal: {
    scrollSnapType: 'x mandatory'
  },
  pagingEnabledVertical: {
    scrollSnapType: 'y mandatory'
  },
  pagingEnabledChild: {
    scrollSnapAlign: 'start'
  }
});

var ForwardedScrollView = /*#__PURE__*/_react.default.forwardRef(function (props, forwardedRef) {
  return /*#__PURE__*/_react.default.createElement(ScrollView, _extends({}, props, {
    forwardedRef: forwardedRef
  }));
});

ForwardedScrollView.displayName = 'ScrollView';
var _default = ForwardedScrollView;
exports.default = _default;
module.exports = exports.default;