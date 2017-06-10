/**
 * @flow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import StyleSheet from '../../apis/StyleSheet';
import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';
import { bool, number, oneOf, oneOfType, string } from 'prop-types';
import React, { Component } from 'react';

class ActivityIndicator extends Component {
  static displayName = 'ActivityIndicator';

  static propTypes = {
    ...ViewPropTypes,
    animating: bool,
    color: string,
    hidesWhenStopped: bool,
    size: oneOfType([oneOf(['small', 'large']), number])
  };

  static defaultProps = {
    animating: true,
    color: '#1976D2',
    hidesWhenStopped: true,
    size: 'small'
  };

  render() {
    const { animating, color, hidesWhenStopped, size, style, ...other } = this.props;

    const svg = (
      <svg height="100%" viewBox="0 0 32 32" width="100%">
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{
            stroke: color,
            opacity: 0.2
          }}
        />
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{
            stroke: color,
            strokeDasharray: 80,
            strokeDashoffset: 60
          }}
        />
      </svg>
    );

    return (
      <View
        {...other}
        accessibilityRole="progressbar"
        aria-valuemax="1"
        aria-valuemin="0"
        style={[styles.container, style, typeof size === 'number' && { height: size, width: size }]}
      >
        <View
          children={svg}
          style={[
            indicatorSizes[size],
            styles.animation,
            !animating && styles.animationPause,
            !animating && hidesWhenStopped && styles.hidesWhenStopped
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  hidesWhenStopped: {
    visibility: 'hidden'
  },
  animation: {
    animationDuration: '0.75s',
    animationName: 'rn-ActivityIndicator-animation',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  },
  animationPause: {
    animationPlayState: 'paused'
  }
});

const indicatorSizes = StyleSheet.create({
  small: {
    width: 20,
    height: 20
  },
  large: {
    width: 36,
    height: 36
  }
});

export default applyNativeMethods(ActivityIndicator);
