function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
import deepDiffer from '../deepDiffer';
import * as React from 'react';
import StyleSheet from '../../../exports/StyleSheet';
import View from '../../../exports/View';
import ScrollView from '../../../exports/ScrollView';
import VirtualizedList from '../VirtualizedList';
import invariant from 'fbjs/lib/invariant';

var defaultProps = _objectSpread(_objectSpread({}, VirtualizedList.defaultProps), {}, {
  numColumns: 1
});

/**
 * A performant interface for rendering simple, flat lists, supporting the most handy features:
 *
 *  - Fully cross-platform.
 *  - Optional horizontal mode.
 *  - Configurable viewability callbacks.
 *  - Header support.
 *  - Footer support.
 *  - Separator support.
 *  - Pull to Refresh.
 *  - Scroll loading.
 *  - ScrollToIndex support.
 *
 * If you need section support, use [`<SectionList>`](docs/sectionlist.html).
 *
 * Minimal Example:
 *
 *     <FlatList
 *       data={[{key: 'a'}, {key: 'b'}]}
 *       renderItem={({item}) => <Text>{item.key}</Text>}
 *     />
 *
 * More complex, multi-select example demonstrating `PureComponent` usage for perf optimization and avoiding bugs.
 *
 * - By binding the `onPressItem` handler, the props will remain `===` and `PureComponent` will
 *   prevent wasteful re-renders unless the actual `id`, `selected`, or `title` props change, even
 *   if the components rendered in `MyListItem` did not have such optimizations.
 * - By passing `extraData={this.state}` to `FlatList` we make sure `FlatList` itself will re-render
 *   when the `state.selected` changes. Without setting this prop, `FlatList` would not know it
 *   needs to re-render any items because it is also a `PureComponent` and the prop comparison will
 *   not show any changes.
 * - `keyExtractor` tells the list to use the `id`s for the react keys instead of the default `key` property.
 *
 *
 *     class MyListItem extends React.PureComponent {
 *       _onPress = () => {
 *         this.props.onPressItem(this.props.id);
 *       };
 *
 *       render() {
 *         const textColor = this.props.selected ? "red" : "black";
 *         return (
 *           <TouchableOpacity onPress={this._onPress}>
 *             <View>
 *               <Text style={{ color: textColor }}>
 *                 {this.props.title}
 *               </Text>
 *             </View>
 *           </TouchableOpacity>
 *         );
 *       }
 *     }
 *
 *     class MultiSelectList extends React.PureComponent {
 *       state = {selected: (new Map(): Map<string, boolean>)};
 *
 *       _keyExtractor = (item, index) => item.id;
 *
 *       _onPressItem = (id: string) => {
 *         // updater functions are preferred for transactional updates
 *         this.setState((state) => {
 *           // copy the map rather than modifying state.
 *           const selected = new Map(state.selected);
 *           selected.set(id, !selected.get(id)); // toggle
 *           return {selected};
 *         });
 *       };
 *
 *       _renderItem = ({item}) => (
 *         <MyListItem
 *           id={item.id}
 *           onPressItem={this._onPressItem}
 *           selected={!!this.state.selected.get(item.id)}
 *           title={item.title}
 *         />
 *       );
 *
 *       render() {
 *         return (
 *           <FlatList
 *             data={this.props.data}
 *             extraData={this.state}
 *             keyExtractor={this._keyExtractor}
 *             renderItem={this._renderItem}
 *           />
 *         );
 *       }
 *     }
 *
 * This is a convenience wrapper around [`<VirtualizedList>`](docs/virtualizedlist.html),
 * and thus inherits its props (as well as those of `ScrollView`) that aren't explicitly listed
 * here, along with the following caveats:
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
 * - By default, the list looks for a `key` prop on each item and uses that for the React key.
 *   Alternatively, you can provide a custom `keyExtractor` prop.
 *
 * Also inherits [ScrollView Props](docs/scrollview.html#props), unless it is nested in another FlatList of same orientation.
 */
