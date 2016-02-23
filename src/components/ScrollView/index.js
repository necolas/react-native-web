import { NativeMethodsDecorator } from '../../modules/NativeMethodsMixin'
import debounce from 'lodash.debounce'
import React, { Component, PropTypes } from 'react'
import StyleSheet from '../../apis/StyleSheet'
import View from '../View'

@NativeMethodsDecorator
export default class ScrollView extends Component {
  static propTypes = {
    children: PropTypes.any,
    contentContainerStyle: View.propTypes.style,
    horizontal: PropTypes.bool,
    onScroll: PropTypes.func,
    scrollEnabled: PropTypes.bool,
    scrollEventThrottle: PropTypes.number,
    style: View.propTypes.style
  };

  static defaultProps = {
    contentContainerStyle: {},
    horizontal: false,
    scrollEnabled: true,
    scrollEventThrottle: 0,
    style: {}
  };

  constructor(...args) {
    super(...args)
    this._debouncedOnScrollEnd = debounce(this._onScrollEnd, 100)
    this.state = {
      isScrolling: false
    }
  }

  _onScroll(e) {
    const { scrollEventThrottle } = this.props
    const { isScrolling, scrollLastTick } = this.state

    // A scroll happened, so the scroll bumps the debounce.
    this._debouncedOnScrollEnd(e)

    if (isScrolling) {
      // Scroll last tick may have changed, check if we need to notify
      if (this._shouldEmitScrollEvent(scrollLastTick, scrollEventThrottle)) {
        this._onScrollTick(e)
      }
    } else {
      // Weren't scrolling, so we must have just started
      this._onScrollStart(e)
    }
  }

  _onScrollStart() {
    this.setState({
      isScrolling: true,
      scrollLastTick: Date.now()
    })
  }

  _onScrollTick(e) {
    const { onScroll } = this.props
    this.setState({
      scrollLastTick: Date.now()
    })
    if (onScroll) onScroll(e)
  }

  _onScrollEnd(e) {
    const { onScroll } = this.props
    this.setState({
      isScrolling: false
    })
    if (onScroll) onScroll(e)
  }

  _shouldEmitScrollEvent(lastTick, eventThrottle) {
    const timeSinceLastTick = Date.now() - lastTick
    return (eventThrottle > 0 && timeSinceLastTick >= (1000 / eventThrottle))
  }

  _maybePreventScroll(e) {
    const { scrollEnabled } = this.props
    if (!scrollEnabled) e.preventDefault()
  }

  render() {
    const {
      children,
      contentContainerStyle,
      horizontal,
      style
    } = this.props

    return (
      <View
        onScroll={(e) => this._onScroll(e)}
        onTouchMove={(e) => this._maybePreventScroll(e)}
        onWheel={(e) => this._maybePreventScroll(e)}
        style={[
          styles.initial,
          style
        ]}
      >
        {children ? (
          <View
            children={children}
            style={[
              styles.initialContentContainer,
              contentContainerStyle,
              horizontal && styles.row
            ]}
          />
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  initial: {
    flex: 1,
    overflow: 'auto'
  },
  initialContentContainer: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  }
})
