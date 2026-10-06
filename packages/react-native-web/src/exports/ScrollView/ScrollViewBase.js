/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from '../View';

import * as React from 'react';
import StyleSheet from '../StyleSheet';
import View from '../View';
import useMergeRefs from '../../modules/useMergeRefs';

type Props = {
  ...ViewProps,
  horizontal?: boolean,
  maintainVisibleContentPosition?: {
    minIndexForVisible: number,
    autoscrollToTopThreshold?: number
  },
  onMomentumScrollBegin?: (e: any) => void,
  onMomentumScrollEnd?: (e: any) => void,
  onScroll?: (e: any) => void,
  onScrollBeginDrag?: (e: any) => void,
  onScrollEndDrag?: (e: any) => void,
  onTouchMove?: (e: any) => void,
  onWheel?: (e: any) => void,
  scrollEnabled?: boolean,
  scrollEventThrottle?: number,
  showsHorizontalScrollIndicator?: boolean,
  showsVerticalScrollIndicator?: boolean
};

function normalizeScrollEvent(e) {
  return {
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
  };
}

function shouldEmitScrollEvent(lastTick: number, eventThrottle: number) {
  const timeSinceLastTick = Date.now() - lastTick;
  return eventThrottle > 0 && timeSinceLastTick >= eventThrottle;
}

/**
 * Encapsulates the Web-specific scroll throttling and disabling logic
 */
const ScrollViewBase: React.AbstractComponent<
  Props,
  React.ElementRef<typeof View>
