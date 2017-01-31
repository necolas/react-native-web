import flattenStyle from './flattenStyle';
import initialize from './initialize';
import injector from './injector';
import StyleRegistry from 'apis/StyleSheet/registry';

initialize();

const absoluteFillObject = {
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
};

const absoluteFill = StyleRegistry.register(absoluteFillObject);

module.exports = {
  absoluteFill: absoluteFill[Object.keys(absoluteFill)[0]],
  absoluteFillObject: absoluteFillObject.absoluteFill,
  create: StyleRegistry.register,
  hairlineWidth: 1,
  flatten: flattenStyle,
  renderToString: injector.getStyleSheetHtml
};
