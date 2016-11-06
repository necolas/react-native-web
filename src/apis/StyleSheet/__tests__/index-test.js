/* eslint-env jasmine, jest */

import { getDefaultStyleSheet } from '../css';
import isPlainObject from 'lodash/isPlainObject';
import StyleSheet from '..';

describe('apis/StyleSheet', () => {
  beforeEach(() => {
    StyleSheet._reset();
  });

  it('absoluteFill', () => {
    expect(Number.isInteger(StyleSheet.absoluteFill) === true).toBeTruthy();
  });

  it('absoluteFillObject', () => {
    expect(isPlainObject(StyleSheet.absoluteFillObject) === true).toBeTruthy();
  });

  describe('create', () => {
    it('replaces styles with numbers', () => {
      const style = StyleSheet.create({ root: { opacity: 1 } });
      expect(Number.isInteger(style.root) === true).toBeTruthy();
    });

    it('renders a style sheet in the browser', () => {
      StyleSheet.create({ root: { color: 'red' } });
      expect(document.getElementById('__react-native-style').textContent).toEqual(getDefaultStyleSheet());
    });
  });

  it('flatten', () => {
    expect(typeof StyleSheet.flatten === 'function').toBeTruthy();
  });

  it('hairlineWidth', () => {
    expect(Number.isInteger(StyleSheet.hairlineWidth) === true).toBeTruthy();
  });

  it('render', () => {
    expect(StyleSheet.render().props.dangerouslySetInnerHTML.__html).toEqual(getDefaultStyleSheet());
  });

  it('resolve', () => {
    expect(StyleSheet.resolve({
      className: 'test',
      style: {
        display: 'flex',
        opacity: 1,
        pointerEvents: 'box-none'
      }
    })).toEqual({
      className: 'test __style_df __style_pebn',
      style: {
        display: null,
        opacity: 1,
        pointerEvents: null
      }
    });
  });
});
