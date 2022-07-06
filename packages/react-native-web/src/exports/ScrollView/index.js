/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import type { ViewProps, ViewStyle } from '../View/types';

import createReactClass from 'create-react-class';
import dismissKeyboard from '../../modules/dismissKeyboard';
import invariant from 'fbjs/lib/invariant';
import mergeRefs from '../../modules/mergeRefs';
import ScrollResponder from '../../modules/ScrollResponder';
import ScrollViewBase from './ScrollViewBase';
import StyleSheet from '../StyleSheet';
import View from '../View';
import React from 'react';

type ScrollViewProps = {
  ...ViewProps,
  centerContent?: boolean,
  contentContainerStyle?: ViewStyle,
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

const emptyObject = {};

/* eslint-disable react/prefer-es6-class */
const ScrollView = ((createReactClass({
  mixins: [ScrollResponder.Mixin],

  getInitialState() {
    return this.scrollResponderMixinGetInitialState();
  },

  flashScrollIndicators() {
    this.scrollResponderFlashScrollIndicators();
  },

  /**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
  getScrollResponder(): ScrollView {
    return this;
  },

  getScrollableNode(): any {
    return this._scrollNodeRef;
  },

  getInnerViewRef(): any {
    return this._innerViewRef;
  },

  getInnerViewNode(): any {
    return this._innerViewRef;
  },

  getNativeScrollRef(): any {
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
  scrollTo(
    y?: number | { x?: number, y?: number, animated?: boolean },
    x?: number,
    animated?: boolean
  ) {
    if (typeof y === 'number') {
      console.warn(
        '`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.'
      );
    } else {
      ({ x, y, animated } = y || emptyObject);
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
  scrollToEnd(options?: { animated?: boolean }) {
    // Default to true
    const animated = (options && options.animated) !== false;
    const { horizontal } = this.props;
    const scrollResponder = this.getScrollResponder();
    const scrollResponderNode =
      scrollResponder.scrollResponderGetScrollableNode();
    const x = horizontal ? scrollResponderNode.scrollWidth : 0;
    const y = horizontal ? 0 : scrollResponderNode.scrollHeight;
    scrollResponder.scrollResponderScrollTo({ x, y, animated });
  },

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
      ...other
    } = this.props;

    if (process.env.NODE_ENV !== 'production' && this.props.style) {
      const style = StyleSheet.flatten(this.props.style);
      const childLayoutProps = ['alignItems', 'justifyContent'].filter(
        (prop) => style && style[prop] !== undefined
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
                  style={StyleSheet.compose(
                    isSticky && styles.stickyHeader,
                    pagingEnabled && styles.pagingEnabledChild
                  )}
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
      ...other,
      style: [baseStyle, pagingEnabled && pagingEnabledStyle, this.props.style],
      onTouchStart: this.scrollResponderHandleTouchStart,
      onTouchMove: this.scrollResponderHandleTouchMove,
      onTouchEnd: this.scrollResponderHandleTouchEnd,
      onScrollBeginDrag: this.scrollResponderHandleScrollBeginDrag,
      onScrollEndDrag: this.scrollResponderHandleScrollEndDrag,
      onMomentumScrollBegin: this.scrollResponderHandleMomentumScrollBegin,
      onMomentumScrollEnd: this.scrollResponderHandleMomentumScrollEnd,
      onStartShouldSetResponder:
        this.scrollResponderHandleStartShouldSetResponder,
      onStartShouldSetResponderCapture:
        this.scrollResponderHandleStartShouldSetResponderCapture,
      onScrollShouldSetResponder:
        this.scrollResponderHandleScrollShouldSetResponder,
      onScroll: this._handleScroll,
      onResponderGrant: this.scrollResponderHandleResponderGrant,
      onResponderTerminationRequest:
        this.scrollResponderHandleTerminationRequest,
      onResponderTerminate: this.scrollResponderHandleTerminate,
      onResponderRelease: this.scrollResponderHandleResponderRelease,
      onResponderReject: this.scrollResponderHandleResponderReject
    };

    const ScrollViewClass = ScrollViewBase;

    invariant(
      ScrollViewClass !== undefined,
      'ScrollViewClass must not be undefined'
    );

    const scrollView = (
      <ScrollViewClass {...props} ref={this._setScrollNodeRef}>
        {contentContainer}
      </ScrollViewClass>
    );

    if (refreshControl) {
      return React.cloneElement(
        refreshControl,
        { style: props.style },
        scrollView
      );
    }

    return scrollView;
  },

  _handleContentOnLayout(e: Object) {
    const { width, height } = e.nativeEvent.layout;
    this.props.onContentSizeChange(width, height);
  },

  _handleScroll(e: Object) {
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

    this.scrollResponderHandleScroll(e);
  },

  _setInnerViewRef(node) {
    this._innerViewRef = node;
  },

  _setScrollNodeRef(node) {
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
  }
}): any): React.ComponentType<ScrollViewProps>);

const commonStyle = {
  flexGrow: 1,
  flexShrink: 1,
  // Enable hardware compositing in modern browsers.
  // Creates a new layer with its own backing surface that can significantly
  // improve scroll performance.
  transform: [{ translateZ: 0 }],
  // iOS native scrolling
  WebkitOverflowScrolling: 'touch'
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

const ForwardedScrollView: React.AbstractComponent<
  React.ElementConfig<typeof ScrollView>,
  React.ElementRef<typeof ScrollView>
> = React.forwardRef((props, forwardedRef) => {
  return <ScrollView {...props} forwardedRef={forwardedRef} />;
});

ForwardedScrollView.displayName = 'ScrollView';

export default ForwardedScrollView;
