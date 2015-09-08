import React, { PropTypes } from 'react'
import Tappable from 'react-tappable'
import View from '../View'

class Touchable extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isActive: false
    }

    this._onLongPress = this._onLongPress.bind(this)
    this._onPress = this._onPress.bind(this)
    this._onPressIn = this._onPressIn.bind(this)
    this._onPressOut = this._onPressOut.bind(this)
  }

  static propTypes = {
    accessibilityLabel: PropTypes.string,
    accessible: PropTypes.bool,
    activeHighlight: PropTypes.string,
    activeOpacity: PropTypes.number,
    children: PropTypes.element,
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    style: View.propTypes.style
  }

  static defaultProps = {
    activeHighlight: 'transparent',
    activeOpacity: 1,
    component: 'div',
    delayLongPress: 1000,
    delayPressIn: 0,
    delayPressOut: 0,
    style: View.defaultProps.style
  }

  _getChildren() {
    const { activeOpacity, children } = this.props
    return React.cloneElement(React.Children.only(children), {
      style: {
        ...children.props.style,
        ...(this.state.isActive ? { opacity: activeOpacity } : {})
      }
    })
  }

  _onKeyEnter(e, callback) {
    var ENTER = 13
    if (e.keyCode === ENTER) {
      callback(e)
    }
  }

  _onLongPress(e) {
    const event = e
    if (this.props.onLongPress) this.props.onLongPress(event)
  }

  _onPress(e) {
    if (this.props.onPress) this.props.onPress(e)
  }

  _onPressIn(e) {
    this.setState({ isActive: true })
    if (this.props.onPressIn) this.props.onPressIn(e)
  }

  _onPressOut(e) {
    this.setState({ isActive: false })
    if (this.props.onPressOut) this.props.onPressOut(e)
  }

  render() {
    const {
      accessibilityLabel,
      accessible,
      activeHighlight,
      delayLongPress,
      style
    } = this.props

    /**
     * Creates a wrapping element that can receive beyboard focus. The
     * highlight is applied as a background color on this wrapper. The opacity
     * is set on the child element, allowing it to have its own background
     * color.
     */
    return (
      <Tappable
        accessibilityLabel={accessibilityLabel}
        accessible={accessible}
        children={this._getChildren()}
        component={View}
        onKeyDown={(e) => { this._onKeyEnter(e, this._onPressIn) }}
        onKeyPress={this._onPress}
        onKeyUp={(e) => { this._onKeyEnter(e, this._onPressOut) }}
        onMouseDown={this._onPressIn}
        onMouseUp={this._onPressOut}
        onPress={this._onLongPress}
        onTap={this._onPress}
        onTouchEnd={this._onPressOut}
        onTouchStart={this._onPressIn}
        pressDelay={delayLongPress}
        pressMoveThreshold={5}
        style={{
          ...style,
          backgroundColor: this.state.isActive ? activeHighlight : null,
          cursor: 'pointer',
          userSelect: undefined
        }}
        tabIndex='0'
      />
    )
  }
}

export default Touchable
