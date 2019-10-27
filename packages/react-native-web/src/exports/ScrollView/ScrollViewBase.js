/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import debounce from 'debounce';
import StyleSheet from '../StyleSheet';
import View from '../View';
import ViewPropTypes from '../ViewPropTypes';
import React, { Component } from 'react';
import { bool, func, number } from 'prop-types';
import findNodeHandle from '../findNodeHandle';

const normalizeScrollEvent = e => ({
  nativeEvent: {
    contentOffset: {
      get x() {
        return e.target.scrollLeft;
      },
      get y() {
        return e.target.scrollTop;
      }
    },
    contentSize: {
      get height() {
        return e.target.scrollHeight;
      },
      get width() {
        return e.target.scrollWidth;
      }
    },
    layoutMeasurement: {
      get height() {
        return e.target.offsetHeight;
      },
      get width() {
        return e.target.offsetWidth;
      }
    }
  },
  timeStamp: Date.now()
});

const normalizeWindowScrollEvent = e => ({
  nativeEvent: {
    contentOffset: {
      get x() {
        return window.scrollX;
      },
      get y() {
        return window.scrollY;
      }
    },
    contentSize: {
      get height() {
        return window.innerHeight;
      },
      get width() {
        return window.innerWidth;
      }
    },
    layoutMeasurement: {
      get height() {
        // outer dimensions do not apply for windows
        return window.innerHeight;
      },
      get width() {
        return window.innerWidth;
      }
    }
  },
  timeStamp: Date.now()
});

/**
 * Encapsulates the Web-specific scroll throttling and disabling logic
 */
export default class ScrollViewBase extends Component<*> {
  _viewRef: View;

  static propTypes = {
    ...ViewPropTypes,
    onMomentumScrollBegin: func,
    onMomentumScrollEnd: func,
    onScroll: func,
    onScrollBeginDrag: func,
    onScrollEndDrag: func,
    onTouchMove: func,
    onWheel: func,
    removeClippedSubviews: bool,
    scrollEnabled: bool,
    scrollEventThrottle: number,
    showsHorizontalScrollIndicator: bool,
    showsVerticalScrollIndicator: bool,
    useWindowScrolling: bool
  };

  static defaultProps = {
    scrollEnabled: true,
    scrollEventThrottle: 0,
    useWindowScrolling: false
  };

  _debouncedOnScrollEnd = debounce(this._handleScrollEnd, 100);
  _state = { isScrolling: false, scrollLastTick: 0 };
  _windowResizeObserver: any | null = null;

  setNativeProps(props: Object) {
    if (this._viewRef) {
      this._viewRef.setNativeProps(props);
    }
  }

  _handleWindowLayout = () => {
    const { onLayout } = this.props;

    if (typeof onLayout === 'function') {
      const layout = {
        x: 0,
        y: 0,
        get width() {
          return window.innerWidth;
        },
        get height() {
          return window.innerHeight;
        }
      };

      const nativeEvent = {
        layout
      };

      // $FlowFixMe
      Object.defineProperty(nativeEvent, 'target', {
        enumerable: true,
        get: () => findNodeHandle(this)
      });

      onLayout({
        nativeEvent,
        timeStamp: Date.now()
      });
    }
  };

