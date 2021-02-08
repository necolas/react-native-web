/* eslint-env jasmine, jest */

import StyleSheet from '..';

const isPlainObject = (x) => {
  const toString = Object.prototype.toString;
  let proto;
  /* eslint-disable */
  return (
    toString.call(x) === '[object Object]' &&
    ((proto = Object.getPrototypeOf(x)), proto === null || proto === Object.getPrototypeOf({}))
  );
  /* eslint-enable */
};

describe('StyleSheet', () => {
  test('absoluteFill', () => {
    expect(Number.isInteger(StyleSheet.absoluteFill) === true).toBeTruthy();
  });

  test('absoluteFillObject', () => {
    expect(isPlainObject(StyleSheet.absoluteFillObject) === true).toBeTruthy();
  });

  describe('compose', () => {
    test('returns array when neither style is falsey', () => {
      expect(StyleSheet.compose(1, 2)).toEqual([1, 2]);
    });
    test('returns style1 when style2 is falsey', () => {
      expect(StyleSheet.compose(1, null)).toBe(1);
    });
    test('returns style2 when style1 is falsey', () => {
      expect(StyleSheet.compose(null, 2)).toBe(2);
    });
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
});
