import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import createDOMElement from '../../modules/createDOMElement';
import getAccessibilityRole from '../../modules/getAccessibilityRole';
import StyleSheet from '../../apis/StyleSheet';
import ViewPropTypes from './ViewPropTypes';
import React, { Component, PropTypes } from 'react';

const emptyObject = {};

const calculateHitSlopStyle = hitSlop => {
  const hitStyle = {};
  for (const prop in hitSlop) {
    if (hitSlop.hasOwnProperty(prop)) {
      const value = hitSlop[prop];
      hitStyle[prop] = value > 0 ? (-1) * value : 0;
    }
  }
  return hitStyle;
};

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
      hitSlop,
      style,
      /* eslint-disable */
      collapsable,
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

    if (hitSlop) {
      const hitSlopStyle = calculateHitSlopStyle(hitSlop);
      const hitSlopChild = createDOMElement('span', { style: [styles.hitSlop, hitSlopStyle] });
      otherProps.children = React.Children.toArray(otherProps.children);
      otherProps.children.unshift(hitSlopChild);
      otherProps.style.unshift(styles.hasHitSlop);
    }

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
  },
  // this zIndex ordering positions the hitSlop above the View but behind
  // its children
  hasHitSlop: {
    zIndex: 0
  },
  hitSlop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1
  }
});

module.exports = applyLayout(applyNativeMethods(View));
