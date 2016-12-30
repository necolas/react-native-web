import expandStyle from './expandStyle';
import flattenStyle from './flattenStyle';
import i18nStyle from './i18nStyle';
import resolveBoxShadow from './resolveBoxShadow';
import resolveTextShadow from './resolveTextShadow';
import resolveTransform from './resolveTransform';
import resolveVendorPrefixes from './resolveVendorPrefixes';

const processors = [
  resolveBoxShadow,
  resolveTextShadow,
  resolveTransform,
  resolveVendorPrefixes
];

const applyProcessors = (style) => processors.reduce((style, processor) => processor(style), style);

const createReactDOMStyle = (reactNativeStyle) => applyProcessors(
  expandStyle(i18nStyle(flattenStyle(reactNativeStyle)))
);

module.exports = createReactDOMStyle;
