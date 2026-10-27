/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use client';

import type { ColorValue } from '../../types';
import type { ViewProps } from '../View';

import * as React from 'react';
import ActivityIndicator from '../ActivityIndicator';
import { addEventListener } from '../../modules/addEventListener';
import StyleSheet from '../StyleSheet';
import { terminateResponder } from '../../modules/useResponderEvents/ResponderSystem';
import useLayoutEffect from '../../modules/useLayoutEffect';
import useMergeRefs from '../../modules/useMergeRefs';
import View from '../View';

type RefreshControlProps = {
  ...ViewProps,
  colors?: Array<ColorValue>,
  enabled?: boolean,
  onRefresh?: () => void,
  progressBackgroundColor?: ColorValue,
  progressViewOffset?: number,
  ref?: React.Ref<React.ElementRef<typeof View>>,
  refreshing: boolean,
  size?: 0 | 1 | 'default' | 'large',
  tintColor?: ColorValue,
  title?: string,
  titleColor?: ColorValue
};

type Pull = {
  direction: 1 | -1,
  distance: number,
  isActive: boolean,
  startX: number,
  startY: number
};

// The indicator sizes, the pull distance, and the drag rate are the same as on
// Android.
const CIRCLE_SIZE = 40;
const CIRCLE_SIZE_LARGE = 56;
const PULL_DISTANCE = 64;
const DRAG_RATE = 0.5;

const MAX_PULL_DISTANCE = PULL_DISTANCE * 1.5;

// A pull can start only when the scroll view is at the top. This also applies
// to each nested scroll view that the touch starts in.
function isScrolledToTop(target: any, root: HTMLElement): boolean {
  let node = target;
  while (node != null && node !== root) {
    if (node.scrollTop > 0) {
      return false;
    }
    node = node.parentNode;
  }
  return true;
}

// An inverted list flips the refresh control with `scaleY(-1)`. Then the top
// of the list is at the bottom of the screen, and a pull moves up the screen.
// The browser gives the transform as `matrix(a, b, c, d, e, f)` or as
// `matrix3d(...)`, and the vertical scale is `d` or the sixth value.
function isFlippedVertically(node: HTMLElement): boolean {
  const { transform } = window.getComputedStyle(node);
  const match = /^matrix(3d)?\((.+)\)$/.exec(transform);
  if (match == null) {
    return false;
  }
  const values = match[2].split(',');
  return parseFloat(values[match[1] != null ? 5 : 3]) < 0;
}

function RefreshControl(props: RefreshControlProps): React.Node {
  const {
    children,
    colors,
    enabled,
    onRefresh,
    progressBackgroundColor,
    progressViewOffset = 0,
    ref,
    refreshing,
    size,
    tintColor,
    /* eslint-disable */
    title,
    titleColor,
    /* eslint-enable */
    ...rest
  } = props;

  const hostRef = React.useRef<?HTMLElement>(null);
  const setRef = useMergeRefs(hostRef, ref);
  const [pullDistance, setPullDistance] = React.useState(0);

  // Read the props through a ref, so that a new `onRefresh` identity does not
  // remove the touch listeners during a pull.
  const pullPropsRef = React.useRef({ enabled, onRefresh, refreshing });

  useLayoutEffect(() => {
    pullPropsRef.current = { enabled, onRefresh, refreshing };
  });

  React.useEffect(() => {
    const node = hostRef.current;
    if (node == null) {
      return;
    }
    let pull: ?Pull = null;

    function endPull() {
      pull = null;
      setPullDistance(0);
    }

    function handleTouchStart(e: Object) {
      const pullProps = pullPropsRef.current;
      endPull();
      if (
        pullProps.enabled !== false &&
        !pullProps.refreshing &&
        e.touches.length === 1 &&
        isScrolledToTop(e.target, node)
      ) {
        const touch = e.touches[0];
        pull = {
          direction: isFlippedVertically(node) ? -1 : 1,
          distance: 0,
          isActive: false,
          startX: touch.clientX,
          startY: touch.clientY
        };
      }
    }

    function handleTouchMove(e: Object) {
      const currentPull = pull;
      if (currentPull == null) {
        return;
      }
      const touch = e.touches[0];
      const dx = touch.clientX - currentPull.startX;
      const dy = (touch.clientY - currentPull.startY) * currentPull.direction;
      if (!currentPull.isActive) {
        // Leave the touch to the browser when it scrolls the content, when it
        // moves to the side, or when the browser scrolls already.
        if (dy <= Math.abs(dx) || !e.cancelable) {
          pull = null;
          return;
        }
        currentPull.isActive = true;
        // A native scroll ends the responder, for example the press of an
        // item in the list. The pull must do the same.
        terminateResponder();
      }
      e.preventDefault();
      currentPull.distance = Math.min(
        Math.max(dy, 0) * DRAG_RATE,
        MAX_PULL_DISTANCE
      );
      setPullDistance(currentPull.distance);
    }

    function handleTouchEnd(e: Object) {
      if (
        e.type === 'touchend' &&
        pull != null &&
        pull.distance >= PULL_DISTANCE
      ) {
        pullPropsRef.current.onRefresh?.();
      }
      endPull();
    }

    const removeListeners = [
      addEventListener(node, 'touchstart', handleTouchStart, { passive: true }),
      // React adds a passive `touchmove` listener, which cannot stop the
      // browser scroll. This listener is not passive.
      addEventListener(node, 'touchmove', handleTouchMove, { passive: false }),
      addEventListener(node, 'touchend', handleTouchEnd),
      addEventListener(node, 'touchcancel', handleTouchEnd)
    ];
    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const isLarge = size === 'large' || size === 1;
  const circleSize = isLarge ? CIRCLE_SIZE_LARGE : CIRCLE_SIZE;
  const isPulling = pullDistance > 0;
  let offset = 0;
  let opacity = 0;
  if (isPulling) {
    offset = pullDistance;
    // The indicator fades in until the pull is far enough to refresh.
    opacity = 0.3 + 0.7 * Math.min(pullDistance / PULL_DISTANCE, 1);
  } else if (refreshing) {
    offset = PULL_DISTANCE;
    opacity = 1;
  }
  const translateY = progressViewOffset - circleSize + offset;

  return (
    <View {...rest} ref={setRef}>
      {children}
      <View style={styles.indicatorLayer}>
        <View
          aria-hidden={!isPulling && !refreshing}
          style={[
            !isPulling && styles.transition,
            { opacity, transform: [{ translateY }] }
          ]}
        >
          <View
            style={[
              styles.circle,
              isLarge && styles.circleLarge,
              progressBackgroundColor != null && {
                backgroundColor: progressBackgroundColor
              }
            ]}
          >
            <ActivityIndicator
              animating={refreshing}
              color={colors?.[0] ?? tintColor}
              hidesWhenStopped={false}
              size={isLarge ? 'large' : 'small'}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorLayer: {
    alignItems: 'center',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0
  },
  transition: {
    transitionDuration: '0.2s',
    transitionProperty: 'opacity, transform'
  },
  circle: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: CIRCLE_SIZE / 2,
    boxShadow: '0px 1px 4px rgba(0,0,0,0.3)',
    height: CIRCLE_SIZE,
    justifyContent: 'center',
    width: CIRCLE_SIZE
  },
  circleLarge: {
    borderRadius: CIRCLE_SIZE_LARGE / 2,
    height: CIRCLE_SIZE_LARGE,
    width: CIRCLE_SIZE_LARGE
  }
});

export default RefreshControl;
