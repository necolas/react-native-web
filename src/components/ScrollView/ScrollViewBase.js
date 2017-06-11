/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import debounce from 'debounce';
import findNodeHandle from '../../modules/findNodeHandle';
import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';
import React, { Component } from 'react';
import { bool, func, number } from 'prop-types';

const normalizeScrollEvent = e => ({
  nativeEvent: {
    contentOffset: {
      get x() {
        return e.target.scrollLeft;
      },
      get y() {
        return e.target.scrollTop;
      }
    },
    contentSize: {
      get height() {
        return e.target.scrollHeight;
      },
      get width() {
        return e.target.scrollWidth;
      }
    },
    layoutMeasurement: {
      get height() {
        return e.target.offsetHeight;
      },
      get width() {
        return e.target.offsetWidth;
      }
    }
  },
  timeStamp: Date.now()
});

/**
 * Encapsulates the Web-specific scroll throttling and disabling logic
 */
export default class ScrollViewBase extends Component {
  static propTypes = {
    ...ViewPropTypes,
    onMomentumScrollBegin: func,
    onMomentumScrollEnd: func,
    onScroll: func,
    onScrollBeginDrag: func,
    onScrollEndDrag: func,
    onTouchMove: func,
    onWheel: func,
    removeClippedSubviews: bool,
    scrollEnabled: bool,
    scrollEventThrottle: number,
    showsHorizontalScrollIndicator: bool,
    showsVerticalScrollIndicator: bool
  };

  static defaultProps = {
    scrollEnabled: true,
    scrollEventThrottle: 0
  };

  _debouncedOnScrollEnd = debounce(this._handleScrollEnd, 100);
  _state = { isScrolling: false, scrollLastTick: 0 };
  _node = null;

  componentDidMount() {
    this._node && this._node.addEventListener('scroll', this._handleScroll);
    this._node && this._node.addEventListener('touchmove', this._handlePreventableTouchMove);
    this._node && this._node.addEventListener('wheel', this._handlePreventableWheel);
  }

  componentWillUnmount() {
    this._node && this._node.removeEventListener('scroll', this._handleScroll);
    this._node && this._node.removeEventListener('touchmove', this._handlePreventableTouchMove);
    this._node && this._node.removeEventListener('wheel', this._handlePreventableWheel);
  }

  _createPreventableScrollHandler = (handler: Function) => {
    return (e: Object) => {
      if (!this.props.scrollEnabled) {
        e.preventDefault();
      } else {
        if (handler) {
          handler(e);
        }
      }
    };
  };

  _handlePreventableTouchMove = (e: Object) => {
    this._createPreventableScrollHandler(this.props.onTouchMove)(e);
  };

  _handlePreventableWheel = (e: Object) => {
    this._createPreventableScrollHandler(this.props.onWheel)(e);
  };

  _handleScroll = (e: Object) => {
    e.stopPropagation();
    const { scrollEventThrottle } = this.props;
    // A scroll happened, so the scroll bumps the debounce.
    this._debouncedOnScrollEnd(e);
    if (this._state.isScrolling) {
      // Scroll last tick may have changed, check if we need to notify
      if (this._shouldEmitScrollEvent(this._state.scrollLastTick, scrollEventThrottle)) {
        this._handleScrollTick(e);
      }
    } else {
      // Weren't scrolling, so we must have just started
      this._handleScrollStart(e);
    }
  };

  _handleScrollStart(e: Object) {
    this._state.isScrolling = true;
    this._state.scrollLastTick = Date.now();
  }

  _handleScrollTick(e: Object) {
    const { onScroll } = this.props;
    this._state.scrollLastTick = Date.now();
    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  }

  _handleScrollEnd(e: Object) {
    const { onScroll } = this.props;
    this._state.isScrolling = false;
    if (onScroll) {
      onScroll(normalizeScrollEvent(e));
    }
  }

  _setNodeRef = (element:View) => {
    this._node = findNodeHandle(element);
  };

  _shouldEmitScrollEvent(lastTick: number, eventThrottle: number) {
    const timeSinceLastTick = Date.now() - lastTick;
    return eventThrottle > 0 && timeSinceLastTick >= eventThrottle;
  }

  render() {
    const {
      /* eslint-disable */
      onMomentumScrollBegin,
      onMomentumScrollEnd,
      onScroll,
      onScrollBeginDrag,
      onScrollEndDrag,
      onTouchMove,
      onWheel,
      removeClippedSubviews,
      scrollEnabled,
      scrollEventThrottle,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      /* eslint-enable */
      ...other
    } = this.props;

    return <View {...other} ref={this._setNodeRef} />;
  }
}
