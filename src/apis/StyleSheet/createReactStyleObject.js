import expandStyle from './expandStyle'
import flattenStyle from '../../modules/flattenStyle'
import prefixAll from 'inline-style-prefixer/static'
import processTextShadow from './processTextShadow'
import processTransform from './processTransform'
import processVendorPrefixes from './processVendorPrefixes'

const plugins = [
  processTextShadow,
  processTransform,
  processVendorPrefixes
]

const applyPlugins = (style) => plugins.reduce((style, plugin) => plugin(style), style)

const createReactDOMStyleObject = (reactNativeStyle) => applyPlugins(expandStyle(flattenStyle(reactNativeStyle)))

module.exports = createReactDOMStyleObject
