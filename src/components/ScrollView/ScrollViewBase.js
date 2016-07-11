/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import debounce from 'lodash/debounce'
import React, { Component, PropTypes } from 'react'
import View from '../View'

/**
 * Encapsulates the Web-specific scroll throttling and disabling logic
 */
export default class ScrollViewBase extends Component {
  static propTypes = {
    ...View.propTypes,
    onMomentumScrollBegin: PropTypes.func,
    onMomentumScrollEnd: PropTypes.func,
    onScroll: PropTypes.func,
    onScrollBeginDrag: PropTypes.func,
    onScrollEndDrag: PropTypes.func,
    onTouchMove: PropTypes.func,
    onWheel: PropTypes.func,
    scrollEnabled: PropTypes.bool,
    scrollEventThrottle: PropTypes.number
  };

  static defaultProps = {
    scrollEnabled: true
  };

  constructor(props) {
    super(props)
    this._debouncedOnScrollEnd = debounce(this._handleScrollEnd, 100)
    this._state = { isScrolling: false }
  }

  _handlePreventableScrollEvent = (handler) => {
    return (e) => {
      if (!this.props.scrollEnabled) {
        e.preventDefault()
      } else {
        if (handler) handler(e)
      }
    }
  }

  _handleScroll = (e) => {
    const { scrollEventThrottle } = this.props
    // A scroll happened, so the scroll bumps the debounce.
    this._debouncedOnScrollEnd(e)
    if (this._state.isScrolling) {
      // Scroll last tick may have changed, check if we need to notify
      if (this._shouldEmitScrollEvent(this._state.scrollLastTick, scrollEventThrottle)) {
        this._handleScrollTick(e)
      }
    } else {
      // Weren't scrolling, so we must have just started
      this._handleScrollStart(e)
    }
  }

  _handleScrollStart(e) {
    this._state.isScrolling = true
    this._state.scrollLastTick = Date.now()
  }

  _handleScrollTick(e) {
    const { onScroll } = this.props
    this._state.scrollLastTick = Date.now()
    if (onScroll) onScroll(e)
  }

  _handleScrollEnd(e) {
    const { onScroll } = this.props
    this._state.isScrolling = false
    if (onScroll) onScroll(e)
  }

  _shouldEmitScrollEvent(lastTick, eventThrottle) {
    const timeSinceLastTick = Date.now() - lastTick
    return (eventThrottle > 0 && timeSinceLastTick >= (1000 / eventThrottle))
  }

  render() {
    const {
      onMomentumScrollBegin, onMomentumScrollEnd, onScrollBeginDrag, onScrollEndDrag, scrollEnabled, scrollEventThrottle, // eslint-disable-line
      ...other
    } = this.props

    return (
      <View
        {...other}
        onScroll={this._handleScroll}
        onTouchMove={this._handlePreventableScrollEvent(this.props.onTouchMove)}
        onWheel={this._handlePreventableScrollEvent(this.props.onWheel)}
      />
    )
  }
}
