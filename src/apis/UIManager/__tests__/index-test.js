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
    test('provides correct layout to callback', (done) => {
      const node = createNode({ height: '5000px', left: '100px', position: 'relative', top: '100px', width: '5000px' });
      document.body.appendChild(node);

      node.getBoundingClientRect = jest.fn(() => ({ width: 5000, height: 5000, top: 100, left: 100 }));

      UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
        expect(x).toEqual(100);
        expect(y).toEqual(100);
        expect(width).toEqual(5000);
        expect(height).toEqual(5000);
        expect(pageX).toEqual(100);
        expect(pageY).toEqual(100);
        done();
        document.body.removeChild(node);
      });
    });

    test('provides correct layout to callback', (done) => {
      const node = createNode({ height: '5000px', left: '100px', position: 'relative', top: '100px', width: '5000px' });
      document.body.appendChild(node);

      // test values account for scroll position
      window.scrollTo(200, 200);
      node.getBoundingClientRect = jest.fn(() => ({ width: 5000, height: 5000, top: -100, left: -100 }));
      node.parentNode.getBoundingClientRect = jest.fn(() => ({ top: -200, left: -200 }));

      UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
        expect(x).toEqual(100);
        expect(y).toEqual(100);
        expect(width).toEqual(5000);
        expect(height).toEqual(5000);
        expect(pageX).toEqual(-100);
        expect(pageY).toEqual(-100);
        done();
        document.body.removeChild(node);
      });
    });
  });

  describe('measureLayout', () => {
    test('provides correct layout to onSuccess callback', (done) => {
      const node = createNode({ height: '10px', width: '10px' });
      const middle = createNode({ padding: '20px' });
      const context = createNode({ padding: '20px' });
      middle.appendChild(node);
      context.appendChild(middle);
      document.body.appendChild(context);

      node.getBoundingClientRect = jest.fn(() => ({
        width: 10,
        height: 10,
        top: 40,
        left: 40
      }));

      UIManager.measureLayout(node, context, () => {}, (x, y, width, height) => {
        expect(x).toEqual(40);
        expect(y).toEqual(40);
        expect(width).toEqual(10);
        expect(height).toEqual(10);
        done();
        document.body.removeChild(context);
      });
    });
  });

  describe('measureInWindow', () => {
    test('provides correct layout to callback', (done) => {
      const node = createNode({ height: '10px', width: '10px' });
      const middle = createNode({ padding: '20px' });
      const context = createNode({ padding: '20px' });
      middle.appendChild(node);
      context.appendChild(middle);
      document.body.appendChild(context);

      node.getBoundingClientRect = jest.fn(() => ({
        width: 10,
        height: 10,
        top: 40,
        left: 40
      }));

      UIManager.measureInWindow(node, (x, y, width, height) => {
        expect(x).toEqual(40);
        expect(y).toEqual(40);
        expect(width).toEqual(10);
        expect(height).toEqual(10);
        done();
        document.body.removeChild(context);
      });
    });
  });

  describe('updateView', () => {
    const componentStub = {
      _reactInternalInstance: {
        _currentElement: { _owner: {} },
        _debugID: 1
      }
    };

    test('add new className to existing className', () => {
      const node = createNode();
      node.className = 'existing';
      const props = { className: 'extra' };
      UIManager.updateView(node, props, componentStub);
      expect(node.getAttribute('class')).toEqual('existing extra');
    });

    test('adds correct DOM styles to existing style', () => {
      const node = createNode({ color: 'red' });
      const props = { style: { marginVertical: 0, opacity: 0 } };
      UIManager.updateView(node, props, componentStub);
      expect(node.getAttribute('style')).toEqual('color: red; margin-top: 0px; margin-bottom: 0px; opacity: 0;');
    });

    test('replaces input and textarea text', () => {
      const node = createNode();
      node.value = 'initial';
      const textProp = { text: 'expected-text' };
      const valueProp = { value: 'expected-value' };

      UIManager.updateView(node, textProp);
      expect(node.value).toEqual('expected-text');

      UIManager.updateView(node, valueProp);
      expect(node.value).toEqual('expected-value');
    });

    test('sets other attribute values', () => {
      const node = createNode();
      const props = { 'aria-level': '4', 'data-of-type': 'string' };
      UIManager.updateView(node, props);
      expect(node.getAttribute('aria-level')).toEqual('4');
      expect(node.getAttribute('data-of-type')).toEqual('string');
    });
  });
});
