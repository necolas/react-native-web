/* eslint-env jasmine, jest */

import UIManager from '..';

const createStyledNode = (style = {}) => {
  const root = document.createElement('div');
  Object.keys(style).forEach(prop => {
    root.style[prop] = style[prop];
  });
  return root;
};

const componentStub = {
  _reactInternalInstance: {
    _currentElement: { _owner: {} },
    _debugID: 1
  }
};

describe('apis/UIManager', () => {
  describe('updateView', () => {
    test('supports className alias for class', () => {
      const node = createStyledNode();
      const props = { className: 'extra' };
      UIManager.updateView(node, props, componentStub);
      expect(node.getAttribute('class')).toEqual('extra');
    });

    test('adds correct DOM styles to existing style', () => {
      const node = createStyledNode({ color: 'red' });
      const props = { style: { marginTop: 0, marginBottom: 0, opacity: 0 } };
      UIManager.updateView(node, props, componentStub);
      expect(node.getAttribute('style')).toEqual(
        'color: red; margin-top: 0px; margin-bottom: 0px; opacity: 0;'
      );
    });

    test('replaces input and textarea text', () => {
      const node = createStyledNode();
      node.value = 'initial';
      const textProp = { text: 'expected-text' };
      const valueProp = { value: 'expected-value' };

      UIManager.updateView(node, textProp);
      expect(node.value).toEqual('expected-text');

      UIManager.updateView(node, valueProp);
      expect(node.value).toEqual('expected-value');
    });

    test('sets other attribute values', () => {
      const node = createStyledNode();
      const props = { 'aria-level': '4', 'data-of-type': 'string' };
      UIManager.updateView(node, props);
      expect(node.getAttribute('aria-level')).toEqual('4');
      expect(node.getAttribute('data-of-type')).toEqual('string');
    });
  });
});
