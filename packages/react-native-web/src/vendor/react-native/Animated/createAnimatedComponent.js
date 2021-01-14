/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

import { AnimatedEvent } from './AnimatedEvent';
import AnimatedProps from './nodes/AnimatedProps';
import React from 'react';
import invariant from 'fbjs/lib/invariant';
import mergeRefs from '../../../modules/mergeRefs';

function createAnimatedComponent(Component: any, defaultProps: any): any {
  invariant(
    typeof Component !== 'function' ||
      (Component.prototype && Component.prototype.isReactComponent),
    '`createAnimatedComponent` does not support stateless functional components; ' +
      'use a class component instead.',
  );

  class AnimatedComponent extends React.Component<Object> {
    _component: any;
    _invokeAnimatedPropsCallbackOnMount: boolean = false;
    _prevComponent: any;
    _propsAnimated: AnimatedProps;
    _eventDetachers: Array<Function> = [];

    static __skipSetNativeProps_FOR_TESTS_ONLY = false;

    constructor(props: Object) {
      super(props);
    }

    componentWillUnmount() {
      this._propsAnimated && this._propsAnimated.__detach();
      this._detachNativeEvents();
    }

    UNSAFE_componentWillMount() {
      this._attachProps(this.props);
    }

    componentDidMount() {
      if (this._invokeAnimatedPropsCallbackOnMount) {
        this._invokeAnimatedPropsCallbackOnMount = false;
        this._animatedPropsCallback();
      }

      this._propsAnimated.setNativeView(this._component);
      this._attachNativeEvents();
    }

    _attachNativeEvents() {
      // Make sure to get the scrollable node for components that implement
      // `ScrollResponder.Mixin`.
      const scrollableNode = this._component && this._component.getScrollableNode
        ? this._component.getScrollableNode()
        : this._component;

      for (const key in this.props) {
        const prop = this.props[key];
        if (prop instanceof AnimatedEvent && prop.__isNative) {
          prop.__attach(scrollableNode, key);
          this._eventDetachers.push(() => prop.__detach(scrollableNode, key));
        }
      }
    }

    _detachNativeEvents() {
      this._eventDetachers.forEach(remove => remove());
      this._eventDetachers = [];
    }

    // The system is best designed when setNativeProps is implemented. It is
    // able to avoid re-rendering and directly set the attributes that changed.
    // However, setNativeProps can only be implemented on leaf native
    // components. If you want to animate a composite component, you need to
    // re-render it. In this case, we have a fallback that uses forceUpdate.
    _animatedPropsCallback = () => {
      if (this._component == null) {
        // AnimatedProps is created in will-mount because it's used in render.
        // But this callback may be invoked before mount in async mode,
        // In which case we should defer the setNativeProps() call.
        // React may throw away uncommitted work in async mode,
        // So a deferred call won't always be invoked.
        this._invokeAnimatedPropsCallbackOnMount = true;
      } else if (
        AnimatedComponent.__skipSetNativeProps_FOR_TESTS_ONLY ||
        typeof this._component.setNativeProps !== 'function'
      ) {
        this.forceUpdate();
      } else if (!this._propsAnimated.__isNative) {
        this._component.setNativeProps(
          this._propsAnimated.__getAnimatedValue(),
        );
      } else {
        throw new Error(
          'Attempting to run JS driven animation on animated ' +
            'node that has been moved to "native" earlier by starting an ' +
            'animation with `useNativeDriver: true`',
        );
      }
    };

    _attachProps(nextProps) {
      const oldPropsAnimated = this._propsAnimated;

      this._propsAnimated = new AnimatedProps(
        nextProps,
        this._animatedPropsCallback,
      );

      // When you call detach, it removes the element from the parent list
      // of children. If it goes to 0, then the parent also detaches itself
      // and so on.
      // An optimization is to attach the new elements and THEN detach the old
      // ones instead of detaching and THEN attaching.
      // This way the intermediate state isn't to go to 0 and trigger
      // this expensive recursive detaching to then re-attach everything on
      // the very next operation.
      oldPropsAnimated && oldPropsAnimated.__detach();
    }

    UNSAFE_componentWillReceiveProps(newProps) {
      this._attachProps(newProps);
    }

    componentDidUpdate(prevProps) {
      if (this._component !== this._prevComponent) {
        this._propsAnimated.setNativeView(this._component);
      }
      if (this._component !== this._prevComponent || prevProps !== this.props) {
        this._detachNativeEvents();
        this._attachNativeEvents();
      }
    }

    _setComponentRef = mergeRefs(this.props.forwardedRef, (ref) => {
      this._prevComponent = this._component;
      this._component = ref;

      // TODO: Delete this in a future release.
      if (ref != null && ref.getNode == null) {
        ref.getNode = () => {
          console.warn(
            '%s: Calling `getNode()` on the ref of an Animated component ' +
              'is no longer necessary. You can now directly use the ref ' +
              'instead. This method will be removed in a future release.',
            ref.constructor.name ?? '<<anonymous>>',
          );
          return ref;
        };
      }
    })

    render() {
      const props = this._propsAnimated.__getValue();
      return (
        <Component
          {...defaultProps}
          {...props}
          ref={this._setComponentRef}
        />
      );
    }
  }

  const propTypes = Component.propTypes;

  return React.forwardRef(function AnimatedComponentWrapper(props, ref) {
    return (
      <AnimatedComponent
        {...props}
        {...(ref == null ? null : {forwardedRef: ref})}
      />
    );
  });
}

export default createAnimatedComponent;
