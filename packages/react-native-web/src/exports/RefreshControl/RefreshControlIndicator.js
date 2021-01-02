/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { RefreshControlIndicatorProps } from './';

import View from '../View';
import StyleSheet from '../StyleSheet';
import React, { useRef, useEffect, useState, useCallback } from 'react';

// The component that will appear animated when the scroll view is swiped from top to bottom
const RefreshControlIndicator = (
  props: RefreshControlIndicatorProps & {
    containerRef: { current: HTMLDivElement | null }
  }
) => {
  const {
    containerRef,
    enabled = true,
    onRefresh,
    progressBackgroundColor = '#ffffff',
    progressViewOffset = 100,
    refreshing = false,
    size: sizeEnum,
    tintColor = '#333333'
  } = props;

  // The size of the Refresh Indicator. 0 -> DEFAULT, 1 -> LARGE
  // https://reactnative.dev/docs/refreshcontrol#size
  const size = sizeEnum ? 30 : 25;

  // the ref pointing to the scrollView
  // we need this to check the scrollY for the component when a swipe is detected
  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  // the Y coordinate where the user starts touch gesture
  const touchOrigin = useRef<number>(0);
  // the Y distance between the origin and the latest touch coordinate
  const touchDistance = useRef<number>(0);
  // the timeout ticker used to clear the refreshing animation
  const clearRefreshingTicker = useRef<TimeoutID | null>(null);

  // the position of the Refresh Indicator, this depends on `touchDistance`
  const [refreshIndicatorOffset, setRefreshIndicatorOffset] = useState(
    refreshing ? progressViewOffset : 0
  );
  // when the component is supposed to be refreshed
  // this state shows the rotating animation
  const [isRefreshing, toggleRefreshing] = useState(refreshing);
  // if the RefreshControl component is supplied to a FlatList or SectionList
  // this state is used to know if the scrollable view is inverted or not
  const [inverted, setInverted] = useState(false);

  // callback when the user starts a touch gesture
  const onTouchStart = useCallback(
    (evt: TouchEvent) => {
      // if already refreshing, then ignore the event
      if (isRefreshing) return;
      // otherwise set touchOrigin
      touchOrigin.current = evt.touches[0].clientY;
    },
    [isRefreshing]
  );

  // callback when the user ends a touch gesture
  const onTouchEnd = useCallback(
    (evt: TouchEvent) => {
      // if already refreshing, then ignore the event
      if (isRefreshing) return;

      // if touchDistance is lesser than the threshold
      // or the user started scrolling somehow
      if (touchDistance.current <= progressViewOffset || scrollViewRef.current?.scrollTop) {
        // if the user has swipe down and the refresh indicator is already visible
        // then reset the position of the refresh indicator
        setRefreshIndicatorOffset(0);
      }
    },
    [isRefreshing, progressViewOffset]
  );

  const onTouchMove = useCallback(
    async (evt: TouchEvent) => {
      // if already refreshing or the scrollY !== 0 or touchOrigin is falsy, then ignore the event
      if (!touchOrigin.current || scrollViewRef.current?.scrollTop || isRefreshing) {
        return;
      }

      // current touch Y coordinate
      const touchCurrent = evt.touches[0].clientY;
      // displacement of touch
      const touchDisplacement = touchCurrent - touchOrigin.current;

      // distance must be absolute
      // it will be negative when the user swipes from down to up (used when the view is inverted)
      touchDistance.current = Math.abs(touchDisplacement);

      if (
        // if the displacement is positive, meaning up to down swipe
        // and the view is not inverted
        (touchDisplacement > 0 && !inverted) ||
        // if the displacement is negative, meaning down to up swipe
        // and the view is inverted
        (touchDisplacement < 0 && inverted)
      ) {
        // set the refresh indicator offset
        setRefreshIndicatorOffset(touchDistance.current);

        // if the distance swiped is greater than the trigger threshold
        if (touchDistance.current > progressViewOffset) {
          // this means user has triggered refresh

          // start refresh animation
          toggleRefreshing(true);

          // execute the `onRefresh` if present
          const result = onRefresh && onRefresh();

          // if the `onRefresh` results in a promise
          if (result && result instanceof Promise) {
            // then wait for the promise to finish
            result.finally(() => {
              // upon completion, turn off the refreshing animation
              toggleRefreshing(false);
            });
          } else {
            // the `onRefresh` was a synchronous function
            // show the refreshing animation for 1000 ms to provide a visual feedback

            // clear any timeout that is due
            clearRefreshingTicker.current && clearTimeout(clearRefreshingTicker.current);
            clearRefreshingTicker.current = setTimeout(() => {
              // stop refreshing animation after 1000ms
              toggleRefreshing(false);
            }, 1000);
          }
        }
      }
    },
    [inverted, isRefreshing, onRefresh, progressViewOffset]
  );

  useEffect(() => {
    // if the current position of refresh indicator
    // is not equal to the threshold
    if (refreshIndicatorOffset !== progressViewOffset) {
      // and refreshing animation is playing
      // then set the position to the threshold

      // this is used when the refreshing prop is sent as true
      // abd we need to offset the refresh indicator
      if (isRefreshing) setRefreshIndicatorOffset(progressViewOffset);
    } else if (!isRefreshing) {
      // if the refresh indicator is at the threshold offset
      // and the refreshing has stopped, then offset it to the origin
      setRefreshIndicatorOffset(0);
    }
  }, [refreshIndicatorOffset, isRefreshing, progressViewOffset]);

  useEffect(() => {
    // make sure the ref is pointing to the container element
    if (!containerRef.current) return;

    // start a mutation observer. This will subscribe to changes in the RefreshControl
    const observer = new MutationObserver(mutations => {
      mutations.forEach(() => {
        // get the styles for the container
        const nodeStyles = window.getComputedStyle(containerRef.current);
        // get the transform property
        const transform = nodeStyles.getPropertyValue('transform');
        // if transform is scaleY(-1) then the container is inverted
        const isInverted = transform === 'matrix(1, 0, 0, -1, 0, 0)';
        if (inverted !== isInverted) {
          // update the state if not updated yet
          setInverted(isInverted);
        }
      });
    });

    // observe the container to the changes in the 'class' attribute
    observer.observe(containerRef.current, { attributes: true, attributeFilter: ['class'] });

    return () => {
      // disconnect the observer when the conditions changes
      observer.disconnect();
    };
  }, [inverted, containerRef]);

  useEffect(() => {
    if (!containerRef.current) return;
    const contianerNode = containerRef.current;

    // check if the container has the last child and that child is a Div element
    // this child will be the actual scroll view.
    if (contianerNode.lastChild && contianerNode.lastChild instanceof HTMLDivElement) {
      // update the ref to point to the scroll view
      scrollViewRef.current = contianerNode.lastChild;
    }

    // add event listeners to the container
    contianerNode.addEventListener('touchstart', onTouchStart, false);
    contianerNode.addEventListener('touchend', onTouchEnd, false);
    contianerNode.addEventListener('touchmove', onTouchMove, false);

    return () => {
      // remove event listeners to the container
      contianerNode.removeEventListener('touchstart', onTouchStart, false);
      contianerNode.removeEventListener('touchend', onTouchEnd, false);
      contianerNode.removeEventListener('touchmove', onTouchMove, false);
    };
  }, [onTouchEnd, onTouchMove, onTouchStart, containerRef]);

  // if the RefreshControl is not enabled, render nothing
  if (!enabled) return <></>;

  return (
    <View
      style={[
        {
          // hide the indicator from the container's view
          top: `calc(${refreshIndicatorOffset}px - ${size + 15}px)`,
          width: `${size + 10}px`,
          height: `${size + 10}px`,
          transform: [
            {
              // while swiping down/up, the indicator will complete a full
              // as it hits the threshold
              rotate: `${(refreshIndicatorOffset * 360) / progressViewOffset}deg`
            }
          ],
          transition: !refreshIndicatorOffset && '.2s',
          backgroundColor: progressBackgroundColor
        },
        styles.refreshIndicator
      ]}
    >
      <View
        style={[
          // if is not refreshing, then pause the rotating animation
          !isRefreshing && styles.animationPause,
          styles.rotateAnimation
        ]}
      >
        <svg
          style={{
            width: `${size}px`,
            height: `${size}px`,
            // the refresh indicator will become opaque when the threshold is hit
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
};

const styles = StyleSheet.create({
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
