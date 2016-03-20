import NativeMethodsDecorator from '../../modules/NativeMethodsDecorator'
import normalizeNativeEvent from '../../apis/PanResponder/normalizeNativeEvent'
import CoreComponent from '../CoreComponent'
import React, { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import StyleSheetPropType from '../../apis/StyleSheet/StyleSheetPropType'
import ViewStylePropTypes from './ViewStylePropTypes'

@NativeMethodsDecorator
class View extends Component {
  static propTypes = {
    accessibilityLabel: CoreComponent.propTypes.accessibilityLabel,
    accessibilityLiveRegion: CoreComponent.propTypes.accessibilityLiveRegion,
    accessibilityRole: CoreComponent.propTypes.accessibilityRole,
    accessible: CoreComponent.propTypes.accessible,
    children: PropTypes.any,
    onClick: PropTypes.func,
    onClickCapture: PropTypes.func,
    onMoveShouldSetResponder: PropTypes.func,
    onMoveShouldSetResponderCapture: PropTypes.func,
    onResponderGrant: PropTypes.func,
    onResponderMove: PropTypes.func,
    onResponderReject: PropTypes.func,
    onResponderRelease: PropTypes.func,
    onResponderTerminate: PropTypes.func,
    onResponderTerminationRequest: PropTypes.func,
    onStartShouldSetResponder: PropTypes.func,
    onStartShouldSetResponderCapture: PropTypes.func,
    onTouchCancel: PropTypes.func,
    onTouchCancelCapture: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchEndCapture: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchMoveCapture: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchStartCapture: PropTypes.func,
    pointerEvents: PropTypes.oneOf(['auto', 'box-none', 'box-only', 'none']),
    style: StyleSheetPropType(ViewStylePropTypes),
    testID: CoreComponent.propTypes.testID
  };

  static defaultProps = {
    accessible: true,
    style: {}
  };

  constructor(props, context) {
    super(props, context)
    this._normalizeEventForHandler = this._normalizeEventForHandler.bind(this)
  }

  render() {
    const {
      pointerEvents,
      style,
      ...other
    } = this.props

    const flattenedStyle = StyleSheet.flatten(style)
    const pointerEventsStyle = pointerEvents && { pointerEvents }

    return (
      <CoreComponent
        {...other}
        onClick={this._handleClick}
        onClickCapture={this._normalizeEventForHandler(this.props.onClickCapture)}
        onTouchCancel={this._normalizeEventForHandler(this.props.onTouchCancel)}
        onTouchCancelCapture={this._normalizeEventForHandler(this.props.onTouchCancelCapture)}
        onTouchEnd={this._normalizeEventForHandler(this.props.onTouchEnd)}
        onTouchEndCapture={this._normalizeEventForHandler(this.props.onTouchEndCapture)}
        onTouchMove={this._normalizeEventForHandler(this.props.onTouchMove)}
        onTouchMoveCapture={this._normalizeEventForHandler(this.props.onTouchMoveCapture)}
        onTouchStart={this._normalizeEventForHandler(this.props.onTouchStart)}
        onTouchStartCapture={this._normalizeEventForHandler(this.props.onTouchStartCapture)}
        style={[
          styles.initial,
          style,
          // 'View' needs to use 'flexShrink' in its reset when there is no 'flex' style provided
          flattenedStyle.flex == null && styles.flexReset,
          pointerEventsStyle
        ]}
      />
    )
  }

  /**
   * React Native expects `pageX` and `pageY` to be on the `nativeEvent`, but
   * React doesn't include them for touch events.
   */
  _normalizeEventForHandler(handler) {
    return (e) => {
      const { pageX } = e.nativeEvent
      if (pageX === undefined) {
        e.nativeEvent = normalizeNativeEvent(e.nativeEvent)
      }
      handler && handler(e)
    }
  }
}

const styles = StyleSheet.create({
  // https://github.com/facebook/css-layout#default-values
  initial: {
    alignItems: 'stretch',
    borderWidth: 0,
    borderStyle: 'solid',
    boxSizing: 'border-box',
    display: 'flex',
    flexBasis: 'auto',
    flexDirection: 'column',
    margin: 0,
    padding: 0,
    position: 'relative',
    // button and anchor reset
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit',
    textDecorationLine: 'none',
    // list reset
    listStyle: 'none',
    // fix flexbox bugs
    maxWidth: '100%',
    minHeight: 0,
    minWidth: 0
  },
  flexReset: {
    flexShrink: 0
  }
})

module.exports = View
