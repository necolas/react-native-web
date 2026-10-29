/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

'use client';

import type { ViewProps, ViewStyle } from '../View/types';

import Dimensions from '../Dimensions';
import dismissKeyboard from '../../modules/dismissKeyboard';
import invariant from 'invariant';
import mergeRefs from '../../modules/mergeRefs';
import ScrollViewBase from './ScrollViewBase';
import StyleSheet from '../StyleSheet';
import TextInputState from '../../modules/TextInputState';
import UIManager from '../UIManager';
import View from '../View';
import React from 'react';

type ScrollViewProps = {
  ...ViewProps,
  centerContent?: boolean,
  contentContainerStyle?: ViewStyle,
  disableScrollViewPanResponder?: boolean,
  horizontal?: boolean,
  keyboardDismissMode?: 'none' | 'interactive' | 'on-drag',
  onContentSizeChange?: (e: any) => void,
  onScroll?: (e: any) => void,
  pagingEnabled?: boolean,
  refreshControl?: any,
  scrollEnabled?: boolean,
  scrollEventThrottle?: number,
  stickyHeaderIndices?: Array<number>
};

type ScrollViewScrollToOptions = {
  x?: number,
  y?: number,
  animated?: boolean
};

type Event = Object;

const emptyObject = {};

function stubFalse() {
  return false;
}

function noop() {}

function handleMeasureError(e: Event) {
  console.warn('Error measuring text field: ', e);
}

class ScrollView extends React.Component<ScrollViewProps> {
  _scrollNodeRef: any = null;
  _innerViewRef: any = null;

  isTouching: boolean = false;
  // Reset to false every time becomes responder. This is used to:
  // - Determine if the scroll view has been scrolled and therefore should
  // refuse to give up its responder lock.
  // - Determine if releasing should dismiss the keyboard when we are in
  // tap-to-dismiss mode (!this.props.keyboardShouldPersistTaps).
  observedScrollSinceBecomingResponder: boolean = false;

  _handleTouchStart = (e: Event) => {
    this.isTouching = true;
    this.props.onTouchStart?.(e);
  };

  _handleTouchEnd = (e: Event) => {
    this.isTouching = e.nativeEvent.touches.length !== 0;
    this.props.onTouchEnd?.(e);
  };

  _handleTouchCancel = (e: Event) => {
    this.isTouching = false;
    this.props.onTouchCancel?.(e);
  };

  _handleScrollShouldSetResponder = () => {
    // Allow any event touch pass through if the default pan responder is disabled
    if (this.props.disableScrollViewPanResponder === true) {
      return false;
    }
    return this.isTouching;
  };

  _handleResponderGrant = (e: Event) => {
    this.observedScrollSinceBecomingResponder = false;
    this.props.onResponderGrant?.(e);
  };

  _handleResponderTerminationRequest = () => {
    return !this.observedScrollSinceBecomingResponder;
  };

  _handleResponderRelease = (e: Event) => {
    this.isTouching = e.nativeEvent.touches.length !== 0;
    this.props.onResponderRelease?.(e);

    // By default scroll views will unfocus a textField
    // if another touch occurs outside of it
    const currentlyFocusedTextInput = TextInputState.currentlyFocusedField();
    if (
      !this.props.keyboardShouldPersistTaps &&
      currentlyFocusedTextInput != null &&
      e.target !== currentlyFocusedTextInput &&
      !this.observedScrollSinceBecomingResponder
    ) {
      this.props.onScrollResponderKeyboardDismissed?.(e);
      TextInputState.blurTextInput(currentlyFocusedTextInput);
    }
  };

  /**
   * A helper function to scroll to a specific point in the scrollview.
   *
   * scrollResponderScrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
   */
  scrollResponderScrollTo = (options?: ScrollViewScrollToOptions) => {
    const { x, y, animated } = options || emptyObject;
    const node = this.getScrollableNode();
    const left = x || 0;
    const top = y || 0;
    if (node != null) {
      if (typeof node.scroll === 'function') {
        node.scroll({ top, left, behavior: !animated ? 'auto' : 'smooth' });
      } else {
        node.scrollLeft = left;
        node.scrollTop = top;
      }
    }
  };

  scrollResponderZoomTo = () => {
    invariant(false, 'zoomToRect is not implemented');
  };

