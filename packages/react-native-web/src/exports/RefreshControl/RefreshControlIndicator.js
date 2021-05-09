/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { RefreshControlIndicatorProps } from './types';

import View from '../View';
import StyleSheet from '../StyleSheet';
import React from 'React';
import { useRef, useEffect, useState, useCallback, forwardRef } from 'react';

const shouldEmitMouseMoveEvent = (lastTick: number) => {
  const timeSinceLastTick = Date.now() - lastTick;
  return timeSinceLastTick >= 50;
};

const PULL_THRESHOLD = 100;

// The component that will appear animated when the scroll view is swiped from top to bottom
const RefreshControlIndicator: React.AbstractComponent<
  RefreshControlIndicatorProps,
  RefreshControlIndicatorProps
> = forwardRef(
  (
    {
      enabled = true,
      onRefresh,
      progressBackgroundColor = '#ffffff',
      progressViewOffset = 50,
      refreshing = false,
      size: sizeEnum,
      tintColor = '#333333'
    },
    ref
  ) => {
    // The size of the Refresh Indicator. 0 -> DEFAULT, 1 -> LARGE
    // https://reactnative.dev/docs/refreshcontrol#size
    const size = sizeEnum ? 30 : 25;

    // ref pointing to the scrollView
    const scrollViewRef = useRef<HTMLDivElement | null>(null);

    // ref pointing to the container View of RefreshIndicator
    const indicatorContainerRef = useRef<HTMLDivElement | null>(null);

    // the Y coordinate where the user starts touch gesture
    const touchOrigin = useRef<number>(0);

    // the Y distance between the origin and the latest touch coordinate
    const touchDistance = useRef<number>(0);

    // whether the user is dragging the pointer
    const isDragging = useRef(false);

    const mouseMoveLastTick = useRef(Date.now());

    // the vertical position of Refresh Indicator
    const [refreshIndicatorOffset, setRefreshIndicatorOffset] = useState(0);

    // whether to show rotating animation
    const [isRefreshing, toggleRefreshing] = useState(false);

    // if the RefreshControl component is supplied to a FlatList or SectionList
    // this state is used to know if the scrollable view is inverted or not
    const [inverted, setInverted] = useState(false);

    // a simple utility to rerender the component
    const [r, rerender] = useState(false);

    // The container element of ScrollView
    const containerNode = indicatorContainerRef.current?.parentElement;

    const getScrollTop = useCallback(() => {
      return scrollViewRef.current?.scrollTop ?? 0;
    }, [scrollViewRef]);

    useEffect(() => {
      // get value of containerNode after the first render
      setTimeout(() => {
        rerender(!r);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onTouchStart = useCallback(
      (evt: MouseEvent | TouchEvent) => {
        if (!enabled || isRefreshing) return;
        const scrollTop = getScrollTop();
        if (scrollTop > 0) return;

        touchOrigin.current = evt instanceof MouseEvent ? evt.pageY : evt.touches[0].clientY;
        isDragging.current = true;
      },
      [isRefreshing, getScrollTop, enabled]
    );

    const onTouchEnd = useCallback(
      (evt: MouseEvent | TouchEvent) => {
        if (isRefreshing || !isDragging.current || !enabled) return;

        if (evt.type === 'mouseout' || evt.type === 'touchcancel') {
          // check if the pointer has left the container element
          // discard event if it is fired from children elements
          const e: any = evt;
          const el = e.toElement || e.relatedTarget;
          if (containerNode?.contains(el) || el === containerNode) return;
        }

        isDragging.current = false;

        const scrollTop = getScrollTop();
        if (touchDistance.current <= progressViewOffset || scrollTop > 0) {
          // user has scrolled down or didn't trigger refresh
          setRefreshIndicatorOffset(0);
        }

        if (touchDistance.current > progressViewOffset) {
          // user has triggered refresh

          onRefresh?.();
          toggleRefreshing(true);
          touchDistance.current = 0;
          touchOrigin.current = 0;
        }
      },
      [containerNode, enabled, getScrollTop, isRefreshing, onRefresh, progressViewOffset]
    );

    const onTouchMove = useCallback(
      (evt: MouseEvent | TouchEvent) => {
        if (!shouldEmitMouseMoveEvent(mouseMoveLastTick.current)) return;
        mouseMoveLastTick.current = Date.now();

        // if already refreshing or the scrollY !== 0 or touchOrigin is falsy, then ignore the event
        if (!touchOrigin.current || isRefreshing || !isDragging.current || !enabled) {
          return;
        }
        const scrollTop = getScrollTop();
        if (scrollTop > 0) {
          touchOrigin.current = 0;
          touchDistance.current = 0;
          isDragging.current = false;
          return;
        }

        const touchCurrent = evt instanceof MouseEvent ? evt.pageY : evt.touches[0].clientY;
        const touchDisplacement = touchCurrent - touchOrigin.current;

        if (
          // if the displacement is positive, meaning up to down swipe
          // and the view is not inverted
          (touchDisplacement > 0 && !inverted) ||
          // if the displacement is negative, meaning down to up swipe
          // and the view is inverted
          (touchDisplacement < 0 && inverted)
        ) {
          evt.preventDefault();
          evt.stopPropagation();
          touchDistance.current = Math.abs(touchDisplacement);
          setRefreshIndicatorOffset(touchDistance.current);
        }
      },
      [isRefreshing, enabled, getScrollTop, inverted]
    );

    useEffect(() => {
      if (refreshing !== isRefreshing) {
        toggleRefreshing(refreshing);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshing]);

    useEffect(() => {
      setRefreshIndicatorOffset(isRefreshing ? progressViewOffset : 0);
    }, [isRefreshing, progressViewOffset]);

    useEffect(() => {
      if (!containerNode) return;

      // find the ScrollView
      if (
        containerNode.lastChild &&
        containerNode.lastChild instanceof HTMLDivElement &&
        !scrollViewRef.current?.isSameNode(containerNode.lastChild)
      ) {
        scrollViewRef.current = containerNode.lastChild;
        const nodeStyles = window.getComputedStyle(scrollViewRef.current);
        const transform = nodeStyles.getPropertyValue('transform');
        // if transform is scaleY(-1) then the ScrollView is inverted
        const isInverted = transform === 'matrix(1, 0, 0, -1, 0, 0)';
        if (inverted !== isInverted) {
          setInverted(isInverted);
        }
      }

      // add event listeners to the container
      containerNode.addEventListener('mousedown', onTouchStart, true);
      containerNode.addEventListener('mouseup', onTouchEnd, true);
      containerNode.addEventListener('mouseout', onTouchEnd, true);
      containerNode.addEventListener('mousemove', onTouchMove, true);
      containerNode.addEventListener('touchstart', onTouchStart, true);
      containerNode.addEventListener('touchend', onTouchEnd, true);
      containerNode.addEventListener('touchcancel', onTouchEnd, true);
      containerNode.addEventListener('touchmove', onTouchMove, true);

      return () => {
        // remove event listeners to the container
        containerNode.removeEventListener('mousedown', onTouchStart, true);
        containerNode.removeEventListener('mouseup', onTouchEnd, true);
        containerNode.removeEventListener('mouseout', onTouchEnd, true);
        containerNode.removeEventListener('mousemove', onTouchMove, true);
        containerNode.removeEventListener('touchstart', onTouchStart, true);
        containerNode.removeEventListener('touchend', onTouchEnd, true);
        containerNode.removeEventListener('touchcancel', onTouchEnd, true);
        containerNode.removeEventListener('touchmove', onTouchMove, true);
      };
    }, [onTouchEnd, onTouchMove, onTouchStart, getScrollTop, containerNode, inverted, enabled]);

    const indicatorPosition: string = inverted ? 'bottom' : 'top';

    return (
      <View
        ref={indicatorContainerRef}
        style={[
          {
            display: enabled ? null : 'none',
            [indicatorPosition]: `calc(${Math.min(refreshIndicatorOffset, PULL_THRESHOLD)}px - ${
              size + 15
            }px)`,
            width: `${size + 10}px`,
            height: `${size + 10}px`,
            backgroundColor: progressBackgroundColor,
            transition:
              (!refreshIndicatorOffset || refreshIndicatorOffset === progressViewOffset) && '.2s'
          },
          styles.refreshIndicator
        ]}
      >
        <View
          style={[
            {
              transform: [
                {
                  // rotate a full circle before hitting PULL_THRESHOLD
                  rotate: `${
                    (Math.min(refreshIndicatorOffset, PULL_THRESHOLD) * 360) / PULL_THRESHOLD
                  }deg`
                }
              ],
              transition: !isRefreshing && '.2s'
            },
            // start or pause rotating animation
            !isRefreshing && styles.animationPause,
            isRefreshing && styles.rotateAnimation
          ]}
        >
          <svg
            style={{
              width: `${size}px`,
              height: `${size}px`,
              // the refresh indicator will become opaque when the progressViewOffset is hit
              opacity: refreshIndicatorOffset / progressViewOffset
            }}
            viewBox="0 0 24 24"
          >
            <path
              d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
              fill={tintColor}
            />
          </svg>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  refreshIndicatorContainer: {},
  refreshIndicator: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    padding: '5px',
    borderRadius: '100%',
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)',
    boxSizing: 'border-box'
  },
  rotateAnimation: {
    animationDuration: '1.25s',
    animationKeyframes: [
      {
        '0%': { transform: [{ rotate: '0deg' }] },
        '100%': { transform: [{ rotate: '360deg' }] }
      }
    ],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  animationPause: {
    animationPlayState: 'paused'
  }
});

export default RefreshControlIndicator;
