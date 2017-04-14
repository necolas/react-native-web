import getAccessibilityRole from '../getAccessibilityRole';
import StyleSheet from '../../apis/StyleSheet';

const emptyObject = {};

const pointerEventStyles = StyleSheet.create({
  auto: {
    pointerEvents: 'auto'
  },
  'box-none': {
    pointerEvents: 'box-none'
  },
  'box-only': {
    pointerEvents: 'box-only'
  },
  none: {
    pointerEvents: 'none'
  }
});

const createDOMProps = (rnProps, resolveStyle) => {
  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessible = true,
    pointerEvents,
    style: rnStyle,
    testID,
    type,
    /* eslint-disable */
    accessibilityComponentType,
    accessibilityRole,
    accessibilityTraits,
    /* eslint-enable */
    ...domProps
  } =
    rnProps || emptyObject;

  const pointerEventStyle = pointerEvents && pointerEventStyles[pointerEvents];
  const { className, style } = resolveStyle([rnStyle, pointerEventStyle]) || emptyObject;
  const role = getAccessibilityRole(rnProps || emptyObject);

  if (!accessible) {
    domProps['aria-hidden'] = true;
  }
  if (accessibilityLabel) {
    domProps['aria-label'] = accessibilityLabel;
  }
  if (typeof accessibilityLiveRegion === 'string') {
    domProps['aria-live'] = accessibilityLiveRegion === 'none' ? 'off' : accessibilityLiveRegion;
  }
  if (className && className !== '') {
    domProps.className = domProps.className ? `${domProps.className} ${className}` : className;
  }
  if (role) {
    domProps.role = role;
    if (role === 'button') {
      domProps.type = 'button';
    } else if (role === 'link' && domProps.target === '_blank') {
      domProps.rel = `${domProps.rel || ''} noopener noreferrer`;
    }
  }
  if (style) {
    domProps.style = style;
  }
  if (testID) {
    domProps['data-testid'] = testID;
  }
  if (type) {
    domProps.type = type;
  }

  return domProps;
};

module.exports = createDOMProps;
