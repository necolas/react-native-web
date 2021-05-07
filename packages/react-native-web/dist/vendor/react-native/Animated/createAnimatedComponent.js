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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import View from '../../../exports/View';
import { AnimatedEvent } from './AnimatedEvent';
import AnimatedProps from './nodes/AnimatedProps';
import * as React from 'react';
import NativeAnimatedHelper from './NativeAnimatedHelper';
import invariant from 'fbjs/lib/invariant';
import setAndForwardRef from '../Utilities/setAndForwardRef';
var animatedComponentNextId = 1;

function createAnimatedComponent(Component, options) {
  invariant(typeof Component !== 'function' || Component.prototype && Component.prototype.isReactComponent, '`createAnimatedComponent` does not support stateless functional components; ' + 'use a class component instead.');

  var AnimatedComponent = /*#__PURE__*/function (_React$Component) {
    _inheritsLoose(AnimatedComponent, _React$Component);

    function AnimatedComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this._invokeAnimatedPropsCallbackOnMount = false;
      _this._eventDetachers = [];
      _this._animatedComponentId = animatedComponentNextId++ + ":animatedComponent";

      _this._isFabric = function () {
        var _this$_component$_int, _this$_component$_int2, _this$_component$getN, _this$_component$getN2, _this$_component$getS, _this$_component$getS2;

        // When called during the first render, `_component` is always null.
        // Therefore, even if a component is rendered in Fabric, we can't detect
        // that until ref is set, which happens sometime after the first render.
        // In cases where this value switching between "false" and "true" on Fabric
        // causes issues, add an additional check for _component nullity.
        if (_this._component == null) {
          return false;
        }

        return (// eslint-disable-next-line dot-notation
          ((_this$_component$_int = _this._component['_internalInstanceHandle']) == null ? void 0 : (_this$_component$_int2 = _this$_component$_int.stateNode) == null ? void 0 : _this$_component$_int2.canonical) != null || // Some components have a setNativeProps function but aren't a host component
          // such as lists like FlatList and SectionList. These should also use
          // forceUpdate in Fabric since setNativeProps doesn't exist on the underlying
          // host component. This crazy hack is essentially special casing those lists and
          // ScrollView itself to use forceUpdate in Fabric.
          // If these components end up using forwardRef then these hacks can go away
          // as this._component would actually be the underlying host component and the above check
          // would be sufficient.
          _this._component.getNativeScrollRef != null && _this._component.getNativeScrollRef() != null && // eslint-disable-next-line dot-notation
          ((_this$_component$getN = _this._component.getNativeScrollRef()['_internalInstanceHandle']) == null ? void 0 : (_this$_component$getN2 = _this$_component$getN.stateNode) == null ? void 0 : _this$_component$getN2.canonical) != null || _this._component.getScrollResponder != null && _this._component.getScrollResponder() != null && _this._component.getScrollResponder().getNativeScrollRef != null && _this._component.getScrollResponder().getNativeScrollRef() != null && ((_this$_component$getS = _this._component.getScrollResponder().getNativeScrollRef()[// eslint-disable-next-line dot-notation
          '_internalInstanceHandle']) == null ? void 0 : (_this$_component$getS2 = _this$_component$getS.stateNode) == null ? void 0 : _this$_component$getS2.canonical) != null
        );
      };

      _this._waitForUpdate = function () {
        if (_this._isFabric()) {
          NativeAnimatedHelper.API.setWaitingForIdentifier(_this._animatedComponentId);
        }
      };

      _this._markUpdateComplete = function () {
        if (_this._isFabric()) {
          NativeAnimatedHelper.API.unsetWaitingForIdentifier(_this._animatedComponentId);
        }
      };

      _this._animatedPropsCallback = function () {
        if (_this._component == null) {
          // AnimatedProps is created in will-mount because it's used in render.
          // But this callback may be invoked before mount in async mode,
          // In which case we should defer the setNativeProps() call.
          // React may throw away uncommitted work in async mode,
          // So a deferred call won't always be invoked.
          _this._invokeAnimatedPropsCallbackOnMount = true;
        } else if (process.env.NODE_ENV === 'test' || // For animating properties of non-leaf/non-native components
        typeof _this._component.setNativeProps !== 'function' || // In Fabric, force animations to go through forceUpdate and skip setNativeProps
        _this._isFabric()) {
          _this.forceUpdate();
        } else if (!_this._propsAnimated.__isNative) {
          _this._component.setNativeProps(_this._propsAnimated.__getAnimatedValue());
        } else {
          throw new Error('Attempting to run JS driven animation on animated ' + 'node that has been moved to "native" earlier by starting an ' + 'animation with `useNativeDriver: true`');
        }
      };

      _this._setComponentRef = setAndForwardRef({
        getForwardedRef: function getForwardedRef() {
          return _this.props.forwardedRef;
        },
        setLocalRef: function setLocalRef(ref) {
          _this._prevComponent = _this._component;
          _this._component = ref; // TODO: Delete this in a future release.

          if (ref != null && ref.getNode == null) {
            ref.getNode = function () {
              var _ref$constructor$name;

              console.warn('%s: Calling `getNode()` on the ref of an Animated component ' + 'is no longer necessary. You can now directly use the ref ' + 'instead. This method will be removed in a future release.', (_ref$constructor$name = ref.constructor.name) !== null && _ref$constructor$name !== void 0 ? _ref$constructor$name : '<<anonymous>>');
              return ref;
            };
          }
        }
      });
      return _this;
    }

    var _proto = AnimatedComponent.prototype;

    _proto._attachNativeEvents = function _attachNativeEvents() {
      var _this$_component,
          _this2 = this;

      // Make sure to get the scrollable node for components that implement
      // `ScrollResponder.Mixin`.
      var scrollableNode = (_this$_component = this._component) != null && _this$_component.getScrollableNode ? this._component.getScrollableNode() : this._component;

      var _loop = function _loop(key) {
        var prop = _this2.props[key];

        if (prop instanceof AnimatedEvent && prop.__isNative) {
          prop.__attach(scrollableNode, key);

          _this2._eventDetachers.push(function () {
            return prop.__detach(scrollableNode, key);
          });
        }
      };

      for (var key in this.props) {
        _loop(key);
      }
    };

    _proto._detachNativeEvents = function _detachNativeEvents() {
      this._eventDetachers.forEach(function (remove) {
        return remove();
      });

      this._eventDetachers = [];
    };

    _proto._attachProps = function _attachProps(nextProps) {
      var oldPropsAnimated = this._propsAnimated;

      if (nextProps === oldPropsAnimated) {
        return;
      }

      this._propsAnimated = new AnimatedProps(nextProps, this._animatedPropsCallback); // When you call detach, it removes the element from the parent list
      // of children. If it goes to 0, then the parent also detaches itself
      // and so on.
      // An optimization is to attach the new elements and THEN detach the old
      // ones instead of detaching and THEN attaching.
      // This way the intermediate state isn't to go to 0 and trigger
      // this expensive recursive detaching to then re-attach everything on
      // the very next operation.

      if (oldPropsAnimated) {
        oldPropsAnimated.__restoreDefaultValues();

        oldPropsAnimated.__detach();
      }
    };

    _proto.render = function render() {
      var _props$collapsable, _props$nativeID;

      var _ref = this._propsAnimated.__getValue() || {},
          _ref$style = _ref.style,
          style = _ref$style === void 0 ? {} : _ref$style,
          props = _objectWithoutPropertiesLoose(_ref, ["style"]);

      var _ref2 = this.props.passthroughAnimatedPropExplicitValues || {},
          _ref2$style = _ref2.style,
          passthruStyle = _ref2$style === void 0 ? {} : _ref2$style,
          passthruProps = _objectWithoutPropertiesLoose(_ref2, ["style"]);

      var mergedStyle = _objectSpread(_objectSpread({}, style), passthruStyle); // On Fabric, we always want to ensure the container Animated View is *not*
      // flattened.
      // Because we do not get a host component ref immediately and thus cannot
      // do a proper Fabric vs non-Fabric detection immediately, we default to assuming
      // that Fabric *is* enabled until we know otherwise.
      // Thus, in Fabric, this view will never be flattened. In non-Fabric, the view will
      // not be flattened during the initial render but may be flattened in the second render
      // and onwards.


      var forceNativeIdFabric = this._component == null && ((options == null ? void 0 : options.collapsable) === false || props.collapsable !== true) || this._isFabric();

      var forceNativeId = (_props$collapsable = props.collapsable) !== null && _props$collapsable !== void 0 ? _props$collapsable : this._propsAnimated.__isNative || forceNativeIdFabric || (options == null ? void 0 : options.collapsable) === false; // The native driver updates views directly through the UI thread so we
      // have to make sure the view doesn't get optimized away because it cannot
      // go through the NativeViewHierarchyManager since it operates on the shadow
      // thread. TODO: T68258846

      var collapsableProps = forceNativeId ? {
        nativeID: (_props$nativeID = props.nativeID) !== null && _props$nativeID !== void 0 ? _props$nativeID : 'animatedComponent',
        collapsable: false
      } : {};
      return /*#__PURE__*/React.createElement(Component, _extends({}, props, passthruProps, collapsableProps, {
        style: mergedStyle,
        ref: this._setComponentRef
      }));
    };

    _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
      this._waitForUpdate();

      this._attachProps(this.props);
    };

    _proto.componentDidMount = function componentDidMount() {
      if (this._invokeAnimatedPropsCallbackOnMount) {
        this._invokeAnimatedPropsCallbackOnMount = false;

        this._animatedPropsCallback();
      }

      this._propsAnimated.setNativeView(this._component);

      this._attachNativeEvents();

      this._markUpdateComplete();
    };

    _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(newProps) {
      this._waitForUpdate();

      this._attachProps(newProps);
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (this._component !== this._prevComponent) {
        this._propsAnimated.setNativeView(this._component);
      }

      if (this._component !== this._prevComponent || prevProps !== this.props) {
        this._detachNativeEvents();

        this._attachNativeEvents();
      }

      this._markUpdateComplete();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this._propsAnimated && this._propsAnimated.__detach();

      this._detachNativeEvents();

      this._markUpdateComplete();

      this._component = null;
      this._prevComponent = null;
    };

    return AnimatedComponent;
  }(React.Component);

  return /*#__PURE__*/React.forwardRef(function AnimatedComponentWrapper(props, ref) {
    return /*#__PURE__*/React.createElement(AnimatedComponent, _extends({}, props, ref == null ? null : {
      forwardedRef: ref
    }));
  });
}

export default createAnimatedComponent;