import React, { PropTypes } from 'react'
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

const createNativeComponent = ({
  accessibilityLabel,
  accessibilityLiveRegion,
  accessibilityRole,
  accessible = true,
  component = 'div',
  testID,
  type,
  ...other
}) => {
  const Component = accessibilityRole && roleComponents[accessibilityRole] ? roleComponents[accessibilityRole] : component

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

createNativeComponent.propTypes = {
  accessibilityLabel: PropTypes.string,
  accessibilityLiveRegion: PropTypes.oneOf([ 'assertive', 'off', 'polite' ]),
  accessibilityRole: PropTypes.string,
  accessible: PropTypes.bool,
  component: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  testID: PropTypes.string,
  type: PropTypes.string
}

module.exports = createNativeComponent
