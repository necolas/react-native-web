import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import StyleSheet from '../../apis/StyleSheet'
import View from '../View'

const GRAY = '#999999'

const animationEffectTimingProperties = {
  direction: 'alternate',
  duration: 700,
  easing: 'ease-in-out',
  fill: 'forwards',
  iterations: Infinity
}

const keyframeEffects = [
  { transform: 'scale(1)', opacity: 1.0 },
  { transform: 'scale(0.95)', opacity: 0.5 }
]

export default class ActivityIndicator extends Component {
  static propTypes = {
    animating: PropTypes.bool,
    color: PropTypes.string,
    hidesWhenStopped: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'large']),
    style: View.propTypes.style
  };

  static defaultProps = {
    animating: true,
    color: GRAY,
    hidesWhenStopped: true,
    size: 'small',
    style: {}
  };

  componentDidMount() {
    if (document.documentElement.animate) {
      this._player = ReactDOM.findDOMNode(this._indicatorRef).animate(keyframeEffects, animationEffectTimingProperties)
    }
    if (this.props.animating) {
      this._player.play()
    } else {
      this._player.cancel()
    }
  }

  componentDidUpdate() {
    if (this.props.animating) {
      this._player.play()
    } else {
      this._player.cancel()
    }
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

    return (
      <View {...other} style={[ styles.container, style ]}>
        <View
          ref={(c) => { this._indicatorRef = c }}
          style={[
            indicatorStyles[size],
            hidesWhenStopped && !animating && styles.hidesWhenStopped,
            { borderColor: color }
          ]}
        />
      </View>
    )
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
