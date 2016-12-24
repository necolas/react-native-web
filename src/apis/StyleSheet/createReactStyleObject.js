import expandStyle from './expandStyle';
import flattenStyle from '../../modules/flattenStyle';
import i18nStyle from './i18nStyle';
import processBoxShadow from './processBoxShadow';
import processTextShadow from './processTextShadow';
import processTransform from './processTransform';
import processVendorPrefixes from './processVendorPrefixes';

const processors = [
  processBoxShadow,
  processTextShadow,
  processTransform,
  processVendorPrefixes
];

const applyProcessors = (style) => processors.reduce((style, processor) => processor(style), style);

const createReactDOMStyleObject = (reactNativeStyle) => applyProcessors(
  expandStyle(i18nStyle(flattenStyle(reactNativeStyle)))
);

module.exports = createReactDOMStyleObject;
