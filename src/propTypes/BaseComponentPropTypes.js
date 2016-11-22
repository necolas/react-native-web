import { PropTypes } from 'react';
const { array, bool, number, object, oneOf, oneOfType, string } = PropTypes;

const BaseComponentPropTypes = process.env.NODE_ENV !== 'production' ? {
  accessibilityLabel: string,
  accessibilityLiveRegion: oneOf([ 'assertive', 'off', 'polite' ]),
  accessibilityRole: string,
  accessible: bool,
  style: oneOfType([ array, number, object ]),
  testID: string
} : {};

module.exports = BaseComponentPropTypes;
