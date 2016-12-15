import React from 'react';
import StyleSheet from '../../apis/StyleSheet';

const roleComponents = {
  article: 'article',
  banner: 'header',
  button: 'button',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  heading: 'h1',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section'
};

const createDOMElement = (component, rnProps = {}) => {
  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityRole,
    accessible = true,
    testID,
    type,
    ...other
  } = rnProps;

  const accessibilityComponent = accessibilityRole && roleComponents[accessibilityRole];
  const Component = accessibilityComponent || component;
  const domProps = {
    ...other,
    ...StyleSheet.resolve(other)
  };
  if (!accessible) { domProps['aria-hidden'] = true; }
  if (accessibilityLabel) { domProps['aria-label'] = accessibilityLabel; }
  if (accessibilityLiveRegion) { domProps['aria-live'] = accessibilityLiveRegion; }
  if (testID) { domProps['data-testid'] = testID; }
  if (accessibilityRole) {
    domProps.role = accessibilityRole;
    if (accessibilityRole === 'button') {
      domProps.type = 'button';
    } else if (accessibilityRole === 'link' && domProps.target === '_blank') {
      domProps.rel = `${domProps.rel || ''} noopener noreferrer`;
    }
  }
  if (type) { domProps.type = type; }

  return (
    <Component {...domProps} />
  );
};

module.exports = createDOMElement;
