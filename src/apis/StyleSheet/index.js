import flattenStyle from './flattenStyle';
import initialize from './initialize';
import injector from './injector';
import StyleRegistry from './registry';

initialize();

const absoluteFillObject = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };

module.exports = {
  absoluteFill: StyleRegistry.register(absoluteFillObject),
  absoluteFillObject,
  create(styles) {
    const result = {};
    Object.keys(styles).forEach((key) => {
      if (process.env.NODE_ENV !== 'production') {
        require('./StyleSheetValidation').validateStyle(key, styles);
      }
      result[key] = StyleRegistry.register(styles[key]);
    });
    return result;
  },
  hairlineWidth: 1,
  flatten: flattenStyle,
  renderToString: injector.getStyleSheetHtml
};
