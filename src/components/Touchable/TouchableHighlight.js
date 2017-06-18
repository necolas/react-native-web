/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule TouchableHighlight
 * @noflow
 */

import ColorPropType from '../../propTypes/ColorPropType';
import createReactClass from 'create-react-class';
import ensureComponentIsNative from './ensureComponentIsNative';
import ensurePositiveDelayProps from './ensurePositiveDelayProps';
import NativeMethodsMixin from '../../modules/NativeMethodsMixin';
import React from 'react';
import StyleSheet from '../../apis/StyleSheet';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TimerMixin from 'react-timer-mixin';
import Touchable from './Touchable';
import TouchableWithoutFeedback from './TouchableWithoutFeedback';
import View from '../View';
import ViewStylePropTypes from '../View/ViewStylePropTypes';
import { func, number } from 'prop-types';

type Event = Object;

const DEFAULT_PROPS = {
  activeOpacity: 0.85,
  underlayColor: 'black'
};

const PRESS_RETENTION_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, which allows
 * the underlay color to show through, darkening or tinting the view.  The
 * underlay comes from adding a view to the view hierarchy, which can sometimes
 * cause unwanted visual artifacts if not used correctly, for example if the
 * backgroundColor of the wrapped view isn't explicitly set to an opaque color.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableHighlight onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton')}
 *       />
 *     </TouchableHighlight>
 *   );
 * },
 * ```
 * > **NOTE**: TouchableHighlight must have one child (not zero or more than one)
 * >
 * > If you wish to have several child components, wrap them in a View.
 */

const TouchableHighlight = createReactClass({
  propTypes: {
    ...TouchableWithoutFeedback.propTypes,
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
    activeOpacity: number,
    /**
     * The color of the underlay that will show through when the touch is
     * active.
     */
    underlayColor: ColorPropType,
    style: StyleSheetPropType(ViewStylePropTypes),
    /**
     * Called immediately after the underlay is shown
     */
    onShowUnderlay: func,
    /**
     * Called immediately after the underlay is hidden
     */
    onHideUnderlay: func
  },

  mixins: [NativeMethodsMixin, TimerMixin, Touchable.Mixin],

  getDefaultProps: () => DEFAULT_PROPS,

  // Performance optimization to avoid constantly re-generating these objects.
  computeSyntheticState: props => {
    const { activeOpacity, style, underlayColor } = props;
    return {
      activeProps: {
        style: {
          opacity: activeOpacity
        }
      },
      activeUnderlayProps: {
        style: {
          backgroundColor: underlayColor
        }
      },
      underlayStyle: [INACTIVE_UNDERLAY_PROPS.style, props.style]
    };
  },

  getInitialState: function() {
    return {
      ...this.touchableGetInitialState(),
      ...this.computeSyntheticState(this.props)
    };
  },

  componentDidMount: function() {
    ensurePositiveDelayProps(this.props);
    ensureComponentIsNative(this.refs[CHILD_REF]);
    this._isMounted = true;
  },

  componentDidUpdate: function() {
    ensureComponentIsNative(this.refs[CHILD_REF]);
  },

  componentWillReceiveProps: function(nextProps) {
    ensurePositiveDelayProps(nextProps);
    if (
      nextProps.activeOpacity !== this.props.activeOpacity ||
      nextProps.underlayColor !== this.props.underlayColor ||
      nextProps.style !== this.props.style
    ) {
      this.setState(this.computeSyntheticState(nextProps));
    }
  },

  componentWillUnmount: function() {
    this._isMounted = false;
  },

  // viewConfig: {
  //   uiViewClassName: 'RCTView',
  //   validAttributes: ReactNativeViewAttributes.RCTView
  // },

  /**
   * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
   * defined on your component.
   */
  touchableHandleActivePressIn: function(e: Event) {
    this.clearTimeout(this._hideTimeout);
    this._hideTimeout = null;
    this._showUnderlay();
    this.props.onPressIn && this.props.onPressIn(e);
  },

  touchableHandleActivePressOut: function(e: Event) {
    if (!this._hideTimeout) {
      this._hideUnderlay();
    }
    this.props.onPressOut && this.props.onPressOut(e);
  },

  touchableHandlePress: function(e: Event) {
    this.clearTimeout(this._hideTimeout);
    this._showUnderlay();
    this._hideTimeout = this.setTimeout(this._hideUnderlay, this.props.delayPressOut || 100);
    this.props.onPress && this.props.onPress(e);
  },

  touchableHandleLongPress: function(e: Event) {
    this.props.onLongPress && this.props.onLongPress(e);
  },

  touchableGetPressRectOffset: function() {
    return this.props.pressRetentionOffset || PRESS_RETENTION_OFFSET;
  },

  touchableGetHitSlop: function() {
    return this.props.hitSlop;
  },

  touchableGetHighlightDelayMS: function() {
    return this.props.delayPressIn;
  },

  touchableGetLongPressDelayMS: function() {
    return this.props.delayLongPress;
  },

  touchableGetPressOutDelayMS: function() {
    return this.props.delayPressOut;
  },

  _showUnderlay: function() {
    if (!this._isMounted || !this._hasPressHandler()) {
      return;
    }

    this.refs[UNDERLAY_REF].setNativeProps(this.state.activeUnderlayProps);
    this.refs[CHILD_REF].setNativeProps(this.state.activeProps);
    this.props.onShowUnderlay && this.props.onShowUnderlay();
  },

  _hideUnderlay: function() {
    this.clearTimeout(this._hideTimeout);
    this._hideTimeout = null;
    if (this._hasPressHandler() && this.refs[UNDERLAY_REF]) {
      this.refs[CHILD_REF].setNativeProps(INACTIVE_CHILD_PROPS);
      this.refs[UNDERLAY_REF].setNativeProps({
        ...INACTIVE_UNDERLAY_PROPS,
        style: this.state.underlayStyle
      });
      this.props.onHideUnderlay && this.props.onHideUnderlay();
    }
  },

  _hasPressHandler: function() {
    return !!(
      this.props.onPress ||
      this.props.onPressIn ||
      this.props.onPressOut ||
      this.props.onLongPress
    );
  },

  _onKeyEnter(e, callback) {
    const ENTER = 13;
    if ((e.type === 'keypress' ? e.charCode : e.keyCode) === ENTER) {
      callback && callback(e);
      e.stopPropagation();
    }
  },

  render: function() {
    const {
      /* eslint-disable */
      activeOpacity,
      onHideUnderlay,
      onShowUnderlay,
      underlayColor,
      delayLongPress,
      delayPressIn,
      delayPressOut,
      onLongPress,
      onPress,
      onPressIn,
      onPressOut,
      pressRetentionOffset,
      /* eslint-enable */
      ...other
    } = this.props;

    return (
      <View
        {...other}
        accessible={this.props.accessible !== false}
        onKeyDown={e => {
          this._onKeyEnter(e, this.touchableHandleActivePressIn);
        }}
        onKeyPress={e => {
          this._onKeyEnter(e, this.touchableHandlePress);
        }}
        onKeyUp={e => {
          this._onKeyEnter(e, this.touchableHandleActivePressOut);
        }}
        onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
        onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
        onResponderGrant={this.touchableHandleResponderGrant}
        onResponderMove={this.touchableHandleResponderMove}
        onResponderRelease={this.touchableHandleResponderRelease}
        onResponderTerminate={this.touchableHandleResponderTerminate}
        ref={UNDERLAY_REF}
        style={[styles.root, this.props.disabled && styles.disabled, this.state.underlayStyle]}
      >
        {React.cloneElement(React.Children.only(this.props.children), {
          ref: CHILD_REF
        })}
        {Touchable.renderDebugView({ color: 'green', hitSlop: this.props.hitSlop })}
      </View>
    );
  }
});

var CHILD_REF = 'childRef';
var UNDERLAY_REF = 'underlayRef';

var INACTIVE_CHILD_PROPS = {
  style: StyleSheet.create({ x: { opacity: 1.0 } }).x
};
var INACTIVE_UNDERLAY_PROPS = {
  style: StyleSheet.create({ x: { backgroundColor: 'transparent' } }).x
};

var styles = StyleSheet.create({
  root: {
    cursor: 'pointer',
    userSelect: 'none'
  },
  disabled: {
    cursor: 'default'
  }
});

export default TouchableHighlight;
