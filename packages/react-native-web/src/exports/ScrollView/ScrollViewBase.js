/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from '../View';

import debounce from 'debounce';
import setAndForwardRef from '../../modules/setAndForwardRef';
import StyleSheet from '../StyleSheet';
import View from '../View';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

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
const ScrollViewBase = forwardRef<Props, *>((props, ref) => {
  const {
    accessibilityLabel,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    children,
    forwardedRef,
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
    testID
  } = props;

  const scrollState = useRef({ isScrolling: false, scrollLastTick: 0 });
  const viewRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        setNativeProps(props: Object) {
          if (viewRef.current != null) {
            viewRef.current.setNativeProps(props);
          }
        }
      };
    },
    []
  );

  const setRef = setAndForwardRef({
    getForwardedRef: () => ref,
    setLocalRef: c => {
      viewRef.current = c;
    }
  });

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
    // A scroll happened, so the scroll bumps the debounce.
    const debouncedOnScrollEnd = debounce(handleScrollEnd, 100);
    debouncedOnScrollEnd(e);
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
      accessibilityRelationship={accessibilityRelationship}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
      children={children}
      forwardedRef={forwardedRef}
      importantForAccessibility={importantForAccessibility}
      nativeID={nativeID}
      onLayout={onLayout}
      onScroll={handleScroll}
      onTouchMove={createPreventableScrollHandler(onTouchMove)}
      onWheel={createPreventableScrollHandler(onWheel)}
      pointerEvents={pointerEvents}
      ref={setRef}
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