  /**
   * This method should be used as the callback to onFocus in a TextInputs'
   * parent view. Note that any module using this mixin needs to return
   * the parent view's ref in getScrollViewRef() in order to use this method.
   * @param {any} nodeHandle The TextInput node handle
   * @param {number} additionalOffset The scroll view's top "contentInset".
   *        Default is 0.
   * @param {bool} preventNegativeScrolling Whether to allow pulling the content
   *        down to make it meet the keyboard's top. Default is false.
   */
  scrollResponderScrollNativeHandleToKeyboard = (
    nodeHandle: any,
    additionalOffset?: number,
    preventNegativeScrollOffset?: boolean
  ) => {
    this.additionalScrollOffset = additionalOffset || 0;
    this.preventNegativeScrollOffset = !!preventNegativeScrollOffset;

    if (this._innerViewRef == null) {
      return;
    }

    UIManager.measureLayout(
      nodeHandle,
      this.getInnerViewNode(),
      handleMeasureError,
      this._handleInputMeasure
    );
  };

  _handleInputMeasure = (
    left: number,
    top: number,
    width: number,
    height: number
  ) => {
    // React Native waits for keyboard metrics, which are never available on web.
    setTimeout(() => {
      const keyboardScreenY = Dimensions.get('window').height;

      let scrollOffsetY =
        top - keyboardScreenY + height + this.additionalScrollOffset;

      // By default, this can scroll with negative offset, pulling the content
      // down so that the target component's bottom meets the keyboard's top.
      // If requested otherwise, cap the offset at 0 minimum to avoid content
      // shifting down.
      if (this.preventNegativeScrollOffset === true) {
        scrollOffsetY = Math.max(0, scrollOffsetY);
      }

      this.scrollTo({ x: 0, y: scrollOffsetY, animated: true });
      this.additionalScrollOffset = 0;
      this.preventNegativeScrollOffset = false;
    }, 0);
  };

  flashScrollIndicators = () => {};

  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  getScrollResponder: ScrollView = () => {
    return this;
  };

  getScrollableNode = () => {
    return this._scrollNodeRef;
  };

  getInnerViewRef = () => {
    return this._innerViewRef;
  };

  getInnerViewNode = () => {
    return this._innerViewRef;
  };

  getNativeScrollRef = () => {
    return this._scrollNodeRef;
  };

  /**
   * Scrolls to a given x, y offset, either immediately or with a smooth animation.
   * Syntax:
   *
   * scrollTo(options: {x: number = 0; y: number = 0; animated: boolean = true})
   *
   * Note: The weird function signature is due to the fact that, for historical reasons,
   * the function also accepts separate arguments as an alternative to the options object.
   * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
   */
  scrollTo = (
    options?: ScrollViewScrollToOptions | number,
    deprecatedX?: number,
    deprecatedAnimated?: boolean
  ) => {
    let x, y, animated;
    if (typeof options === 'number') {
      console.warn(
        '`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, ' +
          'animated: true})` instead.'
      );
      y = options;
      x = deprecatedX;
      animated = deprecatedAnimated;
    } else if (options) {
      y = options.y;
      x = options.x;
      animated = options.animated;
    }
    this.scrollResponderScrollTo({
      x: x || 0,
      y: y || 0,
      animated: animated !== false
    });
  };

  /**
   * If this is a vertical ScrollView scrolls to the bottom.
   * If this is a horizontal ScrollView scrolls to the right.
   *
   * Use `scrollToEnd({ animated: true })` for smooth animated scrolling,
   * `scrollToEnd({ animated: false })` for immediate scrolling.
   * If no options are passed, `animated` defaults to true.
   */
  scrollToEnd = (options?: { animated?: boolean }) => {
    // Default to true
    const animated = options?.animated !== false;
    const { horizontal } = this.props;
    const scrollResponderNode = this.getScrollableNode();
    const x = horizontal ? scrollResponderNode.scrollWidth : 0;
    const y = horizontal ? 0 : scrollResponderNode.scrollHeight;
    this.scrollResponderScrollTo({ x, y, animated });
  };

