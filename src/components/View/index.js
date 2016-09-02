import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import createDOMElement from '../../modules/createDOMElement';
import EdgeInsetsPropType from '../../propTypes/EdgeInsetsPropType';
import normalizeNativeEvent from '../../modules/normalizeNativeEvent';
import StyleSheet from '../../apis/StyleSheet';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import ViewStylePropTypes from './ViewStylePropTypes';
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

  static propTypes = {
    ...BaseComponentPropTypes,
    children: PropTypes.any,
    collapsable: PropTypes.bool,
    hitSlop: EdgeInsetsPropType,
    onClick: PropTypes.func,
    onClickCapture: PropTypes.func,
    onLayout: PropTypes.func,
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
    pointerEvents: PropTypes.oneOf([ 'auto', 'box-none', 'box-only', 'none' ]),
    style: StyleSheetPropType(ViewStylePropTypes)
  };

  static defaultProps = {
    accessible: true,
    style: {}
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
      collapsable, // eslint-disable-line
      hitSlop, // eslint-disable-line
      onLayout, // eslint-disable-line
      pointerEvents,
      style,
      ...other
    } = this.props;

    const flattenedStyle = StyleSheet.flatten(style);
    const pointerEventsStyle = pointerEvents && { pointerEvents };
    // 'View' needs to set 'flexShrink:0' only when there is no 'flex' or 'flexShrink' style provided
    const needsFlexReset = flattenedStyle.flex == null && flattenedStyle.flexShrink == null;

    const normalizedEventHandlers = eventHandlerNames.reduce((handlerProps, handlerName) => {
      const handler = this.props[handlerName];
      if (typeof handler === 'function') {
        handlerProps[handlerName] = this._normalizeEventForHandler(handler, handlerName);
      }
      return handlerProps;
    }, {});

    const component = this.context.isInAButtonView ? 'span' : 'div';
    const props = {
      ...other,
      ...normalizedEventHandlers,
      style: [
        styles.initial,
        style,
        needsFlexReset && styles.flexReset,
        pointerEventsStyle
      ]
    };

    return createDOMElement(component, props);
  }

  _normalizeEventForHandler(handler, handlerName) {
    // Browsers fire mouse events after touch events. This causes the
    // ResponderEvents and their handlers to fire twice for Touchables.
    // Auto-fix this issue by calling 'preventDefault' to cancel the mouse
    // events.
    const shouldCancelEvent = handlerName.indexOf('onResponder') === 0;

    return (e) => {
      e.nativeEvent = normalizeNativeEvent(e.nativeEvent);
      const returnValue = handler(e);
      if (shouldCancelEvent && e.cancelable) {
        e.preventDefault();
      }
      return returnValue;
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
