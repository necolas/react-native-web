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
import StyleSheet from '../StyleSheet';
import View from '../View';

type RefreshControlProps = {
  ...ViewProps,
  colors?: Array<ColorValue>,
  enabled?: boolean,
  onRefresh?: () => void,
  progressBackgroundColor?: ColorValue,
  progressViewOffset?: number,
  refreshing: boolean,
  size?: 0 | 1 | 'default' | 'large',
  tintColor?: ColorValue,
  title?: string,
  titleColor?: ColorValue
};

// The indicator sizes and the pull distance are the same as on Android.
const CIRCLE_SIZE = 40;
const CIRCLE_SIZE_LARGE = 56;
const PULL_DISTANCE = 64;

function RefreshControl(props: RefreshControlProps): React.Node {
  const {
    children,
    colors,
    progressBackgroundColor,
    progressViewOffset = 0,
    refreshing,
    size,
    tintColor,
    /* eslint-disable */
    enabled,
    onRefresh,
    title,
    titleColor,
    /* eslint-enable */
    ...rest
  } = props;

  const isLarge = size === 'large' || size === 1;
  const circleSize = isLarge ? CIRCLE_SIZE_LARGE : CIRCLE_SIZE;
  const translateY =
    progressViewOffset - circleSize + (refreshing ? PULL_DISTANCE : 0);

  return (
    <View {...rest}>
      {children}
      <View style={styles.indicatorLayer}>
        <View
          aria-hidden={!refreshing}
          style={[
            styles.transition,
            { opacity: refreshing ? 1 : 0, transform: [{ translateY }] }
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
