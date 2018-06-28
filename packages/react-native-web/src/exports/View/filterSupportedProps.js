const whitelist = {
  accessibilityComponentType: true,
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityTraits: true,
  accessible: true,
  children: true,
  disabled: true,
  importantForAccessibility: true,
  onBlur: true,
  onContextMenu: true,
  onFocus: true,
  onMoveShouldSetResponder: true,
  onMoveShouldSetResponderCapture: true,
  onResponderEnd: true,
  onResponderGrant: true,
  onResponderMove: true,
  onResponderReject: true,
  onResponderRelease: true,
  onResponderStart: true,
  onResponderTerminate: true,
  onResponderTerminationRequest: true,
  onScrollShouldSetResponder: true,
  onScrollShouldSetResponderCapture: true,
  onSelectionChangeShouldSetResponder: true,
  onSelectionChangeShouldSetResponderCapture: true,
  onStartShouldSetResponder: true,
  onStartShouldSetResponderCapture: true,
  onTouchCancel: true,
  onTouchCancelCapture: true,
  onTouchEnd: true,
  onTouchEndCapture: true,
  onTouchMove: true,
  onTouchMoveCapture: true,
  onTouchStart: true,
  onTouchStartCapture: true,
  pointerEvents: true,
  style: true,
  testID: true,
  /* @platform web */
  onScroll: true,
  onWheel: true,
  // keyboard events
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  // mouse events (e.g, hover effects)
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOver: true,
  onMouseOut: true,
  onMouseUp: true,
  // unstable escape-hatches for web
  className: true,
  href: true,
  onClick: true,
  onClickCapture: true,
  rel: true,
  target: true
};

const filterSupportedProps = props => {
  const safeProps = {};
  for (const prop in props) {
    if (props.hasOwnProperty(prop)) {
      if (whitelist[prop] || prop.indexOf('aria-') === 0 || prop.indexOf('data-') === 0) {
        safeProps[prop] = props[prop];
      }
    }
  }
  return safeProps;
};

export default filterSupportedProps;
