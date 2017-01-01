import expandStyle from './expandStyle';
import i18nStyle from './i18nStyle';

const createReactDOMStyle = (flattenedReactNativeStyle) => expandStyle(i18nStyle(flattenedReactNativeStyle));

module.exports = createReactDOMStyle;
