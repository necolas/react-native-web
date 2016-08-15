import Animated from '../../apis/Animated'
import applyNativeMethods from '../../modules/applyNativeMethods'
import Easing from 'animated/lib/Easing'
import React, { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import View from '../View'

const GRAY = '#999999'
const opacityInterpolation = { inputRange: [ 0, 1 ], outputRange: [ 0.5, 1 ] }
const scaleInterpolation = { inputRange: [ 0, 1 ], outputRange: [ 0.95, 1 ] }

class ActivityIndicator extends Component {
  static propTypes = {
    animating: PropTypes.bool,
    color: PropTypes.string,
    hidesWhenStopped: PropTypes.bool,
    size: PropTypes.oneOf([ 'small', 'large' ]),
    style: View.propTypes.style
  };

  static defaultProps = {
    animating: true,
    color: GRAY,
    hidesWhenStopped: true,
    size: 'small',
    style: {}
  };

  constructor(props) {
    super(props)
    this.state = {
      animation: new Animated.Value(1)
    }
  }

  componentDidMount() {
    this._manageAnimation()
  }

  componentDidUpdate() {
    this._manageAnimation()
  }

  render() {
    const {
      animating,
      color,
      hidesWhenStopped,
      size,
      style,
      ...other
    } = this.props

    const { animation } = this.state

    return (
      <View {...other} style={[ styles.container, style ]}>
        <Animated.View
          style={[
            indicatorStyles[size],
            hidesWhenStopped && !animating && styles.hidesWhenStopped,
            {
              borderColor: color,
              opacity: animation.interpolate(opacityInterpolation),
              transform: [ { scale: animation.interpolate(scaleInterpolation) } ]
            }
          ]}
        />
      </View>
    )
  }

  _manageAnimation() {
    const { animation } = this.state

    const cycleAnimation = () => {
      Animated.sequence([
        Animated.timing(animation, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          toValue: 0
        }),
        Animated.timing(animation, {
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          toValue: 1
        })
      ]).start((event) => {
        if (event.finished) {
          cycleAnimation()
        }
      })
    }

    if (this.props.animating) {
      cycleAnimation()
    } else {
      animation.stopAnimation()
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
})

const indicatorStyles = StyleSheet.create({
  small: {
    borderRadius: 100,
    borderWidth: 3,
    width: 20,
    height: 20
  },
  large: {
    borderRadius: 100,
    borderWidth: 4,
    width: 36,
    height: 36
  }
})

module.exports = applyNativeMethods(ActivityIndicator)
