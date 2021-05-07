function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import UIManager from '../../exports/UIManager';
import createDOMProps from '../createDOMProps';
import useStable from '../useStable';
import { useRef } from 'react';
var emptyObject = {};

function setNativeProps(node, nativeProps, classList, pointerEvents, style, previousStyleRef) {
  if (node != null && nativeProps) {
    var domProps = createDOMProps(null, _objectSpread(_objectSpread({
      pointerEvents: pointerEvents
    }, nativeProps), {}, {
      classList: [classList, nativeProps.className],
      style: [style, nativeProps.style]
    }));
    var nextDomStyle = domProps.style;

    if (previousStyleRef.current != null) {
      if (domProps.style == null) {
        domProps.style = {};
      }

      for (var styleName in previousStyleRef.current) {
        if (domProps.style[styleName] == null) {
          domProps.style[styleName] = '';
        }
      }
    }

    previousStyleRef.current = nextDomStyle;
    UIManager.updateView(node, domProps);
  }
}
/**
 * Adds non-standard methods to the hode element. This is temporarily until an
 * API like `ReactNative.measure(hostRef, callback)` is added to React Native.
 */


export default function usePlatformMethods(_ref) {
  var classList = _ref.classList,
      pointerEvents = _ref.pointerEvents,
      style = _ref.style;
  var previousStyleRef = useRef(null);
  var setNativePropsArgsRef = useRef(null);
  setNativePropsArgsRef.current = {
    classList: classList,
    pointerEvents: pointerEvents,
    style: style
  }; // Avoid creating a new ref on every render. The props only need to be
  // available to 'setNativeProps' when it is called.

  var ref = useStable(function () {
    return function (hostNode) {
      if (hostNode != null) {
        hostNode.measure = function (callback) {
          return UIManager.measure(hostNode, callback);
        };

        hostNode.measureLayout = function (relativeToNode, success, failure) {
          return UIManager.measureLayout(hostNode, relativeToNode, failure, success);
        };

        hostNode.measureInWindow = function (callback) {
          return UIManager.measureInWindow(hostNode, callback);
        };

        hostNode.setNativeProps = function (nativeProps) {
          var _ref2 = setNativePropsArgsRef.current || emptyObject,
              classList = _ref2.classList,
              style = _ref2.style,
              pointerEvents = _ref2.pointerEvents;

          setNativeProps(hostNode, nativeProps, classList, pointerEvents, style, previousStyleRef);
        };
      }
    };
  });
  return ref;
}