  registerWindowHandlers() {
    window.addEventListener('scroll', this._handleScroll);
    window.addEventListener('touchmove', this._handleWindowTouchMove);
    window.addEventListener('wheel', this._handleWindowWheel);
    window.addEventListener('resize', this._handleWindowLayout);

    if (typeof window.ResizeObserver === 'function') {
      this._windowResizeObserver = new window.ResizeObserver((/*entries*/) => {
        this._handleWindowLayout();
      });
      // handle changes of the window content size.
      // It technically works with regular onLayout of the container,
      // but this called very often if the content change based on scrolling, e.g. FlatList
      this._windowResizeObserver.observe(window.document.body);
    } else if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
      console.warn(
        '"useWindowScrolling" relies on ResizeObserver which is not supported by your browser. ' +
          'Please include a polyfill, e.g., https://github.com/que-etc/resize-observer-polyfill. ' +
          'Only handling the window.onresize event.'
      );
    }
    this._handleWindowLayout();
  }

  unregisterWindowHandlers() {
    window.removeEventListener('scroll', this._handleScroll);
    window.removeEventListener('touchmove', this._handleWindowTouchMove);
    window.removeEventListener('wheel', this._handleWindowWheel);
    const { _windowResizeObserver } = this;
    if (_windowResizeObserver) {
      _windowResizeObserver.disconnect();
    }
  }

  componentDidMount() {
    if (this.props.useWindowScrolling) {
      this.registerWindowHandlers();
    }
  }

  componentDidUpdate({ useWindowScrolling: wasUsingBodyScroll }: Object) {
    const { useWindowScrolling } = this.props;
    if (wasUsingBodyScroll !== useWindowScrolling) {
      if (wasUsingBodyScroll) {
        this.unregisterWindowHandlers();
      } else {
        this.registerWindowHandlers();
      }
    }
  }

  componentWillUnmount() {
    if (this.props.useWindowScrolling) {
      this.unregisterWindowHandlers();
    }
  }

  render() {
    const {
      scrollEnabled,
      style,
      /* eslint-disable */
      alwaysBounceHorizontal,
      alwaysBounceVertical,
      automaticallyAdjustContentInsets,
      bounces,
      bouncesZoom,
      canCancelContentTouches,
      centerContent,
      contentInset,
      contentInsetAdjustmentBehavior,
      contentOffset,
      decelerationRate,
      directionalLockEnabled,
      endFillColor,
      indicatorStyle,
      keyboardShouldPersistTaps,
      maximumZoomScale,
      minimumZoomScale,
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScrollBeginDrag,
      onScrollEndDrag,
      overScrollMode,
      pinchGestureEnabled,
      removeClippedSubviews,
      scrollEventThrottle,
      scrollIndicatorInsets,
      scrollPerfTag,
      scrollsToTop,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      snapToInterval,
      snapToAlignment,
      zoomScale,
      useWindowScrolling,
      /* eslint-enable */
      ...other
    } = this.props;

    const hideScrollbar =
      showsHorizontalScrollIndicator === false || showsVerticalScrollIndicator === false;
    return (
      <View
        {...other}
        onLayout={useWindowScrolling ? undefined : other.onLayout}
        // disable regular scroll handling if window scrolling is used
        onScroll={useWindowScrolling ? undefined : this._handleScroll}
        onTouchMove={
          useWindowScrolling
            ? undefined
            : this._createPreventableScrollHandler(this.props.onTouchMove)
        }
        onWheel={
          useWindowScrolling ? undefined : this._createPreventableScrollHandler(this.props.onWheel)
        }
        ref={this._setViewRef}
        style={[
          style,
          !scrollEnabled && styles.scrollDisabled,
          hideScrollbar && styles.hideScrollbar
        ]}
      />
    );
  }

  _createPreventableScrollHandler = (handler: Function) => {
    return (e: Object) => {
      if (this.props.scrollEnabled) {
        if (handler) {
          handler(e);
        }
      } else {
        // To disable scrolling in all browsers except Chrome
        e.preventDefault();
      }
    };
  };

  _handleWindowTouchMove = this._createPreventableScrollHandler(() => {
    const { onTouchMove } = this.props;
    if (typeof onTouchMove === 'function') {
      return onTouchMove();
    }
  });

  _handleWindowWheel = this._createPreventableScrollHandler(() => {
    const { onWheel } = this.props;
    if (typeof onWheel === 'function') {
      return onWheel();
    }
  });

  _handleScroll = (e: Object) => {
    if (typeof e.persist === 'function') {
      // this is a react SyntheticEvent, but not for window scrolling
      e.persist();
    }

    e.stopPropagation();
    const { scrollEventThrottle } = this.props;
    // A scroll happened, so the scroll bumps the debounce.
    this._debouncedOnScrollEnd(e);
    if (this._state.isScrolling) {
      // Scroll last tick may have changed, check if we need to notify
      if (this._shouldEmitScrollEvent(this._state.scrollLastTick, scrollEventThrottle)) {
        this._handleScrollTick(e);
      }
    } else {
      // Weren't scrolling, so we must have just started
      this._handleScrollStart(e);
    }
  };

  _handleScrollStart(e: Object) {
    this._state.isScrolling = true;
    this._state.scrollLastTick = Date.now();
  }

  _handleScrollTick(e: Object) {
    const { onScroll, useWindowScrolling } = this.props;
    this._state.scrollLastTick = Date.now();
    if (onScroll) {
      const transformEvent = useWindowScrolling ? normalizeWindowScrollEvent : normalizeScrollEvent;
      onScroll(transformEvent(e));
    }
  }

  _handleScrollEnd(e: Object) {
    const { onScroll, useWindowScrolling } = this.props;
    this._state.isScrolling = false;
    if (onScroll) {
      const transformEvent = useWindowScrolling ? normalizeWindowScrollEvent : normalizeScrollEvent;
      onScroll(transformEvent(e));
    }
  }

  _setViewRef = (element: View) => {
    this._viewRef = element;
  };

  _shouldEmitScrollEvent(lastTick: number, eventThrottle: number) {
    const timeSinceLastTick = Date.now() - lastTick;
    return eventThrottle > 0 && timeSinceLastTick >= eventThrottle;
  }
}

// Chrome doesn't support e.preventDefault in this case; touch-action must be
// used to disable scrolling.
// https://developers.google.com/web/updates/2017/01/scrolling-intervention
const styles = StyleSheet.create({
  scrollDisabled: {
    touchAction: 'none'
  },
  hideScrollbar: {
    scrollbarWidth: 'none'
  }
});
