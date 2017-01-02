/* eslint-env jasmine, jest */

import { getDefaultStyleSheet } from '../css';
import StyleSheet from '../../StyleSheet';

const isPlainObject = (x) => {
  const toString = Object.prototype.toString;
  let proto;
  /* eslint-disable */
  return (
    toString.call(x) === '[object Object]' &&
    (proto = Object.getPrototypeOf(x), proto === null || proto === Object.getPrototypeOf({}))
  );
  /* eslint-enable */
};

describe('apis/StyleSheet', () => {
  beforeEach(() => {
    StyleSheet._reset();
  });

  test('absoluteFill', () => {
    expect(Number.isInteger(StyleSheet.absoluteFill) === true).toBeTruthy();
  });

  test('absoluteFillObject', () => {
    expect(isPlainObject(StyleSheet.absoluteFillObject) === true).toBeTruthy();
  });

  describe('create', () => {
    test('replaces styles with numbers', () => {
      const style = StyleSheet.create({ root: { opacity: 1 } });
      expect(Number.isInteger(style.root) === true).toBeTruthy();
    });

    test('renders a style sheet in the browser', () => {
      StyleSheet.create({ root: { color: 'red' } });
      expect(document.getElementById('react-native-style__').textContent).toEqual(getDefaultStyleSheet());
    });
  });

  test('flatten', () => {
    expect(typeof StyleSheet.flatten === 'function').toBeTruthy();
  });

  test('hairlineWidth', () => {
    expect(Number.isInteger(StyleSheet.hairlineWidth) === true).toBeTruthy();
  });

  test('render', () => {
    expect(StyleSheet.render().props.dangerouslySetInnerHTML.__html).toEqual(getDefaultStyleSheet());
  });

  test('resolve', () => {
    expect(StyleSheet.resolve({
      className: 'test',
      style: {
        display: 'flex',
        opacity: 1,
        pointerEvents: 'box-none'
      }
    })).toMatchSnapshot();
  });
});
