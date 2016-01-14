import { pickProps } from '../../modules/filterObjectProps'
import debounce from 'lodash.debounce'
import React, { PropTypes } from 'react'
import ScrollViewStylePropTypes from './ScrollViewStylePropTypes'
import StyleSheet from '../../modules/StyleSheet'
import View from '../View'

const scrollViewStyleKeys = Object.keys(ScrollViewStylePropTypes)

const styles = StyleSheet.create({
  initial: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'scroll'
  },
  initialContentContainer: {
    flexGrow: 1,
    flexShrink: 1
  },
  row: {
    flexDirection: 'row'
  }
})

class ScrollView extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    contentContainerStyle: PropTypes.shape(ScrollViewStylePropTypes),
    horizontal: PropTypes.bool,
    onScroll: PropTypes.func,
    scrollEnabled: PropTypes.bool,
    scrollEventThrottle: PropTypes.number,
    style: PropTypes.shape(ScrollViewStylePropTypes)
  };

  static defaultProps = {
    contentContainerStyle: styles.initialContentContainer,
    horizontal: false,
    scrollEnabled: true,
    scrollEventThrottle: 0,
    style: styles.initial
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

    const resolvedStyle = pickProps(style, scrollViewStyleKeys)
    const resolvedContentContainerStyle = pickProps(contentContainerStyle, scrollViewStyleKeys)

    return (
      <View
        _className='ScrollView'
        onScroll={(e) => this._onScroll(e)}
        onTouchMove={(e) => this._maybePreventScroll(e)}
        onWheel={(e) => this._maybePreventScroll(e)}
        style={{
          ...styles.initial,
          ...resolvedStyle
        }}
      >
        {children ? (
          <View
            children={children}
            style={{
              ...styles.initialContentContainer,
              ...resolvedContentContainerStyle,
              ...(horizontal && styles.row)
            }}
          />
        ) : null}
      </View>
    )
  }
}

export default ScrollView