var FlatList = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(FlatList, _React$PureComponent);

  var _proto = FlatList.prototype;

  /**
   * Scrolls to the end of the content. May be janky without `getItemLayout` prop.
   */
  _proto.scrollToEnd = function scrollToEnd(params) {
    if (this._listRef) {
      this._listRef.scrollToEnd(params);
    }
  }
  /**
   * Scrolls to the item at the specified index such that it is positioned in the viewable area
   * such that `viewPosition` 0 places it at the top, 1 at the bottom, and 0.5 centered in the
   * middle. `viewOffset` is a fixed number of pixels to offset the final target position.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */
  ;

  _proto.scrollToIndex = function scrollToIndex(params) {
    if (this._listRef) {
      this._listRef.scrollToIndex(params);
    }
  }
  /**
   * Requires linear scan through data - use `scrollToIndex` instead if possible.
   *
   * Note: cannot scroll to locations outside the render window without specifying the
   * `getItemLayout` prop.
   */
  ;

  _proto.scrollToItem = function scrollToItem(params) {
    if (this._listRef) {
      this._listRef.scrollToItem(params);
    }
  }
  /**
   * Scroll to a specific content pixel offset in the list.
   *
   * Check out [scrollToOffset](docs/virtualizedlist.html#scrolltooffset) of VirtualizedList
   */
  ;

  _proto.scrollToOffset = function scrollToOffset(params) {
    if (this._listRef) {
      this._listRef.scrollToOffset(params);
    }
  }
  /**
   * Tells the list an interaction has occurred, which should trigger viewability calculations, e.g.
   * if `waitForInteractions` is true and the user has not scrolled. This is typically called by
   * taps on items or by navigation actions.
   */
  ;

  _proto.recordInteraction = function recordInteraction() {
    if (this._listRef) {
      this._listRef.recordInteraction();
    }
  }
  /**
   * Displays the scroll indicators momentarily.
   *
   * @platform ios
   */
  ;

  _proto.flashScrollIndicators = function flashScrollIndicators() {
    if (this._listRef) {
      this._listRef.flashScrollIndicators();
    }
  }
  /**
   * Provides a handle to the underlying scroll responder.
   */
  ;

  _proto.getScrollResponder = function getScrollResponder() {
    if (this._listRef) {
      return this._listRef.getScrollResponder();
    }
  }
  /**
   * Provides a reference to the underlying host component
   */
  ;

  _proto.getNativeScrollRef = function getNativeScrollRef() {
    if (this._listRef) {
      /* $FlowFixMe[incompatible-return] Suppresses errors found when fixing
       * TextInput typing */
      return this._listRef.getScrollRef();
    }
  };

  _proto.getScrollableNode = function getScrollableNode() {
    if (this._listRef) {
      return this._listRef.getScrollableNode();
    }
  };

  _proto.setNativeProps = function setNativeProps(props) {
    if (this._listRef) {
      this._listRef.setNativeProps(props);
    }
  };

  function FlatList(_props) {
    var _this;

    _this = _React$PureComponent.call(this, _props) || this;
    _this._virtualizedListPairs = [];

    _this._captureRef = function (ref) {
      _this._listRef = ref;
    };

    _this._getItem = function (data, index) {
      var numColumns = _this.props.numColumns;

      if (numColumns > 1) {
        var ret = [];

        for (var kk = 0; kk < numColumns; kk++) {
          var _item = data[index * numColumns + kk];

          if (_item != null) {
            ret.push(_item);
          }
        }

        return ret;
      } else {
        return data[index];
      }
    };

    _this._getItemCount = function (data) {
      if (data) {
        var numColumns = _this.props.numColumns;
        return numColumns > 1 ? Math.ceil(data.length / numColumns) : data.length;
      } else {
        return 0;
      }
    };

    _this._keyExtractor = function (items, index) {
      var _this$props = _this.props,
          keyExtractor = _this$props.keyExtractor,
          numColumns = _this$props.numColumns;

      if (numColumns > 1) {
        invariant(Array.isArray(items), 'FlatList: Encountered internal consistency error, expected each item to consist of an ' + 'array with 1-%s columns; instead, received a single item.', numColumns);
        return items // $FlowFixMe[incompatible-call]
        .map(function (it, kk) {
          return keyExtractor(it, index * numColumns + kk);
        }).join(':');
      } else {
        // $FlowFixMe Can't call keyExtractor with an array
        return keyExtractor(items, index);
      }
    };

    _this._renderer = function () {
      var _ref;

      var _this$props2 = _this.props,
          ListItemComponent = _this$props2.ListItemComponent,
          renderItem = _this$props2.renderItem,
          numColumns = _this$props2.numColumns,
          columnWrapperStyle = _this$props2.columnWrapperStyle;
      var virtualizedListRenderKey = ListItemComponent ? 'ListItemComponent' : 'renderItem';

      var renderer = function renderer(props) {
        if (ListItemComponent) {
          // $FlowFixMe Component isn't valid
          return /*#__PURE__*/React.createElement(ListItemComponent, props);
        } else if (renderItem) {
          // $FlowFixMe[incompatible-call]
          return renderItem(props);
        } else {
          return null;
        }
      };

      return _ref = {}, _ref[virtualizedListRenderKey] = function (info) {
        if (numColumns > 1) {
          var _item2 = info.item,
              _index = info.index;
          invariant(Array.isArray(_item2), 'Expected array of items with numColumns > 1');
          return /*#__PURE__*/React.createElement(View, {
            style: StyleSheet.compose(styles.row, columnWrapperStyle)
          }, _item2.map(function (it, kk) {
            var element = renderer({
              item: it,
              index: _index * numColumns + kk,
              separators: info.separators
            });
            return element != null ? /*#__PURE__*/React.createElement(React.Fragment, {
              key: kk
            }, element) : null;
          }));
        } else {
          return renderer(info);
        }
      }, _ref;
    };

    _this._checkProps(_this.props);

    if (_this.props.viewabilityConfigCallbackPairs) {
      _this._virtualizedListPairs = _this.props.viewabilityConfigCallbackPairs.map(function (pair) {
        return {
          viewabilityConfig: pair.viewabilityConfig,
          onViewableItemsChanged: _this._createOnViewableItemsChanged(pair.onViewableItemsChanged)
        };
      });
    } else if (_this.props.onViewableItemsChanged) {
      _this._virtualizedListPairs.push({
        /* $FlowFixMe(>=0.63.0 site=react_native_fb) This comment suppresses an
         * error found when Flow v0.63 was deployed. To see the error delete
         * this comment and run Flow. */
        viewabilityConfig: _this.props.viewabilityConfig,
        onViewableItemsChanged: _this._createOnViewableItemsChanged(_this.props.onViewableItemsChanged)
      });
    }

    return _this;
  }

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    invariant(prevProps.numColumns === this.props.numColumns, 'Changing numColumns on the fly is not supported. Change the key prop on FlatList when ' + 'changing the number of columns to force a fresh render of the component.');
    invariant(prevProps.onViewableItemsChanged === this.props.onViewableItemsChanged, 'Changing onViewableItemsChanged on the fly is not supported');
    invariant(!deepDiffer(prevProps.viewabilityConfig, this.props.viewabilityConfig), 'Changing viewabilityConfig on the fly is not supported');
    invariant(prevProps.viewabilityConfigCallbackPairs === this.props.viewabilityConfigCallbackPairs, 'Changing viewabilityConfigCallbackPairs on the fly is not supported');

    this._checkProps(this.props);
  };

  _proto._checkProps = function _checkProps(props) {
    var getItem = props.getItem,
        getItemCount = props.getItemCount,
        horizontal = props.horizontal,
        numColumns = props.numColumns,
        columnWrapperStyle = props.columnWrapperStyle,
        onViewableItemsChanged = props.onViewableItemsChanged,
        viewabilityConfigCallbackPairs = props.viewabilityConfigCallbackPairs;
    invariant(!getItem && !getItemCount, 'FlatList does not support custom data formats.');

    if (numColumns > 1) {
      invariant(!horizontal, 'numColumns does not support horizontal.');
    } else {
      invariant(!columnWrapperStyle, 'columnWrapperStyle not supported for single column lists');
    }

    invariant(!(onViewableItemsChanged && viewabilityConfigCallbackPairs), 'FlatList does not support setting both onViewableItemsChanged and ' + 'viewabilityConfigCallbackPairs.');
  };

  _proto._pushMultiColumnViewable = function _pushMultiColumnViewable(arr, v) {
    var _this$props3 = this.props,
        numColumns = _this$props3.numColumns,
        keyExtractor = _this$props3.keyExtractor;
    v.item.forEach(function (item, ii) {
      invariant(v.index != null, 'Missing index!');
      var index = v.index * numColumns + ii;
      arr.push(_objectSpread(_objectSpread({}, v), {}, {
        item: item,
        key: keyExtractor(item, index),
        index: index
      }));
    });
  };

  _proto._createOnViewableItemsChanged = function _createOnViewableItemsChanged(onViewableItemsChanged) {
    var _this2 = this;

    return function (info) {
      var numColumns = _this2.props.numColumns;

      if (onViewableItemsChanged) {
        if (numColumns > 1) {
          var changed = [];
          var viewableItems = [];
          info.viewableItems.forEach(function (v) {
            return _this2._pushMultiColumnViewable(viewableItems, v);
          });
          info.changed.forEach(function (v) {
            return _this2._pushMultiColumnViewable(changed, v);
          });
          onViewableItemsChanged({
            viewableItems: viewableItems,
            changed: changed
          });
        } else {
          onViewableItemsChanged(info);
        }
      }
    };
  };

  _proto.render = function render() {
    var _this$props4 = this.props,
        numColumns = _this$props4.numColumns,
        columnWrapperStyle = _this$props4.columnWrapperStyle,
        restProps = _objectWithoutPropertiesLoose(_this$props4, ["numColumns", "columnWrapperStyle"]);

    return /*#__PURE__*/React.createElement(VirtualizedList, _extends({}, restProps, {
      getItem: this._getItem,
      getItemCount: this._getItemCount,
      keyExtractor: this._keyExtractor,
      ref: this._captureRef,
      viewabilityConfigCallbackPairs: this._virtualizedListPairs
    }, this._renderer()));
  };

  return FlatList;
}(React.PureComponent);

FlatList.defaultProps = defaultProps;
var styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});
export default FlatList;