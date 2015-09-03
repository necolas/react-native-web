import { PropTypes } from 'react'

const numberOrString = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
])

export default {
  position: PropTypes.oneOf([
    'absolute',
    'fixed',
    'relative' /* default */
  ]),
  bottom: numberOrString,
  left: numberOrString,
  right: numberOrString,
  top: numberOrString,
  zIndex: PropTypes.number
}
