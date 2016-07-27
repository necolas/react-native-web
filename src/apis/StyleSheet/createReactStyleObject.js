import expandStyle from './expandStyle'
import flattenStyle from '../../modules/flattenStyle'
import i18nStyle from './i18nStyle'
import processTextShadow from './processTextShadow'
import processTransform from './processTransform'
import processVendorPrefixes from './processVendorPrefixes'

const plugins = [
  processTextShadow,
  processTransform,
  processVendorPrefixes
]

const applyPlugins = (style) => {
  return plugins.reduce((style, plugin) => plugin(style), style)
}

const createReactDOMStyleObject = (reactNativeStyle) => applyPlugins(expandStyle(i18nStyle(flattenStyle(reactNativeStyle))))

module.exports = createReactDOMStyleObject
