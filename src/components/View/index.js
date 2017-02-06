import '../../modules/injectResponderEventPlugin';

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import createDOMElement from '../../modules/createDOMElement';
import normalizeNativeEvent from '../../modules/normalizeNativeEvent';
import StyleSheet from '../../apis/StyleSheet';
import ViewPropTypes from './ViewPropTypes';
import { Component, PropTypes } from 'react';

const eventHandlerNames = [
  'onClick',
  'onClickCapture',
  'onMoveShouldSetResponder',
  'onMoveShouldSetResponderCapture',
  'onResponderGrant',
  'onResponderMove',
  'onResponderReject',
  'onResponderRelease',
  'onResponderTerminate',
  'onResponderTerminationRequest',
  'onStartShouldSetResponder',
  'onStartShouldSetResponderCapture',
  'onTouchCancel',
  'onTouchCancelCapture',
  'onTouchEnd',
  'onTouchEndCapture',
  'onTouchMove',
  'onTouchMoveCapture',
  'onTouchStart',
  'onTouchStartCapture'
];

class View extends Component {
  static displayName = 'View';

  static propTypes = ViewPropTypes;

  static defaultProps = {
    accessible: true
  };

  static childContextTypes = {
    isInAButtonView: PropTypes.bool
  };

  static contextTypes = {
    isInAButtonView: PropTypes.bool
  };

  getChildContext() {
    return {
      isInAButtonView: this.props.accessibilityRole === 'button'
    };
  }

  render() {
    const {
      pointerEvents,
      style,
      /* eslint-disable */
      accessibilityComponentType,
      accessibilityTraits,
      collapsable,
      hitSlop,
      onAccessibilityTap,
      onLayout,
      onMagicTap,
      removeClippedSubviews,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    const flattenedStyle = StyleSheet.flatten(style);
    const pointerEventsStyle = pointerEvents && { pointerEvents };
    // 'View' needs to set 'flexShrink:0' only when there is no 'flex' or 'flexShrink' style provided
    const needsFlexReset = !flattenedStyle || (flattenedStyle.flex == null && flattenedStyle.flexShrink == null);

    const component = this.context.isInAButtonView ? 'span' : 'div';

    eventHandlerNames.reduce((props, handlerName) => {
      const handler = this.props[handlerName];
      if (typeof handler === 'function') {
        props[handlerName] = this._normalizeEventForHandler(handler);
      }
      return props;
    }, otherProps);

    otherProps.style = [
      styles.initial,
      style,
      needsFlexReset && styles.flexReset,
      pointerEventsStyle
    ];

    return createDOMElement(component, otherProps);
  }

  _normalizeEventForHandler(handler) {
    return (e) => {
      e.nativeEvent = normalizeNativeEvent(e.nativeEvent);
      return handler(e);
    };
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
    minHeight: 0,
    minWidth: 0
  },
  flexReset: {
    flexShrink: 0
  }
});

module.exports = applyLayout(applyNativeMethods(View));
