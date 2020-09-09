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
import { forwardRef, useRef } from 'react';
import StyleSheet from '../StyleSheet';
import View from '../View';

type Props = {
  ...ViewProps,
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
const ScrollViewBase = forwardRef<Props, *>((props, forwardedRef) => {
  const {
    accessibilityLabel,
    accessibilityRole,
    accessibilityState,
    children,
    importantForAccessibility,
    nativeID,
    onLayout,
    onScroll,
    onTouchMove,
    onWheel,
    pointerEvents,
    scrollEnabled = true,
    scrollEventThrottle = 0,
    showsHorizontalScrollIndicator,
    showsVerticalScrollIndicator,
    style,
    dataSet,
    testID
  } = props;

  const scrollState = useRef({ isScrolling: false, scrollLastTick: 0 });
  const scrollTimeout = useRef(null);

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
    e.persist();
    e.stopPropagation();
    // A scroll happened, so the scroll resets the scrollend timeout.
    if (scrollTimeout.current != null) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      handleScrollEnd(e);
    }, 100);
    if (scrollState.current.isScrolling) {
      // Scroll last tick may have changed, check if we need to notify
      if (shouldEmitScrollEvent(scrollState.current.scrollLastTick, scrollEventThrottle)) {
        handleScrollTick(e);
      }
    } else {
      // Weren't scrolling, so we must have just started
      handleScrollStart(e);
    }
  }

  function handleScrollStart(e: Object) {
    scrollState.current.isScrolling = true;
    scrollState.current.scrollLastTick = Date.now();
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

  const hideScrollbar =
    showsHorizontalScrollIndicator === false || showsVerticalScrollIndicator === false;

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      children={children}
      dataSet={dataSet}
      importantForAccessibility={importantForAccessibility}
      nativeID={nativeID}
      onLayout={onLayout}
      onScroll={handleScroll}
      onTouchMove={createPreventableScrollHandler(onTouchMove)}
      onWheel={createPreventableScrollHandler(onWheel)}
      pointerEvents={pointerEvents}
      ref={forwardedRef}
      style={[
        style,
        !scrollEnabled && styles.scrollDisabled,
        hideScrollbar && styles.hideScrollbar
      ]}
      testID={testID}
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
