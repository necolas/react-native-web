/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import UIManager from '..';

const createStyledNode = (name = 'div', style = {}) => {
  const root = document.createElement(name);
  Object.keys(style).forEach((prop) => {
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
  describe('focus', () => {
    test('sets tabIndex="-1" on elements not programmatically focusable by default', () => {
      const node = createStyledNode();
      UIManager.focus(node);
      expect(node.getAttribute('tabIndex')).toEqual('-1');
    });

    test('doesn\'t set tabIndex="-1" on elements with an existing tabIndex', () => {
      const node = createStyledNode();
      node.tabIndex = 0;
      UIManager.focus(node);
      expect(node.getAttribute('tabIndex')).toEqual('0');
    });

    test('doesn\'t set tabIndex="-1" on elements focusable by default', () => {
      ['a', 'input', 'select', 'textarea'].forEach((name) => {
        const node = createStyledNode(name);
        UIManager.focus(node);
        expect(node.getAttribute('tabIndex')).toBeNull();
      });
    });
  });

  describe('updateView', () => {
    test('supports className alias for class', () => {
      const node = createStyledNode();
      const props = { className: 'extra' };
      UIManager.updateView(node, props, componentStub);
      expect(node.getAttribute('class')).toEqual('extra');
    });

    test('adds correct DOM styles to existing style', () => {
      const node = createStyledNode('div', { color: 'red' });
      const props = { style: { marginTop: 0, marginBottom: 0, opacity: 0 } };
      UIManager.updateView(node, props, componentStub);
      expect(node.getAttribute('style')).toEqual(
        'color: red; margin-top: 0px; margin-bottom: 0px; opacity: 0;'
      );
    });

    test('replaces input and textarea text', () => {
      const node = createStyledNode('textarea');
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
