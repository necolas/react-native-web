import { PropTypes } from 'react'

export default {
  color: PropTypes.string,
  direction: PropTypes.oneOf([
    'auto', 'ltr', 'rtl'
  ]),
  font: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string,
  fontStyle: PropTypes.oneOf([
    'inherit', 'normal', 'italic'
  ]),
  fontWeight: PropTypes.oneOf([
    'inherit', 'bold', 'normal',
    '100', '200', '300', '400', '500', '600', '700', '800', '900'
  ]),
  letterSpacing: PropTypes.string,
  lineHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  textAlign: PropTypes.oneOf([
    'auto', 'center', 'justify', 'left', 'right'
  ]),
  textDecoration: PropTypes.oneOf([
    'none', 'line-through', 'underline', 'underline line-through'
  ]),
  textTransform: PropTypes.oneOf([
    'none', 'capitalize', 'lowercase', 'uppercase'
  ]),
  wordWrap: PropTypes.oneOf([
    'break-word', 'normal'
  ])
}
