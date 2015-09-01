import { PropTypes } from 'react';

export default {
  color: PropTypes.string,
  direction: PropTypes.oneOf([
    'auto' /*default*/, 'ltr', 'rtl'
  ]),
  font: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  fontStyle: PropTypes.oneOf([
    'inherit' /*default*/, 'normal', 'italic'
  ]),
  fontWeight: PropTypes.oneOf([
     'inherit' /*default*/, 'bold', 'normal',
     '100', '200', '300', '400', '500', '600', '700', '800', '900'
  ]),
  letterSpacing: PropTypes.string,
  lineHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  textAlign: PropTypes.oneOf([
    'auto' /*default*/, 'center', 'justify', 'left', 'right'
  ]),
  textDecoration: PropTypes.oneOf([
    'none' /*default*/, 'line-through', 'underline', 'underline line-through'
  ]),
  textTransform: PropTypes.oneOf([
    'none' /*default*/, 'capitalize', 'lowercase', 'uppercase'
  ]),
  wordWrap: PropTypes.oneOf([
    'break-word', 'normal'
  ])
};