> = React.forwardRef((props, forwardedRef) => {
  const {
    horizontal,
    maintainVisibleContentPosition,
    onScroll,
    onTouchMove,
    onWheel,
    scrollEnabled = true,
    scrollEventThrottle = 0,
    showsHorizontalScrollIndicator,
    showsVerticalScrollIndicator,
    style,
    ...rest
  } = props;
  const {
    minIndexForVisible: mvcpMinIndexForVisible,
    autoscrollToTopThreshold: mvcpAutoscrollToTopThreshold
  } = maintainVisibleContentPosition ?? {};

  const scrollState = React.useRef({ isScrolling: false, scrollLastTick: 0 });
  const scrollTimeout = React.useRef(null);
  const scrollRef = React.useRef(null);
  const prevFirstVisibleOffsetRef = React.useRef(null);
  const firstVisibleViewRef = React.useRef(null);
  const mutationObserverRef = React.useRef(null);
  const lastScrollOffsetRef = React.useRef(0);

  const getScrollOffset = React.useCallback(() => {
    if (scrollRef.current == null) {
      return 0;
    }
    return horizontal
      ? scrollRef.current.scrollLeft
      : scrollRef.current.scrollTop;
  }, [horizontal]);

  function createPreventableScrollHandler(handler: Function) {
    return (e: Object) => {
      if (scrollEnabled) {
        if (handler) {
          handler(e);
        }
      }
    };
  }

  function handleScroll(e: Object) {
    e.stopPropagation();

    if (e.target === scrollRef.current) {
      e.persist();

      lastScrollOffsetRef.current = getScrollOffset();

      prepareForMaintainVisibleContentPosition();

      // A scroll happened, so the scroll resets the scrollend timeout.
      if (scrollTimeout.current != null) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        handleScrollEnd(e);
      }, 100);
      if (scrollState.current.isScrolling) {
        // Scroll last tick may have changed, check if we need to notify
        if (
          shouldEmitScrollEvent(
            scrollState.current.scrollLastTick,
            scrollEventThrottle
          )
        ) {
          handleScrollTick(e);
        }
      } else {
        // Weren't scrolling, so we must have just started
        handleScrollStart(e);
      }
    }
  }

  function handleScrollStart(e: Object) {
    scrollState.current.isScrolling = true;
    handleScrollTick(e);
  }

  function handleScrollTick(e: Object) {
    scrollState.current.scrollLastTick = Date.now();
    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  }

  function handleScrollEnd(e: Object) {
    scrollState.current.isScrolling = false;
    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  }

  const getContentView = React.useCallback(() => {
    return scrollRef.current?.childNodes[0];
  }, []);

  const scrollToOffset = React.useCallback(
    (offset, animated) => {
      const behavior = animated ? 'smooth' : 'instant';
      scrollRef.current?.scroll(
        horizontal ? { left: offset, behavior } : { top: offset, behavior }
      );
    },
    [horizontal]
  );

  const prepareForMaintainVisibleContentPosition = React.useCallback(() => {
    if (mvcpMinIndexForVisible == null) {
      return;
    }

    const scrollNode = scrollRef.current;
    const contentView = getContentView();
    if (scrollNode == null || contentView == null) {
      return;
    }

    const scrollOffset = getScrollOffset();

    for (
      let i = mvcpMinIndexForVisible;
      i < contentView.childNodes.length;
      i++
    ) {
      const subview = contentView.childNodes[i];
      const subviewOffset = horizontal ? subview.offsetLeft : subview.offsetTop;
      if (
        subviewOffset > scrollOffset ||
        i === contentView.childNodes.length - 1
      ) {
        prevFirstVisibleOffsetRef.current = subviewOffset;
        firstVisibleViewRef.current = subview;
        break;
      }
    }
  }, [getContentView, getScrollOffset, mvcpMinIndexForVisible, horizontal]);

  const adjustForMaintainVisibleContentPosition = React.useCallback(() => {
    if (mvcpMinIndexForVisible == null) {
      return;
    }

    const scrollNode = scrollRef.current;
    const firstVisibleView = firstVisibleViewRef.current;
    const prevFirstVisibleOffset = prevFirstVisibleOffsetRef.current;
    if (
      scrollNode == null ||
      firstVisibleView == null ||
      prevFirstVisibleOffset == null
    ) {
      return;
    }

    const firstVisibleViewOffset = horizontal
      ? firstVisibleView.offsetLeft
      : firstVisibleView.offsetTop;
    const delta = firstVisibleViewOffset - prevFirstVisibleOffset;
    if (Math.abs(delta) > 0.5) {
      const scrollOffset = getScrollOffset();
      prevFirstVisibleOffsetRef.current = firstVisibleViewOffset;
      scrollToOffset(scrollOffset + delta, false);
      if (
        mvcpAutoscrollToTopThreshold != null &&
        scrollOffset <= mvcpAutoscrollToTopThreshold
      ) {
        scrollToOffset(0, true);
      }
    }
  }, [
    getScrollOffset,
    scrollToOffset,
    mvcpMinIndexForVisible,
    mvcpAutoscrollToTopThreshold,
    horizontal
  ]);

  const setupMutationObserver = React.useCallback(() => {
    const scrollNode = scrollRef.current;
    const contentView = getContentView();
    if (contentView == null || scrollNode == null) {
      return;
    }

    mutationObserverRef.current?.disconnect();

    const mutationObserver = new MutationObserver(() => {
      // Chrome adjusts scroll position when elements are added at the top of the
      // view. We want to have the same behavior as react-native / Safari so we
      // reset the scroll position to the last value we got from an event.
      const lastScrollOffset = lastScrollOffsetRef.current;
      const scrollOffset = getScrollOffset();
      if (lastScrollOffset !== scrollOffset) {
        scrollToOffset(lastScrollOffset, false);
      }

      // This needs to execute after scroll events are dispatched, but
      // in the same tick to avoid flickering. rAF provides the right timing.
      requestAnimationFrame(() => {
        adjustForMaintainVisibleContentPosition();
      });
    });
    mutationObserver.observe(contentView, {
      attributes: true,
      childList: true,
      subtree: true
    });

    mutationObserverRef.current = mutationObserver;
  }, [
    adjustForMaintainVisibleContentPosition,
    getContentView,
    getScrollOffset,
    scrollToOffset
  ]);

  React.useEffect(() => {
    prepareForMaintainVisibleContentPosition();
    setupMutationObserver();
  }, [prepareForMaintainVisibleContentPosition, setupMutationObserver]);

  const hideScrollbar =
    showsHorizontalScrollIndicator === false ||
    showsVerticalScrollIndicator === false;

  const setMergedRef = useMergeRefs(scrollRef, forwardedRef);

  const onRef = React.useCallback(
    (newRef) => {
      // Make sure to only call refs and re-attach listeners if the node changed.
      if (newRef == null || newRef === scrollRef.current) {
        return;
      }

      setMergedRef(newRef);
      prepareForMaintainVisibleContentPosition();
      setupMutationObserver();
    },
    [
      prepareForMaintainVisibleContentPosition,
      setMergedRef,
      setupMutationObserver
    ]
  );

  React.useEffect(() => {
    const mutationObserver = mutationObserverRef.current;
    return () => {
      mutationObserver?.disconnect();
    };
  }, []);

  return (
    <View
      {...rest}
      onScroll={handleScroll}
      onTouchMove={createPreventableScrollHandler(onTouchMove)}
      onWheel={createPreventableScrollHandler(onWheel)}
      ref={onRef}
      style={[
        style,
        !scrollEnabled && styles.scrollDisabled,
        hideScrollbar && styles.hideScrollbar
      ]}
    />
  );
});

// Chrome doesn't support e.preventDefault in this case; touch-action must be
// used to disable scrolling.
// https://developers.google.com/web/updates/2017/01/scrolling-intervention
const styles = StyleSheet.create({
  scrollDisabled: {
    overflowX: 'hidden',
    overflowY: 'hidden',
    touchAction: 'none'
  },
  hideScrollbar: {
    scrollbarWidth: 'none'
  }
});

export default ScrollViewBase;
