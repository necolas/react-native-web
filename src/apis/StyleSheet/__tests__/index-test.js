/* eslint-env mocha */

import assert from 'assert';
import { getDefaultStyleSheet } from '../css';
import isPlainObject from 'lodash/isPlainObject';
import StyleSheet from '..';

suite('apis/StyleSheet', () => {
  setup(() => {
    StyleSheet._reset();
  });

  test('absoluteFill', () => {
    assert(Number.isInteger(StyleSheet.absoluteFill) === true);
  });

  test('absoluteFillObject', () => {
    assert.ok(isPlainObject(StyleSheet.absoluteFillObject) === true);
  });

  suite('create', () => {
    test('replaces styles with numbers', () => {
      const style = StyleSheet.create({ root: { opacity: 1 } });
      assert(Number.isInteger(style.root) === true);
    });

    test('renders a style sheet in the browser', () => {
      StyleSheet.create({ root: { color: 'red' } });
      assert.equal(
        document.getElementById('__react-native-style').textContent,
        getDefaultStyleSheet()
      );
    });
  });

  test('flatten', () => {
    assert(typeof StyleSheet.flatten === 'function');
  });

  test('hairlineWidth', () => {
    assert(Number.isInteger(StyleSheet.hairlineWidth) === true);
  });

  test('render', () => {
    assert.equal(
      StyleSheet.render().props.dangerouslySetInnerHTML.__html,
      getDefaultStyleSheet()
    );
  });

  test('resolve', () => {
    assert.deepEqual(
      StyleSheet.resolve({
        className: 'test',
        style: {
          display: 'flex',
          opacity: 1,
          pointerEvents: 'box-none'
        }
      }),
      {
        className: 'test __style_df __style_pebn',
        style: {
          display: null,
          opacity: 1,
          pointerEvents: null
        }
      }
    );
  });
});
