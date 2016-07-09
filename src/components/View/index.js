import applyNativeMethods from '../../modules/applyNativeMethods'
import createNativeComponent from '../../modules/createNativeComponent'
import normalizeNativeEvent from '../../modules/normalizeNativeEvent'
import { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import StyleSheetPropType from '../../propTypes/StyleSheetPropType'
import ViewStylePropTypes from './ViewStylePropTypes'

class View extends Component {
  static propTypes = {
    accessibilityLabel: createNativeComponent.propTypes.accessibilityLabel,
    accessibilityLiveRegion: createNativeComponent.propTypes.accessibilityLiveRegion,
    accessibilityRole: createNativeComponent.propTypes.accessibilityRole,
    accessible: createNativeComponent.propTypes.accessible,
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
    testID: createNativeComponent.propTypes.testID
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
    // 'View' needs to set 'flexShrink:0' only when there is no 'flex' or 'flexShrink' style provided
    const needsFlexReset = flattenedStyle.flex == null && flattenedStyle.flexShrink == null

    const props = {
      ...other,
      onClick: this._normalizeEventForHandler(this.props.onClick),
      onClickCapture: this._normalizeEventForHandler(this.props.onClickCapture),
      onTouchCancel: this._normalizeEventForHandler(this.props.onTouchCancel),
      onTouchCancelCapture: this._normalizeEventForHandler(this.props.onTouchCancelCapture),
      onTouchEnd: this._normalizeEventForHandler(this.props.onTouchEnd),
      onTouchEndCapture: this._normalizeEventForHandler(this.props.onTouchEndCapture),
      onTouchMove: this._normalizeEventForHandler(this.props.onTouchMove),
      onTouchMoveCapture: this._normalizeEventForHandler(this.props.onTouchMoveCapture),
      onTouchStart: this._normalizeEventForHandler(this.props.onTouchStart),
      onTouchStartCapture: this._normalizeEventForHandler(this.props.onTouchStartCapture),
      style: [
        styles.initial,
        style,
        needsFlexReset && styles.flexReset,
        pointerEventsStyle
      ]
    }

    return createNativeComponent(props)
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

applyNativeMethods(View)

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
