"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Batchinator = _interopRequireDefault(require("../Batchinator"));

var _FillRateHelper = _interopRequireDefault(require("../FillRateHelper"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _RefreshControl = _interopRequireDefault(require("../../../exports/RefreshControl"));

var _ScrollView = _interopRequireDefault(require("../../../exports/ScrollView"));

var _StyleSheet = _interopRequireDefault(require("../../../exports/StyleSheet"));

var _UIManager = _interopRequireDefault(require("../../../exports/UIManager"));

var _View = _interopRequireDefault(require("../../../exports/View"));

var _ViewabilityHelper = _interopRequireDefault(require("../ViewabilityHelper"));

var _findNodeHandle = _interopRequireDefault(require("../../../exports/findNodeHandle"));

var _infoLog = _interopRequireDefault(require("../infoLog"));

var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));

var _warning = _interopRequireDefault(require("fbjs/lib/warning"));

var _VirtualizeUtils = require("../VirtualizeUtils");

var _VirtualizedListContext = require("./VirtualizedListContext.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var flattenStyle = _StyleSheet.default.flatten;

var __DEV__ = process.env.NODE_ENV !== 'production';

var _usedIndexForKey = false;
var _keylessItemComponentName = '';

/**
 * Base implementation for the more convenient [`<FlatList>`](https://reactnative.dev/docs/flatlist.html)
 * and [`<SectionList>`](https://reactnative.dev/docs/sectionlist.html) components, which are also better
 * documented. In general, this should only really be used if you need more flexibility than
 * `FlatList` provides, e.g. for use with immutable data instead of plain arrays.
 *
 * Virtualization massively improves memory consumption and performance of large lists by
 * maintaining a finite render window of active items and replacing all items outside of the render
 * window with appropriately sized blank space. The window adapts to scrolling behavior, and items
 * are rendered incrementally with low-pri (after any running interactions) if they are far from the
 * visible area, or with hi-pri otherwise to minimize the potential of seeing blank space.
 *
 * Some caveats:
 *
 * - Internal state is not preserved when content scrolls out of the render window. Make sure all
 *   your data is captured in the item data or external stores like Flux, Redux, or Relay.
 * - This is a `PureComponent` which means that it will not re-render if `props` remain shallow-
 *   equal. Make sure that everything your `renderItem` function depends on is passed as a prop
 *   (e.g. `extraData`) that is not `===` after updates, otherwise your UI may not update on
 *   changes. This includes the `data` prop and parent component state.
 * - In order to constrain memory and enable smooth scrolling, content is rendered asynchronously
 *   offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see
 *   blank content. This is a tradeoff that can be adjusted to suit the needs of each application,
 *   and we are working on improving it behind the scenes.
 * - By default, the list looks for a `key` or `id` prop on each item and uses that for the React key.
 *   Alternatively, you can provide a custom `keyExtractor` prop.
 *
 */
var VirtualizedList = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(VirtualizedList, _React$PureComponent);

  var _proto = VirtualizedList.prototype;

  // scrollToEnd may be janky without getItemLayout prop
  _proto.scrollToEnd = function scrollToEnd(params) {
    var animated = params ? params.animated : true;
    var veryLast = this.props.getItemCount(this.props.data) - 1;

    var frame = this._getFrameMetricsApprox(veryLast);

    var offset = Math.max(0, frame.offset + frame.length + this._footerLength - this._scrollMetrics.visibleLength);

    if (this._scrollRef == null) {
      return;
    }

    if (this._scrollRef.scrollTo == null) {
      console.warn('No scrollTo method provided. This may be because you have two nested ' + 'VirtualizedLists with the same orientation, or because you are ' + 'using a custom component that does not implement scrollTo.');
      return;
    }

    this._scrollRef.scrollTo(this.props.horizontal ? {
      x: offset,
      animated: animated
    } : {
      y: offset,
      animated: animated
    });
  } // scrollToIndex may be janky without getItemLayout prop
  ;

  _proto.scrollToIndex = function scrollToIndex(params) {
    var _this$props = this.props,
        data = _this$props.data,
        horizontal = _this$props.horizontal,
        getItemCount = _this$props.getItemCount,
        getItemLayout = _this$props.getItemLayout,
        onScrollToIndexFailed = _this$props.onScrollToIndexFailed;
    var animated = params.animated,
        index = params.index,
        viewOffset = params.viewOffset,
        viewPosition = params.viewPosition;
    (0, _invariant.default)(index >= 0, "scrollToIndex out of range: requested index " + index + " but minimum is 0");
    (0, _invariant.default)(getItemCount(data) >= 1, "scrollToIndex out of range: item length " + getItemCount(data) + " but minimum is 1");
    (0, _invariant.default)(index < getItemCount(data), "scrollToIndex out of range: requested index " + index + " is out of 0 to " + (getItemCount(data) - 1));

    if (!getItemLayout && index > this._highestMeasuredFrameIndex) {
      (0, _invariant.default)(!!onScrollToIndexFailed, 'scrollToIndex should be used in conjunction with getItemLayout or onScrollToIndexFailed, ' + 'otherwise there is no way to know the location of offscreen indices or handle failures.');
      onScrollToIndexFailed({
        averageItemLength: this._averageCellLength,
        highestMeasuredFrameIndex: this._highestMeasuredFrameIndex,
        index: index
      });
      return;
    }

    var frame = this._getFrameMetricsApprox(index);

    var offset = Math.max(0, frame.offset - (viewPosition || 0) * (this._scrollMetrics.visibleLength - frame.length)) - (viewOffset || 0);

    if (this._scrollRef == null) {
      return;
    }

    if (this._scrollRef.scrollTo == null) {
      console.warn('No scrollTo method provided. This may be because you have two nested ' + 'VirtualizedLists with the same orientation, or because you are ' + 'using a custom component that does not implement scrollTo.');
      return;
    }

    this._scrollRef.scrollTo(horizontal ? {
      x: offset,
      animated: animated
    } : {
      y: offset,
      animated: animated
    });
  } // scrollToItem may be janky without getItemLayout prop. Required linear scan through items -
  // use scrollToIndex instead if possible.
  ;

  _proto.scrollToItem = function scrollToItem(params) {
    var item = params.item;
    var _this$props2 = this.props,
        data = _this$props2.data,
        getItem = _this$props2.getItem,
        getItemCount = _this$props2.getItemCount;
    var itemCount = getItemCount(data);

    for (var _index = 0; _index < itemCount; _index++) {
      if (getItem(data, _index) === item) {
        this.scrollToIndex(_objectSpread(_objectSpread({}, params), {}, {
          index: _index
        }));
        break;
      }
    }
  }
  /**
   * Scroll to a specific content pixel offset in the list.
   *
   * Param `offset` expects the offset to scroll to.
   * In case of `horizontal` is true, the offset is the x-value,
   * in any other case the offset is the y-value.
   *
   * Param `animated` (`true` by default) defines whether the list
   * should do an animation while scrolling.
   */
  ;

  _proto.scrollToOffset = function scrollToOffset(params) {
    var animated = params.animated,
        offset = params.offset;

    if (this._scrollRef == null) {
      return;
    }

    if (this._scrollRef.scrollTo == null) {
      console.warn('No scrollTo method provided. This may be because you have two nested ' + 'VirtualizedLists with the same orientation, or because you are ' + 'using a custom component that does not implement scrollTo.');
      return;
    }

    this._scrollRef.scrollTo(this.props.horizontal ? {
      x: offset,
      animated: animated
    } : {
      y: offset,
      animated: animated
    });
  };

  _proto.recordInteraction = function recordInteraction() {
    this._nestedChildLists.forEach(function (childList) {
      childList.ref && childList.ref.recordInteraction();
    });

    this._viewabilityTuples.forEach(function (t) {
      t.viewabilityHelper.recordInteraction();
    });

    this._updateViewableItems(this.props.data);
  };

  _proto.flashScrollIndicators = function flashScrollIndicators() {
    if (this._scrollRef == null) {
      return;
    }

    this._scrollRef.flashScrollIndicators();
  }
  /**
   * Provides a handle to the underlying scroll responder.
   * Note that `this._scrollRef` might not be a `ScrollView`, so we
   * need to check that it responds to `getScrollResponder` before calling it.
   */
  ;

  _proto.getScrollResponder = function getScrollResponder() {
    if (this._scrollRef && this._scrollRef.getScrollResponder) {
      return this._scrollRef.getScrollResponder();
    }
  };

  _proto.getScrollableNode = function getScrollableNode() {
    if (this._scrollRef && this._scrollRef.getScrollableNode) {
      return this._scrollRef.getScrollableNode();
    } else {
      return (0, _findNodeHandle.default)(this._scrollRef);
    }
  };

  _proto.getScrollRef = function getScrollRef() {
    if (this._scrollRef && this._scrollRef.getScrollRef) {
      return this._scrollRef.getScrollRef();
    } else {
      return this._scrollRef;
    }
  };

  _proto.setNativeProps = function setNativeProps(props) {
    if (this._scrollRef) {
      this._scrollRef.setNativeProps(props);
    }
  };

  _proto._getCellKey = function _getCellKey() {
    var _this$context;

    return ((_this$context = this.context) == null ? void 0 : _this$context.cellKey) || 'rootList';
  };

  _proto._getListKey = function _getListKey() {
    return this.props.listKey || this._getCellKey();
  };

  _proto._getDebugInfo = function _getDebugInfo() {
    var _this$context2;

    return {
      listKey: this._getListKey(),
      cellKey: this._getCellKey(),
      horizontal: !!this.props.horizontal,
      parent: (_this$context2 = this.context) == null ? void 0 : _this$context2.debugInfo
    };
  };

  _proto.hasMore = function hasMore() {
    return this._hasMore;
  };

  function VirtualizedList(_props) {
    var _this;

    _this = _React$PureComponent.call(this, _props) || this;

    _this._getScrollMetrics = function () {
      return _this._scrollMetrics;
    };

    _this._getOutermostParentListRef = function () {
      if (_this._isNestedWithSameOrientation()) {
        return _this.context.getOutermostParentListRef();
      } else {
        return _assertThisInitialized(_this);
      }
    };

    _this._getNestedChildState = function (key) {
      var existingChildData = _this._nestedChildLists.get(key);

      return existingChildData && existingChildData.state;
    };

    _this._registerAsNestedChild = function (childList) {
      // Register the mapping between this child key and the cellKey for its cell
      var childListsInCell = _this._cellKeysToChildListKeys.get(childList.cellKey) || new Set();
      childListsInCell.add(childList.key);

      _this._cellKeysToChildListKeys.set(childList.cellKey, childListsInCell);

      var existingChildData = _this._nestedChildLists.get(childList.key);

      if (existingChildData && existingChildData.ref !== null) {
        console.error('A VirtualizedList contains a cell which itself contains ' + 'more than one VirtualizedList of the same orientation as the parent ' + 'list. You must pass a unique listKey prop to each sibling list.\n\n' + describeNestedLists(_objectSpread(_objectSpread({}, childList), {}, {
          // We're called from the child's componentDidMount, so it's safe to
          // read the child's props here (albeit weird).
          horizontal: !!childList.ref.props.horizontal
        })));
      }

      _this._nestedChildLists.set(childList.key, {
        ref: childList.ref,
        state: null
      });

      if (_this._hasInteracted) {
        childList.ref.recordInteraction();
      }
    };

    _this._unregisterAsNestedChild = function (childList) {
      _this._nestedChildLists.set(childList.key, {
        ref: null,
        state: childList.state
      });
    };

    _this._onUpdateSeparators = function (keys, newProps) {
      keys.forEach(function (key) {
        var ref = key != null && _this._cellRefs[key];
        ref && ref.updateSeparatorProps(newProps);
      });
    };

    _this._averageCellLength = 0;
    _this._cellKeysToChildListKeys = new Map();
    _this._cellRefs = {};
    _this._frames = {};
    _this._footerLength = 0;
    _this._hasDoneInitialScroll = false;
    _this._hasInteracted = false;
    _this._hasMore = false;
    _this._hasWarned = {};
    _this._headerLength = 0;
    _this._hiPriInProgress = false;
    _this._highestMeasuredFrameIndex = 0;
    _this._indicesToKeys = new Map();
    _this._nestedChildLists = new Map();
    _this._offsetFromParentVirtualizedList = 0;
    _this._prevParentOffset = 0;
    _this._scrollMetrics = {
      contentLength: 0,
      dOffset: 0,
      dt: 10,
      offset: 0,
      timestamp: 0,
      velocity: 0,
      visibleLength: 0
    };
    _this._scrollRef = null;
    _this._sentEndForContentLength = 0;
    _this._totalCellLength = 0;
    _this._totalCellsMeasured = 0;
    _this._viewabilityTuples = [];

    _this._captureScrollRef = function (ref) {
      _this._scrollRef = ref;
    };

    _this._defaultRenderScrollComponent = function (props) {
      var onRefresh = props.onRefresh;

      if (_this._isNestedWithSameOrientation()) {
        // $FlowFixMe - Typing ReactNativeComponent revealed errors
        return /*#__PURE__*/React.createElement(_View.default, props);
      } else if (onRefresh) {
        (0, _invariant.default)(typeof props.refreshing === 'boolean', '`refreshing` prop must be set as a boolean in order to use `onRefresh`, but got `' +
        /* $FlowFixMe(>=0.111.0 site=react_native_fb) This comment suppresses
         * an error found when Flow v0.111 was deployed. To see the error,
         * delete this comment and run Flow. */
        JSON.stringify(props.refreshing) + '`');
        return (
          /*#__PURE__*/
          // $FlowFixMe Invalid prop usage
          React.createElement(_ScrollView.default, _extends({}, props, {
            refreshControl: props.refreshControl == null ? /*#__PURE__*/React.createElement(_RefreshControl.default, {
              refreshing: props.refreshing,
              onRefresh: onRefresh,
              progressViewOffset: props.progressViewOffset
            }) : props.refreshControl
          }))
        );
      } else {
        // $FlowFixMe Invalid prop usage
        return /*#__PURE__*/React.createElement(_ScrollView.default, props);
      }
    };

    _this._onCellUnmount = function (cellKey) {
      var curr = _this._frames[cellKey];

      if (curr) {
        _this._frames[cellKey] = _objectSpread(_objectSpread({}, curr), {}, {
          inLayout: false
        });
      }
    };

    _this._onLayout = function (e) {
      if (_this._isNestedWithSameOrientation()) {
        // Need to adjust our scroll metrics to be relative to our containing
        // VirtualizedList before we can make claims about list item viewability
        _this.measureLayoutRelativeToContainingList();
      } else {
        _this._scrollMetrics.visibleLength = _this._selectLength(e.nativeEvent.layout);
      }

      _this.props.onLayout && _this.props.onLayout(e);

      _this._scheduleCellsToRenderUpdate();

      _this._maybeCallOnEndReached();
    };

    _this._onLayoutEmpty = function (e) {
      _this.props.onLayout && _this.props.onLayout(e);
    };

    _this._onLayoutFooter = function (e) {
      _this._triggerRemeasureForChildListsInCell(_this._getFooterCellKey());

      _this._footerLength = _this._selectLength(e.nativeEvent.layout);
    };

    _this._onLayoutHeader = function (e) {
      _this._headerLength = _this._selectLength(e.nativeEvent.layout);
    };

    _this._onContentSizeChange = function (width, height) {
      if (width > 0 && height > 0 && _this.props.initialScrollIndex != null && _this.props.initialScrollIndex > 0 && !_this._hasDoneInitialScroll) {
        _this._hasDoneInitialScroll = true;
      }

      if (_this.props.onContentSizeChange) {
        _this.props.onContentSizeChange(width, height);
      }

      _this._scrollMetrics.contentLength = _this._selectLength({
        height: height,
        width: width
      });

      _this._scheduleCellsToRenderUpdate();

      _this._maybeCallOnEndReached();
    };

    _this._convertParentScrollMetrics = function (metrics) {
      // Offset of the top of the nested list relative to the top of its parent's viewport
      var offset = metrics.offset - _this._offsetFromParentVirtualizedList; // Child's visible length is the same as its parent's

      var visibleLength = metrics.visibleLength;
      var dOffset = offset - _this._scrollMetrics.offset;
      var contentLength = _this._scrollMetrics.contentLength;
      return {
        visibleLength: visibleLength,
        contentLength: contentLength,
        offset: offset,
        dOffset: dOffset
      };
    };

    _this._onScroll = function (e) {
      _this._nestedChildLists.forEach(function (childList) {
        childList.ref && childList.ref._onScroll(e);
      });

      if (_this.props.onScroll) {
        _this.props.onScroll(e);
      }

      var timestamp = e.timeStamp;

      var visibleLength = _this._selectLength(e.nativeEvent.layoutMeasurement);

      var contentLength = _this._selectLength(e.nativeEvent.contentSize);

      var offset = _this._selectOffset(e.nativeEvent.contentOffset);

      var dOffset = offset - _this._scrollMetrics.offset;

      if (_this._isNestedWithSameOrientation()) {
        if (_this._scrollMetrics.contentLength === 0) {
          // Ignore scroll events until onLayout has been called and we
          // know our offset from our offset from our parent
          return;
        }

        var _this$_convertParentS = _this._convertParentScrollMetrics({
          visibleLength: visibleLength,
          offset: offset
        });

        visibleLength = _this$_convertParentS.visibleLength;
        contentLength = _this$_convertParentS.contentLength;
        offset = _this$_convertParentS.offset;
        dOffset = _this$_convertParentS.dOffset;
      }

      var dt = _this._scrollMetrics.timestamp ? Math.max(1, timestamp - _this._scrollMetrics.timestamp) : 1;
      var velocity = dOffset / dt;

      if (dt > 500 && _this._scrollMetrics.dt > 500 && contentLength > 5 * visibleLength && !_this._hasWarned.perf) {
        (0, _infoLog.default)('VirtualizedList: You have a large list that is slow to update - make sure your ' + 'renderItem function renders components that follow React performance best practices ' + 'like PureComponent, shouldComponentUpdate, etc.', {
          dt: dt,
          prevDt: _this._scrollMetrics.dt,
          contentLength: contentLength
        });
        _this._hasWarned.perf = true;
      }

      _this._scrollMetrics = {
        contentLength: contentLength,
        dt: dt,
        dOffset: dOffset,
        offset: offset,
        timestamp: timestamp,
        velocity: velocity,
        visibleLength: visibleLength
      };

      _this._updateViewableItems(_this.props.data);

      if (!_this.props) {
        return;
      }

      _this._maybeCallOnEndReached();

      if (velocity !== 0) {
        _this._fillRateHelper.activate();
      }

      _this._computeBlankness();

      _this._scheduleCellsToRenderUpdate();
    };

    _this._onScrollBeginDrag = function (e) {
      _this._nestedChildLists.forEach(function (childList) {
        childList.ref && childList.ref._onScrollBeginDrag(e);
      });

      _this._viewabilityTuples.forEach(function (tuple) {
        tuple.viewabilityHelper.recordInteraction();
      });

      _this._hasInteracted = true;
      _this.props.onScrollBeginDrag && _this.props.onScrollBeginDrag(e);
    };

    _this._onScrollEndDrag = function (e) {
      _this._nestedChildLists.forEach(function (childList) {
        childList.ref && childList.ref._onScrollEndDrag(e);
      });

      var velocity = e.nativeEvent.velocity;

      if (velocity) {
        _this._scrollMetrics.velocity = _this._selectOffset(velocity);
      }

      _this._computeBlankness();

      _this.props.onScrollEndDrag && _this.props.onScrollEndDrag(e);
    };

    _this._onMomentumScrollBegin = function (e) {
      _this._nestedChildLists.forEach(function (childList) {
        childList.ref && childList.ref._onMomentumScrollBegin(e);
      });

      _this.props.onMomentumScrollBegin && _this.props.onMomentumScrollBegin(e);
    };

    _this._onMomentumScrollEnd = function (e) {
      _this._nestedChildLists.forEach(function (childList) {
        childList.ref && childList.ref._onMomentumScrollEnd(e);
      });

      _this._scrollMetrics.velocity = 0;

      _this._computeBlankness();

      _this.props.onMomentumScrollEnd && _this.props.onMomentumScrollEnd(e);
    };

    _this._updateCellsToRender = function () {
      var _this$props3 = _this.props,
          data = _this$props3.data,
          getItemCount = _this$props3.getItemCount,
          onEndReachedThreshold = _this$props3.onEndReachedThreshold;

      var isVirtualizationDisabled = _this._isVirtualizationDisabled();

      _this._updateViewableItems(data);

      if (!data) {
        return;
      }

      _this.setState(function (state) {
        var newState;
        var _this$_scrollMetrics = _this._scrollMetrics,
            contentLength = _this$_scrollMetrics.contentLength,
            offset = _this$_scrollMetrics.offset,
            visibleLength = _this$_scrollMetrics.visibleLength;

        if (!isVirtualizationDisabled) {
          // If we run this with bogus data, we'll force-render window {first: 0, last: 0},
          // and wipe out the initialNumToRender rendered elements.
          // So let's wait until the scroll view metrics have been set up. And until then,
          // we will trust the initialNumToRender suggestion
          if (visibleLength > 0 && contentLength > 0) {
            // If we have a non-zero initialScrollIndex and run this before we've scrolled,
            // we'll wipe out the initialNumToRender rendered elements starting at initialScrollIndex.
            // So let's wait until we've scrolled the view to the right place. And until then,
            // we will trust the initialScrollIndex suggestion.
            if (!_this.props.initialScrollIndex || _this._scrollMetrics.offset) {
              newState = (0, _VirtualizeUtils.computeWindowedRenderLimits)(_this.props, state, _this._getFrameMetricsApprox, _this._scrollMetrics);
            }
          }
        } else {
          var distanceFromEnd = contentLength - visibleLength - offset;
          var renderAhead =
          /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses
           * an error found when Flow v0.63 was deployed. To see the error
           * delete this comment and run Flow. */
          distanceFromEnd < onEndReachedThreshold * visibleLength ? _this.props.maxToRenderPerBatch : 0;
          newState = {
            first: 0,
            last: Math.min(state.last + renderAhead, getItemCount(data) - 1)
          };
        }

        if (newState && _this._nestedChildLists.size > 0) {
          var newFirst = newState.first;
          var newLast = newState.last; // If some cell in the new state has a child list in it, we should only render
          // up through that item, so that we give that list a chance to render.
          // Otherwise there's churn from multiple child lists mounting and un-mounting
          // their items.

          for (var ii = newFirst; ii <= newLast; ii++) {
            var cellKeyForIndex = _this._indicesToKeys.get(ii);

            var childListKeys = cellKeyForIndex && _this._cellKeysToChildListKeys.get(cellKeyForIndex);

            if (!childListKeys) {
              continue;
            }

            var someChildHasMore = false; // For each cell, need to check whether any child list in it has more elements to render

            for (var _iterator = _createForOfIteratorHelperLoose(childListKeys), _step; !(_step = _iterator()).done;) {
              var childKey = _step.value;

              var childList = _this._nestedChildLists.get(childKey);

              if (childList && childList.ref && childList.ref.hasMore()) {
                someChildHasMore = true;
                break;
              }
            }

            if (someChildHasMore && newState) {
              newState.last = ii;
              break;
            }
          }
        }

        if (newState != null && newState.first === state.first && newState.last === state.last) {
          newState = null;
        }

        return newState;
      });
    };

    _this._createViewToken = function (index, isViewable) {
      var _this$props4 = _this.props,
          data = _this$props4.data,
          getItem = _this$props4.getItem,
          keyExtractor = _this$props4.keyExtractor;
      var item = getItem(data, index);
      return {
        index: index,
        item: item,
        key: keyExtractor(item, index),
        isViewable: isViewable
      };
    };

    _this._getFrameMetricsApprox = function (index) {
      var frame = _this._getFrameMetrics(index);

      if (frame && frame.index === index) {
        // check for invalid frames due to row re-ordering
        return frame;
      } else {
        var getItemLayout = _this.props.getItemLayout;
        (0, _invariant.default)(!getItemLayout, 'Should not have to estimate frames when a measurement metrics function is provided');
        return {
          length: _this._averageCellLength,
          offset: _this._averageCellLength * index
        };
      }
    };

    _this._getFrameMetrics = function (index) {
      var _this$props5 = _this.props,
          data = _this$props5.data,
          getItem = _this$props5.getItem,
          getItemCount = _this$props5.getItemCount,
          getItemLayout = _this$props5.getItemLayout,
          keyExtractor = _this$props5.keyExtractor;
      (0, _invariant.default)(getItemCount(data) > index, 'Tried to get frame for out of range index ' + index);
      var item = getItem(data, index);

      var frame = item && _this._frames[keyExtractor(item, index)];

      if (!frame || frame.index !== index) {
        if (getItemLayout) {
          frame = getItemLayout(data, index);
        }
      }
      /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses an
       * error found when Flow v0.63 was deployed. To see the error delete this
       * comment and run Flow. */


      return frame;
    };

    (0, _invariant.default)( // $FlowFixMe
    !_props.onScroll || !_props.onScroll.__isNative, 'Components based on VirtualizedList must be wrapped with Animated.createAnimatedComponent ' + 'to support native onScroll events with useNativeDriver');
    (0, _invariant.default)(_props.windowSize > 0, 'VirtualizedList: The windowSize prop must be present and set to a value greater than 0.');
    _this._fillRateHelper = new _FillRateHelper.default(_this._getFrameMetrics);
    _this._updateCellsToRenderBatcher = new _Batchinator.default(_this._updateCellsToRender, _this.props.updateCellsBatchingPeriod);

    if (_this.props.viewabilityConfigCallbackPairs) {
      _this._viewabilityTuples = _this.props.viewabilityConfigCallbackPairs.map(function (pair) {
        return {
          viewabilityHelper: new _ViewabilityHelper.default(pair.viewabilityConfig),
          onViewableItemsChanged: pair.onViewableItemsChanged
        };
      });
    } else if (_this.props.onViewableItemsChanged) {
      var onViewableItemsChanged = _this.props.onViewableItemsChanged;

      _this._viewabilityTuples.push({
        viewabilityHelper: new _ViewabilityHelper.default(_this.props.viewabilityConfig),
        onViewableItemsChanged: onViewableItemsChanged
      });
    }

    var initialState = {
      first: _this.props.initialScrollIndex || 0,
      last: Math.min(_this.props.getItemCount(_this.props.data), (_this.props.initialScrollIndex || 0) + _this.props.initialNumToRender) - 1
    };

    if (_this._isNestedWithSameOrientation()) {
      var storedState = _this.context.getNestedChildState(_this._getListKey());

      if (storedState) {
        initialState = storedState;
        _this.state = storedState;
        _this._frames = storedState.frames;
      }
    }

    _this.state = initialState;
    return _this;
  }

  _proto.componentDidMount = function componentDidMount() {
    if (this._isNestedWithSameOrientation()) {
      this.context.registerAsNestedChild({
        cellKey: this._getCellKey(),
        key: this._getListKey(),
        ref: this,
        // NOTE: When the child mounts (here) it's not necessarily safe to read
        // the parent's props. This is why we explicitly propagate debugInfo
        // "down" via context and "up" again via this method call on the
        // parent.
        parentDebugInfo: this.context.debugInfo
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this._isNestedWithSameOrientation()) {
      this.context.unregisterAsNestedChild({
        key: this._getListKey(),
        state: {
          first: this.state.first,
          last: this.state.last,
          frames: this._frames
        }
      });
    }

    this._updateViewableItems(null);

    this._updateCellsToRenderBatcher.dispose({
      abort: true
    });

    this._viewabilityTuples.forEach(function (tuple) {
      tuple.viewabilityHelper.dispose();
    });

    this._fillRateHelper.deactivateAndFlush();
  };

  VirtualizedList.getDerivedStateFromProps = function getDerivedStateFromProps(newProps, prevState) {
    var data = newProps.data,
        getItemCount = newProps.getItemCount,
        maxToRenderPerBatch = newProps.maxToRenderPerBatch; // first and last could be stale (e.g. if a new, shorter items props is passed in), so we make
    // sure we're rendering a reasonable range here.

    return {
      first: Math.max(0, Math.min(prevState.first, getItemCount(data) - 1 - maxToRenderPerBatch)),
      last: Math.max(0, Math.min(prevState.last, getItemCount(data) - 1))
    };
  };

  _proto._pushCells = function _pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, first, last, inversionStyle) {
    var _this2 = this;

    var _this$props6 = this.props,
        CellRendererComponent = _this$props6.CellRendererComponent,
        ItemSeparatorComponent = _this$props6.ItemSeparatorComponent,
        data = _this$props6.data,
        getItem = _this$props6.getItem,
        getItemCount = _this$props6.getItemCount,
        horizontal = _this$props6.horizontal,
        keyExtractor = _this$props6.keyExtractor;
    var stickyOffset = this.props.ListHeaderComponent ? 1 : 0;
    var end = getItemCount(data) - 1;
    var prevCellKey;
    last = Math.min(end, last);

    var _loop = function _loop(ii) {
      var item = getItem(data, ii);
      var key = keyExtractor(item, ii);

      _this2._indicesToKeys.set(ii, key);

      if (stickyIndicesFromProps.has(ii + stickyOffset)) {
        stickyHeaderIndices.push(cells.length);
      }

      cells.push( /*#__PURE__*/React.createElement(CellRenderer, {
        CellRendererComponent: CellRendererComponent,
        ItemSeparatorComponent: ii < end ? ItemSeparatorComponent : undefined,
        cellKey: key,
        fillRateHelper: _this2._fillRateHelper,
        horizontal: horizontal,
        index: ii,
        inversionStyle: inversionStyle,
        item: item,
        key: key,
        prevCellKey: prevCellKey,
        onUpdateSeparators: _this2._onUpdateSeparators,
        onLayout: function onLayout(e) {
          return _this2._onCellLayout(e, key, ii);
        },
        onUnmount: _this2._onCellUnmount,
        parentProps: _this2.props,
        ref: function ref(_ref) {
          _this2._cellRefs[key] = _ref;
        }
      }));
      prevCellKey = key;
    };

    for (var ii = first; ii <= last; ii++) {
      _loop(ii);
    }
  };

  _proto._isVirtualizationDisabled = function _isVirtualizationDisabled() {
    return this.props.disableVirtualization || false;
  };

  _proto._isNestedWithSameOrientation = function _isNestedWithSameOrientation() {
    var nestedContext = this.context;
    return !!(nestedContext && !!nestedContext.horizontal === !!this.props.horizontal);
  };

  _proto.render = function render() {
    var _this3 = this;

    if (__DEV__) {
      var flatStyles = flattenStyle(this.props.contentContainerStyle);

      if (flatStyles != null && flatStyles.flexWrap === 'wrap') {
        console.warn('`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.' + 'Consider using `numColumns` with `FlatList` instead.');
      }
    }

    var _this$props7 = this.props,
        ListEmptyComponent = _this$props7.ListEmptyComponent,
        ListFooterComponent = _this$props7.ListFooterComponent,
        ListHeaderComponent = _this$props7.ListHeaderComponent;
    var _this$props8 = this.props,
        data = _this$props8.data,
        horizontal = _this$props8.horizontal;

    var isVirtualizationDisabled = this._isVirtualizationDisabled();

    var inversionStyle = this.props.inverted ? this.props.horizontal ? styles.horizontallyInverted : styles.verticallyInverted : null;
    var cells = [];
    var stickyIndicesFromProps = new Set(this.props.stickyHeaderIndices);
    var stickyHeaderIndices = [];

    if (ListHeaderComponent) {
      if (stickyIndicesFromProps.has(0)) {
        stickyHeaderIndices.push(0);
      }

      var element = /*#__PURE__*/React.isValidElement(ListHeaderComponent) ? ListHeaderComponent :
      /*#__PURE__*/
      // $FlowFixMe
      React.createElement(ListHeaderComponent, null);
      cells.push( /*#__PURE__*/React.createElement(_VirtualizedListContext.VirtualizedListCellContextProvider, {
        cellKey: this._getCellKey() + '-header',
        key: "$header"
      }, /*#__PURE__*/React.createElement(_View.default, {
        onLayout: this._onLayoutHeader,
        style: _StyleSheet.default.compose(inversionStyle, this.props.ListHeaderComponentStyle)
      }, // $FlowFixMe - Typing ReactNativeComponent revealed errors
      element)));
    }

    var itemCount = this.props.getItemCount(data);

    if (itemCount > 0) {
      _usedIndexForKey = false;
      _keylessItemComponentName = '';
      var spacerKey = !horizontal ? 'height' : 'width';
      var lastInitialIndex = this.props.initialScrollIndex ? -1 : this.props.initialNumToRender - 1;
      var _this$state = this.state,
          first = _this$state.first,
          last = _this$state.last;

      this._pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, 0, lastInitialIndex, inversionStyle);

      var firstAfterInitial = Math.max(lastInitialIndex + 1, first);

      if (!isVirtualizationDisabled && first > lastInitialIndex + 1) {
        var insertedStickySpacer = false;

        if (stickyIndicesFromProps.size > 0) {
          var stickyOffset = ListHeaderComponent ? 1 : 0; // See if there are any sticky headers in the virtualized space that we need to render.

          for (var ii = firstAfterInitial - 1; ii > lastInitialIndex; ii--) {
            if (stickyIndicesFromProps.has(ii + stickyOffset)) {
              var _ref2, _ref3;

              var initBlock = this._getFrameMetricsApprox(lastInitialIndex);

              var stickyBlock = this._getFrameMetricsApprox(ii);

              var leadSpace = stickyBlock.offset - initBlock.offset - (this.props.initialScrollIndex ? 0 : initBlock.length);
              cells.push(
              /*#__PURE__*/

              /* $FlowFixMe(>=0.111.0 site=react_native_fb) This comment
               * suppresses an error found when Flow v0.111 was deployed. To
               * see the error, delete this comment and run Flow. */
              React.createElement(_View.default, {
                key: "$sticky_lead",
                style: (_ref2 = {}, _ref2[spacerKey] = leadSpace, _ref2)
              }));

              this._pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, ii, ii, inversionStyle);

              var trailSpace = this._getFrameMetricsApprox(first).offset - (stickyBlock.offset + stickyBlock.length);
              cells.push(
              /*#__PURE__*/

              /* $FlowFixMe(>=0.111.0 site=react_native_fb) This comment
               * suppresses an error found when Flow v0.111 was deployed. To
               * see the error, delete this comment and run Flow. */
              React.createElement(_View.default, {
                key: "$sticky_trail",
                style: (_ref3 = {}, _ref3[spacerKey] = trailSpace, _ref3)
              }));
              insertedStickySpacer = true;
              break;
            }
          }
        }

        if (!insertedStickySpacer) {
          var _ref4;

          var _initBlock = this._getFrameMetricsApprox(lastInitialIndex);

          var firstSpace = this._getFrameMetricsApprox(first).offset - (_initBlock.offset + _initBlock.length);

          cells.push(
          /*#__PURE__*/

          /* $FlowFixMe(>=0.111.0 site=react_native_fb) This comment
           * suppresses an error found when Flow v0.111 was deployed. To see
           * the error, delete this comment and run Flow. */
          React.createElement(_View.default, {
            key: "$lead_spacer",
            style: (_ref4 = {}, _ref4[spacerKey] = firstSpace, _ref4)
          }));
        }
      }

      this._pushCells(cells, stickyHeaderIndices, stickyIndicesFromProps, firstAfterInitial, last, inversionStyle);

      if (!this._hasWarned.keys && _usedIndexForKey) {
        console.warn('VirtualizedList: missing keys for items, make sure to specify a key or id property on each ' + 'item or provide a custom keyExtractor.', _keylessItemComponentName);
        this._hasWarned.keys = true;
      }

      if (!isVirtualizationDisabled && last < itemCount - 1) {
        var _ref5;

        var lastFrame = this._getFrameMetricsApprox(last); // Without getItemLayout, we limit our tail spacer to the _highestMeasuredFrameIndex to
        // prevent the user for hyperscrolling into un-measured area because otherwise content will
        // likely jump around as it renders in above the viewport.


        var end = this.props.getItemLayout ? itemCount - 1 : Math.min(itemCount - 1, this._highestMeasuredFrameIndex);

        var endFrame = this._getFrameMetricsApprox(end);

        var tailSpacerLength = endFrame.offset + endFrame.length - (lastFrame.offset + lastFrame.length);
        cells.push(
        /*#__PURE__*/

        /* $FlowFixMe(>=0.111.0 site=react_native_fb) This comment suppresses
         * an error found when Flow v0.111 was deployed. To see the error,
         * delete this comment and run Flow. */
        React.createElement(_View.default, {
          key: "$tail_spacer",
          style: (_ref5 = {}, _ref5[spacerKey] = tailSpacerLength, _ref5)
        }));
      }
    } else if (ListEmptyComponent) {
      var _element = /*#__PURE__*/React.isValidElement(ListEmptyComponent) ? ListEmptyComponent :
      /*#__PURE__*/
      // $FlowFixMe
      React.createElement(ListEmptyComponent, null);

      cells.push( /*#__PURE__*/React.cloneElement(_element, {
        key: '$empty',
        onLayout: function onLayout(event) {
          _this3._onLayoutEmpty(event);

          if (_element.props.onLayout) {
            _element.props.onLayout(event);
          }
        },
        style: _StyleSheet.default.compose(inversionStyle, _element.props.style)
      }));
    }

    if (ListFooterComponent) {
      var _element2 = /*#__PURE__*/React.isValidElement(ListFooterComponent) ? ListFooterComponent :
      /*#__PURE__*/
      // $FlowFixMe
      React.createElement(ListFooterComponent, null);

      cells.push( /*#__PURE__*/React.createElement(_VirtualizedListContext.VirtualizedListCellContextProvider, {
        cellKey: this._getFooterCellKey(),
        key: "$footer"
      }, /*#__PURE__*/React.createElement(_View.default, {
        onLayout: this._onLayoutFooter,
        style: _StyleSheet.default.compose(inversionStyle, this.props.ListFooterComponentStyle)
      }, // $FlowFixMe - Typing ReactNativeComponent revealed errors
      _element2)));
    }

    var scrollProps = _objectSpread(_objectSpread({}, this.props), {}, {
      onContentSizeChange: this._onContentSizeChange,
      onLayout: this._onLayout,
      onScroll: this._onScroll,
      onScrollBeginDrag: this._onScrollBeginDrag,
      onScrollEndDrag: this._onScrollEndDrag,
      onMomentumScrollBegin: this._onMomentumScrollBegin,
      onMomentumScrollEnd: this._onMomentumScrollEnd,
      scrollEventThrottle: this.props.scrollEventThrottle,
      // TODO: Android support
      stickyHeaderIndices: stickyHeaderIndices,
      style: inversionStyle ? [inversionStyle, this.props.style] : this.props.style
    });

    this._hasMore = this.state.last < this.props.getItemCount(this.props.data) - 1;
    var innerRet = /*#__PURE__*/React.createElement(_VirtualizedListContext.VirtualizedListContextProvider, {
      value: {
        cellKey: null,
        getScrollMetrics: this._getScrollMetrics,
        horizontal: this.props.horizontal,
        getOutermostParentListRef: this._getOutermostParentListRef,
        getNestedChildState: this._getNestedChildState,
        registerAsNestedChild: this._registerAsNestedChild,
        unregisterAsNestedChild: this._unregisterAsNestedChild,
        debugInfo: this._getDebugInfo()
      }
    }, /*#__PURE__*/React.cloneElement((this.props.renderScrollComponent || this._defaultRenderScrollComponent)(scrollProps), {
      ref: this._captureScrollRef
    }, cells));
    var ret = innerRet;

    if (this.props.debug) {
      return /*#__PURE__*/React.createElement(_View.default, {
        style: styles.debug
      }, ret, this._renderDebugOverlay());
    } else {
      return ret;
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props9 = this.props,
        data = _this$props9.data,
        extraData = _this$props9.extraData;

    if (data !== prevProps.data || extraData !== prevProps.extraData) {
      // clear the viewableIndices cache to also trigger
      // the onViewableItemsChanged callback with the new data
      this._viewabilityTuples.forEach(function (tuple) {
        tuple.viewabilityHelper.resetViewableIndices();
      });
    } // The `this._hiPriInProgress` is guaranteeing a hiPri cell update will only happen
    // once per fiber update. The `_scheduleCellsToRenderUpdate` will set it to true
    // if a hiPri update needs to perform. If `componentDidUpdate` is triggered with
    // `this._hiPriInProgress=true`, means it's triggered by the hiPri update. The
    // `_scheduleCellsToRenderUpdate` will check this condition and not perform
    // another hiPri update.


    var hiPriInProgress = this._hiPriInProgress;

    this._scheduleCellsToRenderUpdate(); // Make sure setting `this._hiPriInProgress` back to false after `componentDidUpdate`
    // is triggered with `this._hiPriInProgress = true`


    if (hiPriInProgress) {
      this._hiPriInProgress = false;
    }
  };

  _proto._computeBlankness = function _computeBlankness() {
    this._fillRateHelper.computeBlankness(this.props, this.state, this._scrollMetrics);
  };

  _proto._onCellLayout = function _onCellLayout(e, cellKey, index) {
    var layout = e.nativeEvent.layout;
    var next = {
      offset: this._selectOffset(layout),
      length: this._selectLength(layout),
      index: index,
      inLayout: true
    };
    var curr = this._frames[cellKey];

    if (!curr || next.offset !== curr.offset || next.length !== curr.length || index !== curr.index) {
      this._totalCellLength += next.length - (curr ? curr.length : 0);
      this._totalCellsMeasured += curr ? 0 : 1;
      this._averageCellLength = this._totalCellLength / this._totalCellsMeasured;
      this._frames[cellKey] = next;
      this._highestMeasuredFrameIndex = Math.max(this._highestMeasuredFrameIndex, index);

      this._scheduleCellsToRenderUpdate();
    } else {
      this._frames[cellKey].inLayout = true;
    }

    this._triggerRemeasureForChildListsInCell(cellKey);

    this._computeBlankness();

    this._updateViewableItems(this.props.data);
  };

  _proto._triggerRemeasureForChildListsInCell = function _triggerRemeasureForChildListsInCell(cellKey) {
    var childListKeys = this._cellKeysToChildListKeys.get(cellKey);

    if (childListKeys) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(childListKeys), _step2; !(_step2 = _iterator2()).done;) {
        var childKey = _step2.value;

        var childList = this._nestedChildLists.get(childKey);

        childList && childList.ref && childList.ref.measureLayoutRelativeToContainingList();
      }
    }
  };

  _proto.measureLayoutRelativeToContainingList = function measureLayoutRelativeToContainingList() {
    var _this4 = this;

    // TODO (T35574538): findNodeHandle sometimes crashes with "Unable to find
    // node on an unmounted component" during scrolling
    try {
      if (!this._scrollRef) {
        return;
      } // We are assuming that getOutermostParentListRef().getScrollRef()
      // is a non-null reference to a ScrollView


      this._scrollRef.measureLayout(this.context.getOutermostParentListRef().getScrollRef(), function (x, y, width, height) {
        _this4._offsetFromParentVirtualizedList = _this4._selectOffset({
          x: x,
          y: y
        });
        _this4._scrollMetrics.contentLength = _this4._selectLength({
          width: width,
          height: height
        });

        var scrollMetrics = _this4._convertParentScrollMetrics(_this4.context.getScrollMetrics());

        _this4._scrollMetrics.visibleLength = scrollMetrics.visibleLength;
        _this4._scrollMetrics.offset = scrollMetrics.offset;
      }, function (error) {
        console.warn("VirtualizedList: Encountered an error while measuring a list's" + ' offset from its containing VirtualizedList.');
      });
    } catch (error) {
      console.warn('measureLayoutRelativeToContainingList threw an error', error.stack);
    }
  };

  _proto._getFooterCellKey = function _getFooterCellKey() {
    return this._getCellKey() + '-footer';
  };

  _proto._renderDebugOverlay = function _renderDebugOverlay() {
    var normalize = this._scrollMetrics.visibleLength / (this._scrollMetrics.contentLength || 1);
    var framesInLayout = [];
    var itemCount = this.props.getItemCount(this.props.data);

    for (var ii = 0; ii < itemCount; ii++) {
      var frame = this._getFrameMetricsApprox(ii);
      /* $FlowFixMe(>=0.68.0 site=react_native_fb) This comment suppresses an
       * error found when Flow v0.68 was deployed. To see the error delete this
       * comment and run Flow. */


      if (frame.inLayout) {
        framesInLayout.push(frame);
      }
    }

    var windowTop = this._getFrameMetricsApprox(this.state.first).offset;

    var frameLast = this._getFrameMetricsApprox(this.state.last);

    var windowLen = frameLast.offset + frameLast.length - windowTop;
    var visTop = this._scrollMetrics.offset;
    var visLen = this._scrollMetrics.visibleLength;
    return /*#__PURE__*/React.createElement(_View.default, {
      style: [styles.debugOverlayBase, styles.debugOverlay]
    }, framesInLayout.map(function (f, ii) {
      return /*#__PURE__*/React.createElement(_View.default, {
        key: 'f' + ii,
        style: [styles.debugOverlayBase, styles.debugOverlayFrame, {
          top: f.offset * normalize,
          height: f.length * normalize
        }]
      });
    }), /*#__PURE__*/React.createElement(_View.default, {
      style: [styles.debugOverlayBase, styles.debugOverlayFrameLast, {
        top: windowTop * normalize,
        height: windowLen * normalize
      }]
    }), /*#__PURE__*/React.createElement(_View.default, {
      style: [styles.debugOverlayBase, styles.debugOverlayFrameVis, {
        top: visTop * normalize,
        height: visLen * normalize
      }]
    }));
  };

  _proto._selectLength = function _selectLength(metrics) {
    return !this.props.horizontal ? metrics.height : metrics.width;
  };

  _proto._selectOffset = function _selectOffset(metrics) {
    return !this.props.horizontal ? metrics.y : metrics.x;
  };

  _proto._maybeCallOnEndReached = function _maybeCallOnEndReached() {
    var _this$props10 = this.props,
        data = _this$props10.data,
        getItemCount = _this$props10.getItemCount,
        onEndReached = _this$props10.onEndReached,
        onEndReachedThreshold = _this$props10.onEndReachedThreshold;
    var _this$_scrollMetrics2 = this._scrollMetrics,
        contentLength = _this$_scrollMetrics2.contentLength,
        visibleLength = _this$_scrollMetrics2.visibleLength,
        offset = _this$_scrollMetrics2.offset;
    var distanceFromEnd = contentLength - visibleLength - offset;
    var threshold = onEndReachedThreshold ? onEndReachedThreshold * visibleLength : 2;

    if (onEndReached && this.state.last === getItemCount(data) - 1 && distanceFromEnd < threshold && this._scrollMetrics.contentLength !== this._sentEndForContentLength) {
      // Only call onEndReached once for a given content length
      this._sentEndForContentLength = this._scrollMetrics.contentLength;
      onEndReached({
        distanceFromEnd: distanceFromEnd
      });
    } else if (distanceFromEnd > threshold) {
      // If the user scrolls away from the end and back again cause
      // an onEndReached to be triggered again
      this._sentEndForContentLength = 0;
    }
  };

  _proto._scheduleCellsToRenderUpdate = function _scheduleCellsToRenderUpdate() {
    var _this$state2 = this.state,
        first = _this$state2.first,
        last = _this$state2.last;
    var _this$_scrollMetrics3 = this._scrollMetrics,
        offset = _this$_scrollMetrics3.offset,
        visibleLength = _this$_scrollMetrics3.visibleLength,
        velocity = _this$_scrollMetrics3.velocity;
    var itemCount = this.props.getItemCount(this.props.data);
    var hiPri = false;
    var scrollingThreshold =
    /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses an
     * error found when Flow v0.63 was deployed. To see the error delete
     * this comment and run Flow. */
    this.props.onEndReachedThreshold * visibleLength / 2; // Mark as high priority if we're close to the start of the first item
    // But only if there are items before the first rendered item

    if (first > 0) {
      var distTop = offset - this._getFrameMetricsApprox(first).offset;

      hiPri = hiPri || distTop < 0 || velocity < -2 && distTop < scrollingThreshold;
    } // Mark as high priority if we're close to the end of the last item
    // But only if there are items after the last rendered item


    if (last < itemCount - 1) {
      var distBottom = this._getFrameMetricsApprox(last).offset - (offset + visibleLength);
      hiPri = hiPri || distBottom < 0 || velocity > 2 && distBottom < scrollingThreshold;
    } // Only trigger high-priority updates if we've actually rendered cells,
    // and with that size estimate, accurately compute how many cells we should render.
    // Otherwise, it would just render as many cells as it can (of zero dimension),
    // each time through attempting to render more (limited by maxToRenderPerBatch),
    // starving the renderer from actually laying out the objects and computing _averageCellLength.
    // If this is triggered in an `componentDidUpdate` followed by a hiPri cellToRenderUpdate
    // We shouldn't do another hipri cellToRenderUpdate


    if (hiPri && (this._averageCellLength || this.props.getItemLayout) && !this._hiPriInProgress) {
      this._hiPriInProgress = true; // Don't worry about interactions when scrolling quickly; focus on filling content as fast
      // as possible.

      this._updateCellsToRenderBatcher.dispose({
        abort: true
      });

      this._updateCellsToRender();

      return;
    } else {
      this._updateCellsToRenderBatcher.schedule();
    }
  };

  _proto._updateViewableItems = function _updateViewableItems(data) {
    var _this5 = this;

    var getItemCount = this.props.getItemCount;

    this._viewabilityTuples.forEach(function (tuple) {
      tuple.viewabilityHelper.onUpdate(getItemCount(data), _this5._scrollMetrics.offset, _this5._scrollMetrics.visibleLength, _this5._getFrameMetrics, _this5._createViewToken, tuple.onViewableItemsChanged, _this5.state);
    });
  };

  return VirtualizedList;
}(React.PureComponent);

