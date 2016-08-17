import React from 'react'
import StyleSheet from '../../apis/StyleSheet'

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
}

const createDOMElement = (component, rnProps = {}) => {
  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityRole,
    accessible = true,
    testID,
    type,
    ...other
  } = rnProps

  const accessibilityComponent = accessibilityRole && roleComponents[accessibilityRole]
  const Component = accessibilityComponent || component

  return (
    <Component
      {...other}
      {...StyleSheet.resolve(other)}
      aria-hidden={accessible ? null : true}
      aria-label={accessibilityLabel}
      aria-live={accessibilityLiveRegion}
      data-testid={testID}
      role={accessibilityRole}
      type={accessibilityRole === 'button' ? 'button' : type}
    />
  )
}

module.exports = createDOMElement
