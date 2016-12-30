import expandStyle from './expandStyle';
import flattenStyle from './flattenStyle';
import i18nStyle from './i18nStyle';
import resolveVendorPrefixes from './resolveVendorPrefixes';

const createReactDOMStyle = (reactNativeStyle) => resolveVendorPrefixes(
  expandStyle(i18nStyle(flattenStyle(reactNativeStyle)))
);

module.exports = createReactDOMStyle;
