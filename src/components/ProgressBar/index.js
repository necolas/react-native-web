import Animated from '../../apis/Animated';
import applyNativeMethods from '../../modules/applyNativeMethods';
import ColorPropType from '../../propTypes/ColorPropType';
import StyleSheet from 'apis/StyleSheet';
import View from '../View';
import React, { Component, PropTypes } from 'react';

const indeterminateWidth = '25%';
const translateInterpolation = { inputRange: [ 0, 1 ], outputRange: [ '-100%', '400%' ] };

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

  constructor(props) {
    super(props);
    this.state = {
      animationTranslate: new Animated.Value(0)
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
      color,
      indeterminate,
      progress,
      trackColor,
      style,
      ...other
    } = this.props;

    const { animationTranslate } = this.state;

    const percentageProgress = indeterminate ? 50 : progress * 100;

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
        <Animated.View style={[
          styles.progress,
          { backgroundColor: color },
          indeterminate ? {
            transform: [
              { translateX: animationTranslate.interpolate(translateInterpolation) }
            ],
            width: indeterminateWidth
          } : {
            width: `${percentageProgress}%`
          }
        ]} />
      </View>
    );
  }

  _manageAnimation() {
    const { animationTranslate } = this.state;

    const cycleAnimation = (animation) => {
      animation.setValue(0);
      Animated.timing(animation, {
        duration: 1000,
        toValue: 1
      }).start((event) => {
        if (event.finished) {
          cycleAnimation(animation);
        }
      });
    };

    if (this.props.indeterminate) {
      cycleAnimation(animationTranslate);
    } else {
      animationTranslate.stopAnimation();
    }
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
  }
});

module.exports = applyNativeMethods(ProgressBar);
