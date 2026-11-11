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

export type ScrollEvent = {
  readonly nativeEvent: {
    readonly contentOffset: { readonly x: number, readonly y: number },
    readonly contentSize: {
      readonly height: number,
      readonly width: number
    },
    readonly layoutMeasurement: {
      readonly height: number,
      readonly width: number
    },
    ...
  },
  readonly timeStamp: number,
  ...
};

type Props = {
  ...ViewProps,
  onScroll?: (e: ScrollEvent) => void,
  onTouchMove?: ViewProps['onTouchMove'],
  onWheel?: ViewProps['onWheel'],
  ref?: React.Ref<React.ElementRef<typeof View>>,
  scrollEnabled?: boolean,
  scrollEventThrottle?: number,
  showsHorizontalScrollIndicator?: boolean,
  showsVerticalScrollIndicator?: boolean
};

function normalizeScrollEvent(e: {
  readonly target: HTMLElement,
  ...
}): ScrollEvent {
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
const ScrollViewBase = (props: Props): React.Node => {
  const {
    onScroll,
    onTouchMove,
    onWheel,
    ref,
    scrollEnabled = true,
    scrollEventThrottle = 0,
    showsHorizontalScrollIndicator,
    showsVerticalScrollIndicator,
    style,
    ...rest
  } = props;

  const scrollState = React.useRef({ isScrolling: false, scrollLastTick: 0 });
  const scrollTimeout = React.useRef<?number>(null);
  const scrollRef = React.useRef<?HTMLElement>(null);

  function createPreventableScrollHandler<T>(
    handler: ?(e: T) => void
  ): (e: T) => void {
    return (e: T) => {
      if (scrollEnabled) {
        if (handler) {
          handler(e);
        }
      }
    };
  }

  function handleScroll(e: React.UIEvent<HTMLElement>) {
    e.stopPropagation();
    if (e.target === scrollRef.current) {
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

  function handleScrollStart(e: React.UIEvent<HTMLElement>) {
    scrollState.current.isScrolling = true;
    handleScrollTick(e);
  }

  function handleScrollTick(e: React.UIEvent<HTMLElement>) {
    scrollState.current.scrollLastTick = Date.now();
    if (onScroll) {
      // $FlowFixMe[incompatible-type] handleScroll only forwards events that target the scroll node
      onScroll(normalizeScrollEvent(e));
    }
  }

  function handleScrollEnd(e: React.UIEvent<HTMLElement>) {
    scrollState.current.isScrolling = false;
    if (onScroll) {
      // $FlowFixMe[incompatible-type] handleScroll only forwards events that target the scroll node
      onScroll(normalizeScrollEvent(e));
    }
  }

  const hideScrollbar =
    showsHorizontalScrollIndicator === false ||
    showsVerticalScrollIndicator === false;

  return (
    <View
      {...rest}
      onScroll={handleScroll}
      onTouchMove={createPreventableScrollHandler(onTouchMove)}
      onWheel={createPreventableScrollHandler(onWheel)}
      ref={useMergeRefs(scrollRef, ref)}
      style={[
        style,
        !scrollEnabled && styles.scrollDisabled,
        hideScrollbar && styles.hideScrollbar
      ]}
    />
  );
};

const styles = StyleSheet.create({
  scrollDisabled: {
    overflowX: 'hidden',
    overflowY: 'hidden'
  },
  hideScrollbar: {
    scrollbarWidth: 'none'
  }
});

export default ScrollViewBase;
