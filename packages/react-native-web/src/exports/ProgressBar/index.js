/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue } from '../../types';
import type { ViewProps } from '../View';

import * as React from 'react';
import StyleSheet from '../StyleSheet';
import View from '../View';

type ProgressBarProps = {
  ...ViewProps,
  color?: ColorValue,
  indeterminate?: boolean,
  progress?: number,
  trackColor?: ColorValue
};

const ProgressBar: React.AbstractComponent<
  ProgressBarProps,
  React.ElementRef<typeof View>
> = React.forwardRef((props, ref) => {
  const {
    color = '#1976D2',
    indeterminate = false,
    progress = 0,
    trackColor = 'transparent',
    style,
    ...other
  } = props;

  const percentageProgress = progress * 100;

  const progressRef = React.useRef(null);
  React.useEffect(() => {
    const width = indeterminate ? '25%' : `${percentageProgress}%`;
    if (progressRef.current != null) {
      progressRef.current.setNativeProps({
        style: { width }
      });
    }
  }, [indeterminate, percentageProgress, progressRef]);

  return (
    <View
      {...other}
      accessibilityRole="progressbar"
      accessibilityValue={{
        max: 100,
        min: 0,
        now: indeterminate ? null : percentageProgress
      }}
      ref={ref}
      style={[styles.track, style, { backgroundColor: trackColor }]}
    >
      <View
        ref={progressRef}
        style={[styles.progress, indeterminate && styles.animation, { backgroundColor: color }]}
      />
    </View>
  );
});

ProgressBar.displayName = 'ProgressBar';

const styles = StyleSheet.create({
  track: {
    height: 5,
    overflow: 'hidden',
    userSelect: 'none',
    zIndex: 0
  },
  progress: {
    height: '100%',
    zIndex: -1
  },
  animation: {
    animationDuration: '1s',
    animationKeyframes: [
      {
        '0%': { transform: [{ translateX: '-100%' }] },
        '100%': { transform: [{ translateX: '400%' }] }
      }
    ],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

export default ProgressBar;