VirtualizedList.contextType = _VirtualizedListContext.VirtualizedListContext;
VirtualizedList.defaultProps = {
  disableVirtualization: false,
  horizontal: false,
  initialNumToRender: 10,
  keyExtractor: function keyExtractor(item, index) {
    if (item.key != null) {
      return item.key;
    }

    if (item.id != null) {
      return item.id;
    }

    _usedIndexForKey = true;

    if (item.type && item.type.displayName) {
      _keylessItemComponentName = item.type.displayName;
    }

    return String(index);
  },
  maxToRenderPerBatch: 10,
  onEndReachedThreshold: 2,
  // multiples of length
  scrollEventThrottle: 50,
  updateCellsBatchingPeriod: 50,
  windowSize: 21 // multiples of length

};

var CellRenderer = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(CellRenderer, _React$Component);

  function CellRenderer() {
    var _this6;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this6 = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this6.state = {
      separatorProps: {
        highlighted: false,
        leadingItem: _this6.props.item
      }
    };
    _this6._separators = {
      highlight: function highlight() {
        var _this6$props = _this6.props,
            cellKey = _this6$props.cellKey,
            prevCellKey = _this6$props.prevCellKey;

        _this6.props.onUpdateSeparators([cellKey, prevCellKey], {
          highlighted: true
        });
      },
      unhighlight: function unhighlight() {
        var _this6$props2 = _this6.props,
            cellKey = _this6$props2.cellKey,
            prevCellKey = _this6$props2.prevCellKey;

        _this6.props.onUpdateSeparators([cellKey, prevCellKey], {
          highlighted: false
        });
      },
      updateProps: function updateProps(select, newProps) {
        var _this6$props3 = _this6.props,
            cellKey = _this6$props3.cellKey,
            prevCellKey = _this6$props3.prevCellKey;

        _this6.props.onUpdateSeparators([select === 'leading' ? prevCellKey : cellKey], newProps);
      }
    };
    return _this6;
  }

  CellRenderer.getDerivedStateFromProps = function getDerivedStateFromProps(props, prevState) {
    return {
      separatorProps: _objectSpread(_objectSpread({}, prevState.separatorProps), {}, {
        leadingItem: props.item
      })
    };
  } // TODO: consider factoring separator stuff out of VirtualizedList into FlatList since it's not
  // reused by SectionList and we can keep VirtualizedList simpler.
  ;

  var _proto2 = CellRenderer.prototype;

  _proto2.updateSeparatorProps = function updateSeparatorProps(newProps) {
    this.setState(function (state) {
      return {
        separatorProps: _objectSpread(_objectSpread({}, state.separatorProps), newProps)
      };
    });
  };

  _proto2.componentWillUnmount = function componentWillUnmount() {
    this.props.onUnmount(this.props.cellKey);
  };

  _proto2._renderElement = function _renderElement(renderItem, ListItemComponent, item, index) {
    if (renderItem && ListItemComponent) {
      console.warn('VirtualizedList: Both ListItemComponent and renderItem props are present. ListItemComponent will take' + ' precedence over renderItem.');
    }

    if (ListItemComponent) {
      /* $FlowFixMe(>=0.108.0 site=react_native_fb) This comment suppresses an
       * error found when Flow v0.108 was deployed. To see the error, delete
       * this comment and run Flow. */
      return /*#__PURE__*/React.createElement(ListItemComponent, {
        item: item,
        index: index,
        separators: this._separators
      });
    }

    if (renderItem) {
      return renderItem({
        item: item,
        index: index,
        separators: this._separators
      });
    }

    (0, _invariant.default)(false, 'VirtualizedList: Either ListItemComponent or renderItem props are required but none were found.');
  };

  _proto2.render = function render() {
    var _this$props11 = this.props,
        CellRendererComponent = _this$props11.CellRendererComponent,
        ItemSeparatorComponent = _this$props11.ItemSeparatorComponent,
        fillRateHelper = _this$props11.fillRateHelper,
        horizontal = _this$props11.horizontal,
        item = _this$props11.item,
        index = _this$props11.index,
        inversionStyle = _this$props11.inversionStyle,
        parentProps = _this$props11.parentProps;
    var renderItem = parentProps.renderItem,
        getItemLayout = parentProps.getItemLayout,
        ListItemComponent = parentProps.ListItemComponent;

    var element = this._renderElement(renderItem, ListItemComponent, item, index);

    var onLayout =
    /* $FlowFixMe(>=0.68.0 site=react_native_fb) This comment suppresses an
     * error found when Flow v0.68 was deployed. To see the error delete this
     * comment and run Flow. */
    getItemLayout && !parentProps.debug && !fillRateHelper.enabled() ? undefined : this.props.onLayout; // NOTE: that when this is a sticky header, `onLayout` will get automatically extracted and
    // called explicitly by `ScrollViewStickyHeader`.

    var itemSeparator = ItemSeparatorComponent && /*#__PURE__*/React.createElement(ItemSeparatorComponent, this.state.separatorProps);
    var cellStyle = inversionStyle ? horizontal ? [styles.rowReverse, inversionStyle] : [styles.columnReverse, inversionStyle] : horizontal ? [styles.row, inversionStyle] : inversionStyle;
    var result = !CellRendererComponent ?
    /*#__PURE__*/

    /* $FlowFixMe(>=0.89.0 site=react_native_fb) This comment suppresses an
     * error found when Flow v0.89 was deployed. To see the error, delete
     * this comment and run Flow. */
    React.createElement(_View.default, {
      style: cellStyle,
      onLayout: onLayout
    }, element, itemSeparator) : /*#__PURE__*/React.createElement(CellRendererComponent, _extends({}, this.props, {
      style: cellStyle,
      onLayout: onLayout
    }), element, itemSeparator);
    return /*#__PURE__*/React.createElement(_VirtualizedListContext.VirtualizedListCellContextProvider, {
      cellKey: this.props.cellKey
    }, result);
  };

  return CellRenderer;
}(React.Component);