  render() {
    const {
      contentContainerStyle,
      horizontal,
      onContentSizeChange,
      refreshControl,
      stickyHeaderIndices,
      pagingEnabled,
      /* eslint-disable */
      forwardedRef,
      keyboardDismissMode,
      onScroll,
      centerContent,
      /* eslint-enable */
      ...rest
    } = this.props;

    if (process.env.NODE_ENV !== 'production' && this.props.style) {
      const style = StyleSheet.flatten(this.props.style);
      const childLayoutProps = ['alignItems', 'justifyContent'].filter(
        (prop) => style?.[prop] !== undefined
      );
      invariant(
        childLayoutProps.length === 0,
        `ScrollView child layout (${JSON.stringify(childLayoutProps)}) ` +
          'must be applied through the contentContainerStyle prop.'
      );
    }

    let contentSizeChangeProps = {};
    if (onContentSizeChange) {
      contentSizeChangeProps = {
        onLayout: this._handleContentOnLayout
      };
    }

    const hasStickyHeaderIndices =
      !horizontal && Array.isArray(stickyHeaderIndices);
    const children =
      hasStickyHeaderIndices || pagingEnabled
        ? React.Children.map(this.props.children, (child, i) => {
            const isSticky =
              hasStickyHeaderIndices && stickyHeaderIndices.indexOf(i) > -1;
            if (child != null && (isSticky || pagingEnabled)) {
              return (
                <View
                  style={[
                    isSticky && styles.stickyHeader,
                    pagingEnabled && styles.pagingEnabledChild
                  ]}
                >
                  {child}
                </View>
              );
            } else {
              return child;
            }
          })
        : this.props.children;

    const contentContainer = (
      <View
        {...contentSizeChangeProps}
        children={children}
        collapsable={false}
        ref={this._setInnerViewRef}
        style={[
          horizontal && styles.contentContainerHorizontal,
          centerContent && styles.contentContainerCenterContent,
          contentContainerStyle
        ]}
      />
    );

    const baseStyle = horizontal ? styles.baseHorizontal : styles.baseVertical;
    const pagingEnabledStyle = horizontal
      ? styles.pagingEnabledHorizontal
      : styles.pagingEnabledVertical;

    const props = {
      ...rest,
      style: [baseStyle, pagingEnabled && pagingEnabledStyle, this.props.style],
      onTouchStart: this._handleTouchStart,
      onTouchEnd: this._handleTouchEnd,
      onTouchCancel: this._handleTouchCancel,
      onStartShouldSetResponder: stubFalse,
      onStartShouldSetResponderCapture: stubFalse,
      onScrollShouldSetResponder: this._handleScrollShouldSetResponder,
      onScroll: this._handleScroll,
      onResponderGrant: this._handleResponderGrant,
      onResponderTerminationRequest: this._handleResponderTerminationRequest,
      onResponderRelease: this._handleResponderRelease,
      onResponderReject: noop
    };

    return (
      <ScrollViewBase {...props} ref={this._setScrollNodeRef}>
        {refreshControl}
        {contentContainer}
      </ScrollViewBase>
    );
  }

  _handleContentOnLayout = (e: Object) => {
    const { width, height } = e.nativeEvent.layout;
    this.props.onContentSizeChange(width, height);
  };

  _handleScroll = (e: Object) => {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.onScroll && this.props.scrollEventThrottle == null) {
        console.log(
          'You specified `onScroll` on a <ScrollView> but not ' +
            '`scrollEventThrottle`. You will only receive one event. ' +
            'Using `16` you get all the events but be aware that it may ' +
            "cause frame drops, use a bigger number if you don't need as " +
            'much precision.'
        );
      }
    }

    if (this.props.keyboardDismissMode === 'on-drag') {
      dismissKeyboard();
    }

    this.observedScrollSinceBecomingResponder = true;
    this.props.onScroll?.(e);
  };

  _setInnerViewRef = (node) => {
    this._innerViewRef = node;
  };

  _setScrollNodeRef = (node) => {
    this._scrollNodeRef = node;
    // ScrollView needs to add more methods to the hostNode in addition to those
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
      node.scrollResponderScrollNativeHandleToKeyboard =
        this.scrollResponderScrollNativeHandleToKeyboard;
    }
    const ref = mergeRefs(this.props.forwardedRef);
    ref(node);
  };
}

const commonStyle = {
  flexGrow: 1,
  flexShrink: 1,
  // Enable hardware compositing in modern browsers.
  // Creates a new layer with its own backing surface that can significantly
  // improve scroll performance.
  transform: 'translateZ(0)'
};

const styles = StyleSheet.create({
  baseVertical: {
    ...commonStyle,
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  baseHorizontal: {
    ...commonStyle,
    flexDirection: 'row',
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  contentContainerHorizontal: {
    flexDirection: 'row'
  },
  contentContainerCenterContent: {
    justifyContent: 'center',
    flexGrow: 1
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

const ForwardedScrollView = (props: {
  ...React.ComponentProps<typeof ScrollView>,
  ref?: React.Ref<React.ElementRef<typeof ScrollView>>
}): React.Node => {
  const { ref, ...rest } = props;
  return <ScrollView {...rest} forwardedRef={ref} />;
};

ForwardedScrollView.displayName = 'ScrollView';

export default ForwardedScrollView;
