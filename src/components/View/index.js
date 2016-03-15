import { NativeMethodsDecorator } from '../../modules/NativeMethodsMixin'
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
    accessible: true
  };

  constructor(props, context) {
    super(props, context)
    this._handleClick = this._handleClick.bind(this)
    this._handleClickCapture = this._handleClickCapture.bind(this)
    this._handleTouchCancel = this._handleTouchCancel.bind(this)
    this._handleTouchCancelCapture = this._handleTouchCancelCapture.bind(this)
    this._handleTouchEnd = this._handleTouchEnd.bind(this)
    this._handleTouchEndCapture = this._handleTouchEndCapture.bind(this)
    this._handleTouchMove = this._handleTouchMove.bind(this)
    this._handleTouchMoveCapture = this._handleTouchMoveCapture.bind(this)
    this._handleTouchStart = this._handleTouchStart.bind(this)
    this._handleTouchStartCapture = this._handleTouchStartCapture.bind(this)
  }

  render() {
    const {
      pointerEvents,
      style,
      ...other
    } = this.props

    const pointerEventsStyle = pointerEvents && { pointerEvents }

    return (
      <CoreComponent
        {...other}
        onClick={this._handleClick}
        onClickCapture={this._handleClickCapture}
        onTouchCancel={this._handleTouchCancel}
        onTouchCancelCapture={this._handleTouchCancelCapture}
        onTouchEnd={this._handleTouchEnd}
        onTouchEndCapture={this._handleTouchEndCapture}
        onTouchMove={this._handleTouchMove}
        onTouchMoveCapture={this._handleTouchMoveCapture}
        onTouchStart={this._handleTouchStart}
        onTouchStartCapture={this._handleTouchStartCapture}
        style={[
          styles.initial,
          style,
          pointerEventsStyle
        ]}
      />
    )
  }

  /**
   * React Native expects `pageX` and `pageY` to be on the `nativeEvent`, but
   * React doesn't include them for touch events.
   */
  _normalizeTouchEvent(event) {
    const { pageX, changedTouches } = event.nativeEvent
    if (pageX === undefined) {
      const { pageX, pageY } = changedTouches[0]
      event.nativeEvent.pageX = pageX
      event.nativeEvent.pageY = pageY
    }
    return event
  }

  _handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(this._normalizeTouchEvent(e))
    }
  }

  _handleClickCapture(e) {
    if (this.props.onClickCapture) {
      this.props.onClickCapture(this._normalizeTouchEvent(e))
    }
  }

  _handleTouchCancel(e) {
    if (this.props.onTouchCancel) {
      this.props.onTouchCancel(this._normalizeTouchEvent(e))
    }
  }

  _handleTouchCancelCapture(e) {
    if (this.props.onTouchCancelCapture) {
      this.props.onTouchCancelCapture(this._normalizeTouchEvent(e))
    }
  }

  _handleTouchEnd(e) {
    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(this._normalizeTouchEvent(e))
    }
  }

  _handleTouchEndCapture(e) {
    if (this.props.onTouchEndCapture) {
      this.props.onTouchEndCapture(this._normalizeTouchEvent(e))
    }
  }

  _handleTouchMove(e) {
    if (this.props.onTouchMove) {
      this.props.onTouchMove(this._normalizeTouchEvent(e))
    }
  }

  _handleTouchMoveCapture(e) {
    if (this.props.onTouchMoveCapture) {
      this.props.onTouchMoveCapture(this._normalizeTouchEvent(e))
    }
  }

  _handleTouchStart(e) {
    if (this.props.onTouchStart) {
      this.props.onTouchStart(this._normalizeTouchEvent(e))
    }
  }

  _handleTouchStartCapture(e) {
    if (this.props.onTouchStartCapture) {
      this.props.onTouchStartCapture(this._normalizeTouchEvent(e))
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
    flexShrink: 0,
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative',
    textDecoration: 'none',
    // button reset
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit'
  }
})

module.exports = View
