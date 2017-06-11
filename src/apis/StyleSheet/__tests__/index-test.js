/* eslint-env jasmine, jest */

import StyleSheet from '..';

const isPlainObject = x => {
  const toString = Object.prototype.toString;
  let proto;
  /* eslint-disable */
  return (
    toString.call(x) === '[object Object]' &&
    ((proto = Object.getPrototypeOf(x)), proto === null || proto === Object.getPrototypeOf({}))
  );
  /* eslint-enable */
};

describe('apis/StyleSheet', () => {
  test('absoluteFill', () => {
    expect(Number.isInteger(StyleSheet.absoluteFill) === true).toBeTruthy();
  });

  test('absoluteFillObject', () => {
    expect(isPlainObject(StyleSheet.absoluteFillObject) === true).toBeTruthy();
  });

  describe('create', () => {
    test('replaces styles with numbers', () => {
      const style = StyleSheet.create({ root: { position: 'absolute' } });
      expect(Number.isInteger(style.root) === true).toBeTruthy();
    });
  });

  test('flatten', () => {
    expect(typeof StyleSheet.flatten === 'function').toBeTruthy();
  });

  test('hairlineWidth', () => {
    expect(Number.isInteger(StyleSheet.hairlineWidth) === true).toBeTruthy();
  });

  test('getStyleSheets', () => {
    expect(StyleSheet.getStyleSheets()).toMatchSnapshot();
  });
});
