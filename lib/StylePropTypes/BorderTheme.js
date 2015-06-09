import {PropTypes} from 'react';

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
  borderRadius: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  borderTopLeftRadius: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  borderTopRightRadius: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  borderBottomLeftRadius: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ]),
  borderBottomRightRadius: PropTypes.oneOfType([
    PropTypes.number, PropTypes.string
  ])
};
