import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import createDOMElement from '../../modules/createDOMElement';
import getAccessibilityRole from '../../modules/getAccessibilityRole';
import StyleSheet from '../../apis/StyleSheet';
import ViewPropTypes from './ViewPropTypes';
import { Component, PropTypes } from 'react';

const emptyObject = {};

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
    const isInAButtonView = getAccessibilityRole(this.props) === 'button' ||
      this.context.isInAButtonView;
    return isInAButtonView ? { isInAButtonView } : emptyObject;
  }

  render() {
    const {
      style,
      /* eslint-disable */
      collapsable,
      hitSlop,
      onAccessibilityTap,
      onLayout,
      onMagicTap,
      removeClippedSubviews,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    const { isInAButtonView } = this.context;
    const isButton = getAccessibilityRole(this.props) === 'button';

    otherProps.style = [styles.initial, isButton && styles.buttonOnly, style];

    const component = isInAButtonView ? 'span' : 'div';
    return createDOMElement(component, otherProps);
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
    // button and anchor resets
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
  buttonOnly: {
    appearance: 'none'
  }
});

module.exports = applyLayout(applyNativeMethods(View));
