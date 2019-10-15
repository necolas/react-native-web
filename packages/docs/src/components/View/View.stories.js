import PropTypes, { any, bool, func, object, oneOf, string } from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  /* test */
  accessibilityLabel: PropTypes.string,
  accessibilityLiveRegion: oneOf(['assertive', 'none', 'polite']),
  accessibilityRelationship: object,
  accessibilityRole: string,
  accessibilityState: object,
  accessible: bool,
  children: any,
  forwardedRef: any,
  hitSlop: object,
  importantForAccessibility: oneOf(['auto', 'no', 'no-hide-descendants', 'yes']),
  itemID: string,
  itemProp: string,
  itemRef: string,
  itemScope: string,
  itemType: string,
  nativeID: string,
  onBlur: func,
  onContextMenu: func,
  onFocus: func,
  onKeyDown: func,
  onKeyUp: func,
  onLayout: func,
  onMoveShouldSetResponder: func,
  onMoveShouldSetResponderCapture: func,
  onResponderGrant: func,
  onResponderMove: func,
  onResponderReject: func,
  onResponderRelease: func,
  onResponderTerminate: func,
  onResponderTerminationRequest: func,
  onStartShouldSetResponder: func,
  onStartShouldSetResponderCapture: func,
  onWheel: func,
  pointerEvents: oneOf(['auto', 'box-none', 'box-only', 'none']),
  style: object,
  testID: string
};

export default {
  title: 'Components|View',
  includeStories: []
};

export { ofProps };
export { default as onLayout } from './examples/OnLayout';
export { default as pointerEvents } from './examples/PointerEvents';
export { default as styleBorder } from './examples/StyleBorder';
export { default as styleBoxShadow } from './examples/StyleBoxShadow';
export { default as styleFlexbox } from './examples/StyleFlexbox';
export { default as styleZIndex } from './examples/StyleZIndex';
