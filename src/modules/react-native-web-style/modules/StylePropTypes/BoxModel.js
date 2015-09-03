import {PropTypes} from 'react'

const numberOrString = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string
])

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
  height: numberOrString,
  width: numberOrString,
  // border width
  borderWidth: numberOrString,
  borderTopWidth: numberOrString,
  borderRightWidth: numberOrString,
  borderBottomWidth: numberOrString,
  borderLeftWidth: numberOrString,
  // margin
  margin: numberOrString,
  marginTop: numberOrString,
  marginBottom: numberOrString,
  marginLeft: numberOrString,
  marginRight: numberOrString,
  // padding
  padding: numberOrString,
  paddingTop: numberOrString,
  paddingBottom: numberOrString,
  paddingLeft: numberOrString,
  paddingRight: numberOrString
}
