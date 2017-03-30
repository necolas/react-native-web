import { PropTypes } from 'react';
const { array, bool, number, object, oneOf, oneOfType, string } = PropTypes;

const BaseComponentPropTypes = {
  accessibilityLabel: string,
  accessibilityLiveRegion: oneOf(['assertive', 'none', 'polite']),
  accessibilityRole: string,
  accessible: bool,
  style: oneOfType([array, number, object]),
  testID: string
};

module.exports = BaseComponentPropTypes;
