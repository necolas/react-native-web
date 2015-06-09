import {PropTypes} from 'react';

export default {
  boxSizing: PropTypes.oneOf([
    'border-box',
    'content-box'
  ]),
  // display
  display: PropTypes.oneOf([
    'block',
    'flex',
    'inline',
    'inline-block',
    'inline-flex'
  ]),
  // dimensions
  height: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  // border width
  borderWidth: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  borderTopWidth: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  borderRightWidth: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  borderBottomWidth: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  borderLeftWidth: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  // margin
  margin: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  marginTop: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  marginBottom: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  marginLeft: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  marginRight: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  // padding
  padding: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  paddingTop: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  paddingBottom: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  paddingLeft: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  paddingRight: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ])
};
