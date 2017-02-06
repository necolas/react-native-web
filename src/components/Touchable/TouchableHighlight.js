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
'use strict';

// Note (avik): add @flow when Flow supports spread properties in propTypes

var ColorPropType = require('../../propTypes/ColorPropType');
var NativeMethodsMixin = require('../../modules/NativeMethodsMixin');
var React = require('react');
var StyleSheet = require('../../apis/StyleSheet');
var StyleSheetPropType = require('../../propTypes/StyleSheetPropType');
var TimerMixin = require('react-timer-mixin');
var Touchable = require('./Touchable');
var TouchableWithoutFeedback = require('./TouchableWithoutFeedback');
var View = require('../View');
var ViewStylePropTypes = require('../View/ViewStylePropTypes');

var ensureComponentIsNative = require('./ensureComponentIsNative');
var ensurePositiveDelayProps = require('./ensurePositiveDelayProps');
var TouchableWithoutFeedbackPropTypes = TouchableWithoutFeedback.propTypes

type Event = Object;

var DEFAULT_PROPS = {
  accessibilityRole: 'button',
  activeOpacity: 0.85,
  underlayColor: 'black'
};

var PRESS_RETENTION_OFFSET = {top: 20, left: 20, right: 20, bottom: 30};

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

var TouchableHighlight = React.createClass({
  propTypes: {
    ...TouchableWithoutFeedbackPropTypes,
    /**
     * Determines what the opacity of the wrapped view should be when touch is
     * active.
     */
    activeOpacity: React.PropTypes.number,
    /**
     * The color of the underlay that will show through when the touch is
     * active.
     */
    underlayColor: ColorPropType,
    style: StyleSheetPropType(ViewStylePropTypes),
    /**
     * Called immediately after the underlay is shown
     */
    onShowUnderlay: React.PropTypes.func,
    /**
     * Called immediately after the underlay is hidden
     */
    onHideUnderlay: React.PropTypes.func,
  },

  mixins: [NativeMethodsMixin, TimerMixin, Touchable.Mixin],

  getDefaultProps: () => DEFAULT_PROPS,

  // Performance optimization to avoid constantly re-generating these objects.
  computeSyntheticState: (props) => {
    const { activeOpacity, style, underlayColor } = props;
    return {
      activeProps: {
        style: {
          opacity: activeOpacity,
        }
      },
      activeUnderlayProps: {
        style: {
          backgroundColor: underlayColor,
        }
      },
      underlayStyle: [
        INACTIVE_UNDERLAY_PROPS.style,
        props.style,
      ]
    };
  },

  getInitialState: function() {
    return { ...this.touchableGetInitialState(), ...this.computeSyntheticState(this.props) }
  },

  componentDidMount: function() {
    ensurePositiveDelayProps(this.props);
    ensureComponentIsNative(this.refs[CHILD_REF]);
  },

  componentDidUpdate: function() {
    ensureComponentIsNative(this.refs[CHILD_REF]);
  },

  componentWillReceiveProps: function(nextProps) {
    ensurePositiveDelayProps(nextProps);
    if (nextProps.activeOpacity !== this.props.activeOpacity ||
        nextProps.underlayColor !== this.props.underlayColor ||
        nextProps.style !== this.props.style) {
      this.setState(this.computeSyntheticState(nextProps));
    }
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
    this._hideTimeout = this.setTimeout(this._hideUnderlay,
      this.props.delayPressOut || 100);
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
    if (!this.isMounted() || !this._hasPressHandler()) {
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
        style: this.state.underlayStyle,
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
    var ENTER = 13
    if (e.keyCode === ENTER) {
      callback && callback(e)
    }
  },

  render: function() {
    return (
      <View
        accessible={true}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityRole={this.props.accessibilityRole}
        disabled={this.props.disabled}
        hitSlop={this.props.hitSlop}
        onKeyDown={(e) => { this._onKeyEnter(e, this.touchableHandleActivePressIn) }}
        onKeyPress={(e) => { this._onKeyEnter(e, this.touchableHandlePress) }}
        onKeyUp={(e) => { this._onKeyEnter(e, this.touchableHandleActivePressOut) }}
        onLayout={this.props.onLayout}
        onStartShouldSetResponder={this.touchableHandleStartShouldSetResponder}
        onResponderTerminationRequest={this.touchableHandleResponderTerminationRequest}
        onResponderGrant={this.touchableHandleResponderGrant}
        onResponderMove={this.touchableHandleResponderMove}
        onResponderRelease={this.touchableHandleResponderRelease}
        onResponderTerminate={this.touchableHandleResponderTerminate}
        ref={UNDERLAY_REF}
        style={[
          styles.root,
          this.props.disabled && styles.disabled,
          this.state.underlayStyle
        ]}
        tabIndex={this.props.disabled ? null : '0'}
        testID={this.props.testID}>
        {React.cloneElement(
          React.Children.only(this.props.children),
          {
            ref: CHILD_REF,
          }
        )}
      </View>
    );
  }
});

var CHILD_REF = 'childRef';
var UNDERLAY_REF = 'underlayRef';

var INACTIVE_CHILD_PROPS = {
  style: StyleSheet.create({x: {opacity: 1.0}}).x,
};
var INACTIVE_UNDERLAY_PROPS = {
  style: StyleSheet.create({x: {backgroundColor: 'transparent'}}).x,
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

module.exports = TouchableHighlight;