function describeNestedLists(childList) {
  var trace = 'VirtualizedList trace:\n' + ("  Child (" + (childList.horizontal ? 'horizontal' : 'vertical') + "):\n") + ("    listKey: " + childList.key + "\n") + ("    cellKey: " + childList.cellKey);
  var debugInfo = childList.parentDebugInfo;

  while (debugInfo) {
    trace += "\n  Parent (" + (debugInfo.horizontal ? 'horizontal' : 'vertical') + "):\n" + ("    listKey: " + debugInfo.listKey + "\n") + ("    cellKey: " + debugInfo.cellKey);
    debugInfo = debugInfo.parent;
  }

  return trace;
}

var styles = _StyleSheet.default.create({
  verticallyInverted: {
    transform: [{
      scaleY: -1
    }]
  },
  horizontallyInverted: {
    transform: [{
      scaleX: -1
    }]
  },
  row: {
    flexDirection: 'row'
  },
  rowReverse: {
    flexDirection: 'row-reverse'
  },
  columnReverse: {
    flexDirection: 'column-reverse'
  },
  debug: {
    flex: 1
  },
  debugOverlayBase: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  debugOverlay: {
    bottom: 0,
    width: 20,
    borderColor: 'blue',
    borderWidth: 1
  },
  debugOverlayFrame: {
    left: 0,
    backgroundColor: 'orange'
  },
  debugOverlayFrameLast: {
    left: 0,
    borderColor: 'green',
    borderWidth: 2
  },
  debugOverlayFrameVis: {
    left: 0,
    borderColor: 'red',
    borderWidth: 2
  }
});

var _default = VirtualizedList;
exports.default = _default;
module.exports = exports.default;