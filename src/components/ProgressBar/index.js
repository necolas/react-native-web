import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../../propTypes/ColorPropType';
import StyleSheet from '../../apis/StyleSheet';
import View from '../View';
import React, { Component, PropTypes } from 'react';

class ProgressBar extends Component {
  static displayName = 'ProgressBar';

  static propTypes = {
    ...View.propTypes,
    color: ColorPropType,
    indeterminate: PropTypes.bool,
    progress: PropTypes.number,
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
    const {
      color,
      indeterminate,
      progress,
      trackColor,
      style,
      ...other
    } = this.props;

    const percentageProgress = progress * 100;

    return (
      <View {...other}
        accessibilityRole='progressbar'
        aria-valuemax='100'
        aria-valuemin='0'
        aria-valuenow={indeterminate ? null : percentageProgress}
        style={[
          styles.track,
          style,
          { backgroundColor: trackColor }
        ]}
      >
        <View
          ref={this._setProgressRef}
          style={[
            styles.progress,
            indeterminate && styles.animation,
            { backgroundColor: color }
          ]}
        />
      </View>
    );
  }

  _setProgressRef = (component) => {
    this._progressRef = component;
  }

  _updateProgressWidth = () => {
    const { indeterminate, progress } = this.props;
    const percentageProgress = indeterminate ? 50 : progress * 100;
    const width = indeterminate ? '25%' : `${percentageProgress}%`;
    this._progressRef.setNativeProps({
      style: { width }
    });
  }
}

const styles = StyleSheet.create({
  track: {
    height: 5,
    overflow: 'hidden',
    userSelect: 'none'
  },
  progress: {
    height: '100%'
  },
  animation: {
    animationDuration: '1s',
    animationName: 'rn-ProgressBar-animation',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

module.exports = applyNativeMethods(ProgressBar);
