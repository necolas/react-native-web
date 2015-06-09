import {PropTypes} from 'react';

export default {
  direction: PropTypes.oneOf([
    'auto', 'ltr', 'rtl'
  ]),
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.oneOf([
     '100', '200', '300', '400', '500', '600', '700', '800', '900',
     'bold', 'normal'
  ]),
  fontStyle: PropTypes.oneOf([
    'normal', 'italic'
  ]),
  letterSpacing: PropTypes.string,
  lineHeight: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  textAlign: PropTypes.oneOf([
    'auto', 'left', 'right', 'center'
  ]),
  textDecoration: PropTypes.oneOf([
    'none', 'underline'
  ]),
  textTransform: PropTypes.oneOf([
    'capitalize', 'lowercase', 'none', 'uppercase'
  ]),
  wordWrap: PropTypes.oneOf([
    'break-word', 'normal'
  ])
};
