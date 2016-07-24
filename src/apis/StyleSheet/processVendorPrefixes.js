import prefixAll from 'inline-style-prefixer/static'

const processVendorPrefixes = (style) => {
  let prefixedStyles = prefixAll(style)
  // React@15 removed undocumented support for fallback values in
  // inline-styles. Revert array values to the standard CSS value
  for (const prop in prefixedStyles) {
    const value = prefixedStyles[prop]
    if (Array.isArray(value)) {
      prefixedStyles[prop] = value[value.length - 1]
    }
  }
  return prefixedStyles
}

module.exports = processVendorPrefixes
