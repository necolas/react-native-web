import React, { PropTypes } from 'react'
import Tappable from 'react-tappable'

class Touchable extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isActive: false
    }
  }

  static propTypes = {
    activeHighlight: PropTypes.string,
    activeOpacity: PropTypes.number,
    children: PropTypes.element,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    onLongPress: PropTypes.func,
    onPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func
  }

  static defaultProps = {
    activeHighlight: 'transparent',
    activeOpacity: 1,
    component: 'div',
    delayLongPress: 1000,
    delayPressIn: 0,
    delayPressOut: 0
  }

  _onLongPress(e) {
    if (this.props.onLongPress) this.props.onLongPress(e)
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

  _getChildren() {
    const { activeOpacity, children } = this.props
    return React.cloneElement(React.Children.only(children), {
      style: { ...children.props.style, ...(this.state.isActive ? { opacity: activeOpacity } : {}) }
    })
  }

  render() {
    const {
      activeHighlight,
      component,
      delayLongPress
    } = this.props

    return (
      <Tappable
        children={this._getChildren()}
        component={component}
        onMouseDown={this._onPressIn.bind(this)}
        onMouseUp={this._onPressOut.bind(this)}
        onPress={this._onLongPress.bind(this)}
        onTap={this._onPress.bind(this)}
        onTouchEnd={this._onPressOut.bind(this)}
        onTouchStart={this._onPressIn.bind(this)}
        pressDelay={delayLongPress}
        pressMoveThreshold={5}
        style={{ backgroundColor: this.state.isActive ? activeHighlight : null }}
      />
    )
  }
}

export default Touchable
