"use strict";

exports.__esModule = true;
exports.VirtualizedListContextResetter = VirtualizedListContextResetter;
exports.VirtualizedListContextProvider = VirtualizedListContextProvider;
exports.VirtualizedListCellContextProvider = VirtualizedListCellContextProvider;
exports.VirtualizedListContext = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __DEV__ = process.env.NODE_ENV !== 'production';

var VirtualizedListContext = /*#__PURE__*/React.createContext(null);
exports.VirtualizedListContext = VirtualizedListContext;

if (__DEV__) {
  VirtualizedListContext.displayName = 'VirtualizedListContext';
}
/**
 * Resets the context. Intended for use by portal-like components (e.g. Modal).
 */


function VirtualizedListContextResetter(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: null
  }, children);
}
/**
 * Sets the context with memoization. Intended to be used by `VirtualizedList`.
 */


function VirtualizedListContextProvider(_ref2) {
  var children = _ref2.children,
      value = _ref2.value;
  // Avoid setting a newly created context object if the values are identical.
  var context = (0, React.useMemo)(function () {
    return {
      cellKey: null,
      getScrollMetrics: value.getScrollMetrics,
      horizontal: value.horizontal,
      getOutermostParentListRef: value.getOutermostParentListRef,
      getNestedChildState: value.getNestedChildState,
      registerAsNestedChild: value.registerAsNestedChild,
      unregisterAsNestedChild: value.unregisterAsNestedChild,
      debugInfo: {
        cellKey: value.debugInfo.cellKey,
        horizontal: value.debugInfo.horizontal,
        listKey: value.debugInfo.listKey,
        parent: value.debugInfo.parent
      }
    };
  }, [value.getScrollMetrics, value.horizontal, value.getOutermostParentListRef, value.getNestedChildState, value.registerAsNestedChild, value.unregisterAsNestedChild, value.debugInfo.cellKey, value.debugInfo.horizontal, value.debugInfo.listKey, value.debugInfo.parent]);
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: context
  }, children);
}
/**
 * Sets the `cellKey`. Intended to be used by `VirtualizedList` for each cell.
 */


function VirtualizedListCellContextProvider(_ref3) {
  var cellKey = _ref3.cellKey,
      children = _ref3.children;
  var context = (0, React.useContext)(VirtualizedListContext);
  return /*#__PURE__*/React.createElement(VirtualizedListContext.Provider, {
    value: context == null ? null : _objectSpread(_objectSpread({}, context), {}, {
      cellKey: cellKey
    })
  }, children);
}