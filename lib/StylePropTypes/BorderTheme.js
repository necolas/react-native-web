import {PropTypes} from 'react';

const numberOrString = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);

export default {
  // border-color
  borderColor: PropTypes.string,
  borderTopColor: PropTypes.string,
  borderRightColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  borderLeftColor: PropTypes.string,
  // border-style
  borderStyle: PropTypes.string,
  // border-radius
  borderRadius: numberOrString,
  borderTopLeftRadius: numberOrString,
  borderTopRightRadius: numberOrString,
  borderBottomLeftRadius: numberOrString,
  borderBottomRightRadius: numberOrString
};
