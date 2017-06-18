/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ProgressBar
 * @flow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../../propTypes/ColorPropType';
import StyleSheet from '../../apis/StyleSheet';
import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';
import React, { Component } from 'react';
import { bool, number } from 'prop-types';

class ProgressBar extends Component {
  _progressElement: View;

  static displayName = 'ProgressBar';

  static propTypes = {
    ...ViewPropTypes,
    color: ColorPropType,
    indeterminate: bool,
    progress: number,
    trackColor: ColorPropType
  };

  static defaultProps = {
    color: '#1976D2',
    indeterminate: false,
    progress: 0,
    trackColor: 'transparent'
  };

  componentDidMount() {
    this._updateProgressWidth();
  }

  componentDidUpdate() {
    this._updateProgressWidth();
  }

  render() {
    const { color, indeterminate, progress, trackColor, style, ...other } = this.props;

    const percentageProgress = progress * 100;

    return (
      <View
        {...other}
        accessibilityRole="progressbar"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow={indeterminate ? null : percentageProgress}
        style={[styles.track, style, { backgroundColor: trackColor }]}
      >
        <View
          ref={this._setProgressRef}
          style={[styles.progress, indeterminate && styles.animation, { backgroundColor: color }]}
        />
      </View>
    );
  }

  _setProgressRef = element => {
    this._progressElement = element;
  };

  _updateProgressWidth = () => {
    const { indeterminate, progress } = this.props;
    const percentageProgress = indeterminate ? 50 : progress * 100;
    const width = indeterminate ? '25%' : `${percentageProgress}%`;
    if (this._progressElement) {
      this._progressElement.setNativeProps({
        style: { width }
      });
    }
  };
}

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
    animationName: 'rn-ProgressBar-animation',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

export default applyNativeMethods(ProgressBar);
