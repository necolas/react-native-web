import Animated from '../../apis/Animated';
import applyNativeMethods from '../../modules/applyNativeMethods';
import Easing from 'animated/lib/Easing';
import StyleSheet from 'apis/StyleSheet';
import View from '../View';
import React, { Component, PropTypes } from 'react';

const rotationInterpolation = { inputRange: [ 0, 1 ], outputRange: [ '0deg', '360deg' ] };

class ActivityIndicator extends Component {
  static displayName = 'ActivityIndicator';

  static propTypes = {
    ...View.propTypes,
    animating: PropTypes.bool,
    color: PropTypes.string,
    hidesWhenStopped: PropTypes.bool,
    size: PropTypes.oneOfType([ PropTypes.oneOf([ 'small', 'large' ]), PropTypes.number ])
  };

  static defaultProps = {
    animating: true,
    color: '#1976D2',
    hidesWhenStopped: true,
    size: 'small'
  };

  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this._manageAnimation();
  }

  componentDidUpdate() {
    this._manageAnimation();
  }

  render() {
    const {
      animating,
      color,
      hidesWhenStopped,
      size,
      style,
      ...other
    } = this.props;

    const { animation } = this.state;

    const svg = (
      <svg height='100%' viewBox='0 0 32 32' width='100%'>
        <circle
          cx='16'
          cy='16'
          fill='none'
          r='14'
          strokeWidth='4'
          style={{
            stroke: color,
            opacity: 0.2
          }}
        />
        <circle
          cx='16'
          cy='16'
          fill='none'
          r='14'
          strokeWidth='4'
          style={{
            stroke: color,
            strokeDasharray: 80,
            strokeDashoffset: 60
          }}
        />
      </svg>
    );

    return (
      <View {...other}
        accessibilityRole='progressbar'
        aria-valuemax='1'
        aria-valuemin='0'
        style={[
          styles.container,
          style,
          size && { height: size, width: size }
        ]}
      >
        <Animated.View
          children={svg}
          style={[
            indicatorStyles[size],
            hidesWhenStopped && !animating && styles.hidesWhenStopped,
            {
              transform: [
                { rotate: animation.interpolate(rotationInterpolation) }
              ]
            }
          ]}
        />
      </View>
    );
  }

  _manageAnimation() {
    const { animation } = this.state;

    const cycleAnimation = () => {
      animation.setValue(0);
      Animated.timing(animation, {
        duration: 750,
        easing: Easing.inOut(Easing.linear),
        toValue: 1
      }).start((event) => {
        if (event.finished) {
          cycleAnimation();
        }
      });
    };

    if (this.props.animating) {
      cycleAnimation();
    } else {
      animation.stopAnimation();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  hidesWhenStopped: {
    visibility: 'hidden'
  }
});

const indicatorStyles = StyleSheet.create({
  small: {
    width: 20,
    height: 20
  },
  large: {
    width: 36,
    height: 36
  }
});

module.exports = applyNativeMethods(ActivityIndicator);
