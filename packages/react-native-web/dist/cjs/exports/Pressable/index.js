/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _useMergeRefs = _interopRequireDefault(require("../../modules/useMergeRefs"));

var _useHover = _interopRequireDefault(require("../../modules/useHover"));

var _usePressEvents = _interopRequireDefault(require("../../modules/usePressEvents"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Component used to build display components that should respond to whether the
 * component is currently pressed or not.
 */
function Pressable(props, forwardedRef) {
  var children = props.children,
      delayLongPress = props.delayLongPress,
      delayPressIn = props.delayPressIn,
      delayPressOut = props.delayPressOut,
      disabled = props.disabled,
      focusable = props.focusable,
      onBlur = props.onBlur,
      onContextMenu = props.onContextMenu,
      onFocus = props.onFocus,
      onHoverIn = props.onHoverIn,
      onHoverOut = props.onHoverOut,
      onKeyDown = props.onKeyDown,
      onLongPress = props.onLongPress,
      onPress = props.onPress,
      onPressMove = props.onPressMove,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      style = props.style,
      testOnly_hovered = props.testOnly_hovered,
      testOnly_pressed = props.testOnly_pressed,
      rest = _objectWithoutPropertiesLoose(props, ["children", "delayLongPress", "delayPressIn", "delayPressOut", "disabled", "focusable", "onBlur", "onContextMenu", "onFocus", "onHoverIn", "onHoverOut", "onKeyDown", "onLongPress", "onPress", "onPressMove", "onPressIn", "onPressOut", "style", "testOnly_hovered", "testOnly_pressed"]);

  var _useForceableState = useForceableState(testOnly_hovered === true),
      hovered = _useForceableState[0],
      setHovered = _useForceableState[1];

  var _useForceableState2 = useForceableState(false),
      focused = _useForceableState2[0],
      setFocused = _useForceableState2[1];

  var _useForceableState3 = useForceableState(testOnly_pressed === true),
      pressed = _useForceableState3[0],
      setPressed = _useForceableState3[1];

  var hostRef = (0, React.useRef)(null);
  var setRef = (0, _useMergeRefs.default)(forwardedRef, hostRef);
  var pressConfig = (0, React.useMemo)(function () {
    return {
      delayLongPress: delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      disabled: disabled,
      onLongPress: onLongPress,
      onPress: onPress,
      onPressChange: setPressed,
      onPressStart: onPressIn,
      onPressMove: onPressMove,
      onPressEnd: onPressOut
    };
  }, [delayLongPress, delayPressIn, delayPressOut, disabled, onLongPress, onPress, onPressIn, onPressMove, onPressOut, setPressed]);
  var pressEventHandlers = (0, _usePressEvents.default)(hostRef, pressConfig);
  var onContextMenuPress = pressEventHandlers.onContextMenu,
      onKeyDownPress = pressEventHandlers.onKeyDown;
  (0, _useHover.default)(hostRef, {
    contain: true,
    disabled: disabled,
    onHoverChange: setHovered,
    onHoverStart: onHoverIn,
    onHoverEnd: onHoverOut
  });
  var interactionState = {
    hovered: hovered,
    focused: focused,
    pressed: pressed
  };
  var blurHandler = React.useCallback(function (e) {
    if (e.nativeEvent.target === hostRef.current) {
      setFocused(false);

      if (onBlur != null) {
        onBlur(e);
      }
    }
  }, [hostRef, setFocused, onBlur]);
  var focusHandler = React.useCallback(function (e) {
    if (e.nativeEvent.target === hostRef.current) {
      setFocused(true);

      if (onFocus != null) {
        onFocus(e);
      }
    }
  }, [hostRef, setFocused, onFocus]);
  var contextMenuHandler = React.useCallback(function (e) {
    if (onContextMenuPress != null) {
      onContextMenuPress(e);
    }

    if (onContextMenu != null) {
      onContextMenu(e);
    }
  }, [onContextMenu, onContextMenuPress]);
  var keyDownHandler = React.useCallback(function (e) {
    if (onKeyDownPress != null) {
      onKeyDownPress(e);
    }

    if (onKeyDown != null) {
      onKeyDown(e);
    }
  }, [onKeyDown, onKeyDownPress]);
  return /*#__PURE__*/React.createElement(_View.default, _extends({}, rest, pressEventHandlers, {
    accessibilityDisabled: disabled,
    focusable: !disabled && focusable !== false,
    onBlur: blurHandler,
    onContextMenu: contextMenuHandler,
    onFocus: focusHandler,
    onKeyDown: keyDownHandler,
    ref: setRef,
    style: [!disabled && styles.root, typeof style === 'function' ? style(interactionState) : style]
  }), typeof children === 'function' ? children(interactionState) : children);
}

function useForceableState(forced) {
  var _useState = (0, React.useState)(false),
      bool = _useState[0],
      setBool = _useState[1];

  return [bool || forced, setBool];
}

var styles = _StyleSheet.default.create({
  root: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});

var MemoedPressable = /*#__PURE__*/(0, React.memo)( /*#__PURE__*/(0, React.forwardRef)(Pressable));
MemoedPressable.displayName = 'Pressable';
var _default = MemoedPressable;
exports.default = _default;
module.exports = exports.default;