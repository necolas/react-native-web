/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue } from '../../types';
import type { ViewProps } from '../View';

import View from '../View';
import StyleSheet from '../StyleSheet';
import React, { useRef, useEffect, useState, useCallback } from 'react';

type RefreshControlIndicatorProps = {
  colors?: Array<ColorValue>,
  enabled?: boolean,
  onRefresh?: () => void | Promise<void>,
  progressBackgroundColor?: ColorValue,
  progressViewOffset?: number,
  refreshing: boolean,
  size?: 0 | 1,
  tintColor?: ColorValue,
  title?: string,
  titleColor?: ColorValue
};

type RefreshControlProps = ViewProps & RefreshControlIndicatorProps;

function RefreshControl(props: RefreshControlProps) {
  const {
    enabled,
    onRefresh,
    progressBackgroundColor,
    progressViewOffset,
    refreshing,
    size,
    tintColor,
    ...rest
  } = props;
  const refreshControlRef = useRef<HTMLDivElement | null>(null);

  return (
    <View {...rest} ref={refreshControlRef}>
      <RefreshControlIndicator
        {...{
          enabled,
          onRefresh,
          progressBackgroundColor,
          progressViewOffset,
          refreshing,
          size,
          tintColor
        }}
        refreshControlRef={refreshControlRef}
      />
      {rest.children}
    </View>
  );
}

const RefreshControlIndicator = (
  props: RefreshControlIndicatorProps & {
    refreshControlRef: { current: HTMLDivElement | null }
  }
) => {
  const {
    refreshControlRef,
    enabled = true,
    onRefresh,
    progressBackgroundColor = '#ffffff',
    progressViewOffset = 100,
    refreshing = false,
    size: sizeEnum,
    tintColor = '#333333'
  } = props;
  const size = sizeEnum ? 30 : 25;

  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  const touchOrigin = useRef<number>(0);
  const touchDistance = useRef<number>(0);
  const clearRefreshing = useRef<TimeoutID | null>(null);

  const [refreshControlOffset, setRefreshControlOffset] = useState(
    refreshing ? progressViewOffset : 0
  );
  const [isRefreshing, toggleRefreshing] = useState(refreshing);
  const [inverted, setInverted] = useState(false);

  const onTouchStart = useCallback(
    (evt: TouchEvent) => {
      if (isRefreshing) return;
      touchOrigin.current = evt.touches[0].clientY;
    },
    [isRefreshing]
  );

  const onTouchEnd = useCallback(
    (evt: TouchEvent) => {
      if (isRefreshing) return;

      if (touchDistance.current <= progressViewOffset || scrollViewRef.current?.scrollTop) {
        toggleRefreshing(false);
        setRefreshControlOffset(0);
        touchOrigin.current = 0;
      }
    },
    [isRefreshing, progressViewOffset]
  );

  const onTouchMove = useCallback(
    async (evt: TouchEvent) => {
      if (!touchOrigin.current || scrollViewRef.current?.scrollTop || isRefreshing) {
        return;
      }

      const touchCurrent = evt.touches[0].clientY;
      const touchDisplacement = touchCurrent - touchOrigin.current;

      touchDistance.current = Math.abs(touchDisplacement);

      if ((touchDisplacement > 0 && !inverted) || (touchDisplacement < 0 && inverted)) {
        setRefreshControlOffset(touchDistance.current);

        if (touchDistance.current > progressViewOffset) {
          toggleRefreshing(true);

          const result = onRefresh && onRefresh();
          if (result && result instanceof Promise) {
            await result;
            toggleRefreshing(false);
          } else {
            clearRefreshing.current && clearTimeout(clearRefreshing.current);
            clearRefreshing.current = setTimeout(() => {
              toggleRefreshing(false);
            }, 1000);
          }
        }
      }
    },
    [inverted, isRefreshing, onRefresh, progressViewOffset]
  );

  useEffect(() => {
    if (refreshControlOffset !== progressViewOffset) {
      if (isRefreshing) setRefreshControlOffset(progressViewOffset);
    } else if (!isRefreshing) {
      setRefreshControlOffset(0);
    }
  }, [refreshControlOffset, isRefreshing, progressViewOffset]);

  useEffect(() => {
    if (!refreshControlRef.current) return;

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(() => {
        const nodeStyles = window.getComputedStyle(refreshControlRef.current);
        const transform = nodeStyles.getPropertyValue('transform');
        const isInverted = transform === 'matrix(1, 0, 0, -1, 0, 0)';
        if (inverted !== isInverted) {
          setInverted(isInverted);
        }
      });
    });

    observer.observe(refreshControlRef.current, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, [inverted, refreshControlRef]);

  useEffect(() => {
    if (!refreshControlRef.current) return;
    const refreshControlNode = refreshControlRef.current;

    if (refreshControlNode.lastChild && refreshControlNode.lastChild instanceof HTMLDivElement) {
      scrollViewRef.current = refreshControlNode.lastChild;
    }

    refreshControlNode.addEventListener('touchstart', onTouchStart, false);
    refreshControlNode.addEventListener('touchend', onTouchEnd, false);
    refreshControlNode.addEventListener('touchmove', onTouchMove, false);

    return () => {
      refreshControlNode.removeEventListener('touchstart', onTouchStart, false);
      refreshControlNode.removeEventListener('touchend', onTouchEnd, false);
      refreshControlNode.removeEventListener('touchmove', onTouchMove, false);
    };
  }, [onTouchEnd, onTouchMove, onTouchStart, refreshControlRef]);

  if (!enabled) return <></>;

  return (
    <View
      style={[
        {
          top: `calc(${refreshControlOffset}px - ${size + 15}px)`,
          width: `${size + 10}px`,
          height: `${size + 10}px`,
          transform: [
            {
              rotate: `${(refreshControlOffset * 360) / progressViewOffset}deg`
            }
          ],
          transition: !refreshControlOffset && '.2s',
          backgroundColor: progressBackgroundColor
        },
        styles.refreshIndicatore
      ]}
    >
      <View style={[!isRefreshing && styles.animationPause, styles.rotateAnimation]}>
        <svg
          style={{
            width: `${size}px`,
            height: `${size}px`,
            opacity: refreshControlOffset / progressViewOffset
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
  refreshIndicatore: {
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

export default RefreshControl;
