import React, { PropTypes } from 'react'
import StylePropTypes from '../../modules/StylePropTypes'
import StyleSheet from '../../modules/StyleSheet'

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

class CoreComponent extends React.Component {
  static propTypes = {
    accessibilityLabel: PropTypes.string,
    accessibilityLiveRegion: PropTypes.oneOf(['assertive', 'off', 'polite']),
    accessibilityRole: PropTypes.string,
    accessible: PropTypes.bool,
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    style: PropTypes.object,
    testID: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    accessible: true,
    component: 'div'
  }

  static stylePropTypes = StylePropTypes;

  render() {
    const {
      accessibilityLabel,
      accessibilityLiveRegion,
      accessibilityRole,
      accessible,
      component,
      testID,
      type,
      ...other
    } = this.props

    const Component = roleComponents[accessibilityRole] || component

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
}

export default CoreComponent
