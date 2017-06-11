import flattenStyle from './flattenStyle';
import StyleRegistry from './registry';

const absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
const absoluteFill = StyleRegistry.register(absoluteFillObject);

const StyleSheet = {
  absoluteFill,
  absoluteFillObject,
  create(styles) {
    const result = {};
    Object.keys(styles).forEach(key => {
      if (process.env.NODE_ENV !== 'production') {
        const StyleSheetValidation = require('./StyleSheetValidation').default;
        StyleSheetValidation.validateStyle(key, styles);
      }
      result[key] = StyleRegistry.register(styles[key]);
    });
    return result;
  },
  flatten: flattenStyle,
  getStyleSheets() {
    return StyleRegistry.getStyleSheets();
  },
  hairlineWidth: 1
};

export default StyleSheet;
