import normalizeValue from './normalizeValue'

const styleShortHands = {
  borderColor: [ 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor' ],
  borderRadius: [ 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius' ],
  borderStyle: [ 'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle' ],
  borderWidth: [ 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth' ],
  margin: [ 'marginTop', 'marginRight', 'marginBottom', 'marginLeft' ],
  marginHorizontal: [ 'marginRight', 'marginLeft' ],
  marginVertical: [ 'marginTop', 'marginBottom' ],
  overflow: [ 'overflowX', 'overflowY' ],
  padding: [ 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft' ],
  paddingHorizontal: [ 'paddingRight', 'paddingLeft' ],
  paddingVertical: [ 'paddingTop', 'paddingBottom' ],
  textDecorationLine: [ 'textDecoration' ],
  writingDirection: [ 'direction' ]
}

/**
 * Alpha-sort properties, apart from shorthands – they must appear before the
 * longhand properties that they expand into. This lets more specific styles
 * override less specific styles, whatever the order in which they were
 * originally declared.
 */
const sortProps = (propsArray) => propsArray.sort((a, b) => {
  const expandedA = styleShortHands[a]
  const expandedB = styleShortHands[b]
  if (expandedA && expandedA.indexOf(b) > -1) {
    return -1
  } else if (expandedB && expandedB.indexOf(a) > -1) {
    return 1
  }
  return a < b ? -1 : a > b ? 1 : 0
})

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 */
const expandStyle = (style) => {
  const propsArray = Object.keys(style)
  const sortedProps = sortProps(propsArray)

  return sortedProps.reduce((resolvedStyle, key) => {
    const expandedProps = styleShortHands[key]
    const value = normalizeValue(key, style[key])

    // React Native treats `flex:1` like `flex:1 1 auto`
    if (key === 'flex') {
      resolvedStyle.flexGrow = value
      resolvedStyle.flexShrink = 1
      resolvedStyle.flexBasis = 'auto'
    } else if (key === 'textAlignVertical') {
      resolvedStyle.verticalAlign = (value === 'center' ? 'middle' : value)
    } else if (expandedProps) {
      expandedProps.forEach((prop, i) => {
        resolvedStyle[expandedProps[i]] = value
      })
    } else {
      resolvedStyle[key] = value
    }
    return resolvedStyle
  }, {})
}

module.exports = expandStyle
