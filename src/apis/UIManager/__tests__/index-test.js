/* eslint-env jasmine, jest */

import UIManager from '..';

const createNode = (style = {}) => {
  const root = document.createElement('div');
  Object.keys(style).forEach((prop) => {
    root.style[prop] = style[prop];
  });
  return root;
};

let defaultBodyMargin;

describe('apis/UIManager', () => {
  beforeEach(() => {
    // remove default body margin so we can predict the measured offsets
    defaultBodyMargin = document.body.style.margin;
    document.body.style.margin = 0;
  });

  afterEach(() => {
    document.body.style.margin = defaultBodyMargin;
  });

  describe('measure', () => {
    it('provides correct layout to callback', () => {
      const node = createNode({ height: '5000px', left: '100px', position: 'relative', top: '100px', width: '5000px' });
      document.body.appendChild(node);

      UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
        expect(x).toEqual(100);
        expect(y).toEqual(100);
        expect(width).toEqual(5000);
        expect(height).toEqual(5000);
        expect(pageX).toEqual(100);
        expect(pageY).toEqual(100);
      });

      // test values account for scroll position
      window.scrollTo(200, 200);
      UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
        expect(x).toEqual(100);
        expect(y).toEqual(100);
        expect(width).toEqual(5000);
        expect(height).toEqual(5000);
        expect(pageX).toEqual(-100);
        expect(pageY).toEqual(-100);
      });

      document.body.removeChild(node);
    });
  });

  describe('measureLayout', () => {
    it('provides correct layout to onSuccess callback', () => {
      const node = createNode({ height: '10px', width: '10px' });
      const middle = createNode({ padding: '20px' });
      const context = createNode({ padding: '20px' });
      middle.appendChild(node);
      context.appendChild(middle);
      document.body.appendChild(context);

      UIManager.measureLayout(node, context, () => {}, (x, y, width, height) => {
        expect(x).toEqual(40);
        expect(y).toEqual(40);
        expect(width).toEqual(10);
        expect(height).toEqual(10);
      });

      document.body.removeChild(context);
    });
  });

  describe('measureInWindow', () => {
    it('provides correct layout to callback', () => {
      const node = createNode({ height: '10px', width: '10px' });
      const middle = createNode({ padding: '20px' });
      const context = createNode({ padding: '20px' });
      middle.appendChild(node);
      context.appendChild(middle);
      document.body.appendChild(context);

      UIManager.measureInWindow(node, (x, y, width, height) => {
        expect(x).toEqual(40);
        expect(y).toEqual(40);
        expect(width).toEqual(10);
        expect(height).toEqual(10);
      });

      document.body.removeChild(context);
    });
  });

  describe('updateView', () => {
    const componentStub = {
      _reactInternalInstance: {
        _currentElement: { _owner: {} },
        _debugID: 1
      }
    };

    it('add new className to existing className', () => {
      const node = createNode();
      node.className = 'existing';
      const props = { className: 'extra' };
      UIManager.updateView(node, props, componentStub);
      expect(node.getAttribute('class')).toEqual('existing extra');
    });

    it('adds correct DOM styles to existing style', () => {
      const node = createNode({ color: 'red' });
      const props = { style: { marginVertical: 0, opacity: 0 } };
      UIManager.updateView(node, props, componentStub);
      expect(node.getAttribute('style')).toEqual('color: red; margin-top: 0px; margin-bottom: 0px; opacity: 0;');
    });

    it('replaces input and textarea text', () => {
      const node = createNode();
      node.value = 'initial';
      const textProp = { text: 'expected-text' };
      const valueProp = { value: 'expected-value' };

      UIManager.updateView(node, textProp);
      expect(node.value).toEqual('expected-text');

      UIManager.updateView(node, valueProp);
      expect(node.value).toEqual('expected-value');
    });

    it('sets other attribute values', () => {
      const node = createNode();
      const props = { 'aria-level': '4', 'data-of-type': 'string' };
      UIManager.updateView(node, props);
      expect(node.getAttribute('aria-level')).toEqual('4');
      expect(node.getAttribute('data-of-type')).toEqual('string');
    });
  });
});
