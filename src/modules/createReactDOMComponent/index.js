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

const createReactDOMComponent = ({
  accessibilityLabel,
  accessibilityLiveRegion,
  accessibilityRole,
  accessible = true,
  component = 'div',
  testID,
  type,
  ...other
}) => {
  const role = accessibilityRole
  const Component = role && roleComponents[role] ? roleComponents[role] : component

  return (
    <Component
      {...other}
      {...StyleSheet.resolve(other)}
      aria-hidden={accessible ? null : true}
      aria-label={accessibilityLabel}
      aria-live={accessibilityLiveRegion}
      data-testid={testID}
      role={role}
      type={role === 'button' ? 'button' : type}
    />
  )
}

createReactDOMComponent.propTypes = {
  accessibilityLabel: PropTypes.string,
  accessibilityLiveRegion: PropTypes.oneOf([ 'assertive', 'off', 'polite' ]),
  accessibilityRole: PropTypes.string,
  accessible: PropTypes.bool,
  component: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  testID: PropTypes.string,
  type: PropTypes.string
}

module.exports = createReactDOMComponent
