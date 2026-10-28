/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import PlatformColor from '..';
import StyleSheet from '../../StyleSheet';

describe('PlatformColor', () => {
  test('returns a system color', () => {
    expect(PlatformColor('Canvas')).toBe('Canvas');
    expect(PlatformColor('canvastext')).toBe('canvastext');
  });

  test('skips names that are not system colors', () => {
    expect(PlatformColor('systemBlue', '?attr/colorAccent', 'LinkText')).toBe(
      'LinkText'
    );
    expect(PlatformColor('red', '--brand', 'var(--brand)')).toBeUndefined();
  });

  test('returns a CSS custom property for newer system colors', () => {
    expect(PlatformColor('AccentColor')).toBe('var(--rnw-accentcolor)');
    expect(PlatformColor('Mark', 'Highlight')).toBe(
      'var(--rnw-mark, Highlight)'
    );
    expect(PlatformColor('Mark', 'SelectedItem', 'Canvas', 'LinkText')).toBe(
      'var(--rnw-mark, var(--rnw-selecteditem, Canvas))'
    );
  });

  test('uses the trailing fallback', () => {
    expect(PlatformColor('AccentColor', { fallback: 'blue' })).toBe(
      'var(--rnw-accentcolor, rgba(0,0,255,1.00))'
    );
    expect(PlatformColor('LinkText', { fallback: 'blue' })).toBe('LinkText');
    expect(PlatformColor('systemBlue', { fallback: '#000' })).toBe(
      'rgba(0,0,0,1.00)'
    );
    expect(PlatformColor({ fallback: 'red' })).toBe('rgba(255,0,0,1.00)');
    expect(PlatformColor('Mark', { fallback: 'Canvas' })).toBe(
      'var(--rnw-mark, Canvas)'
    );
    expect(PlatformColor('Mark', { fallback: 'nope' })).toBe('var(--rnw-mark)');
    expect(PlatformColor()).toBeUndefined();
  });

  test('ignores invalid options objects', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(PlatformColor({ fallback: 'red' }, 'foo')).toBeUndefined();
    expect(PlatformColor('foo', { fallback: 1 })).toBeUndefined();
    expect(PlatformColor(null, 'Canvas')).toBe('Canvas');
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  test('is accepted as a style color', () => {
    expect(
      StyleSheet({ color: PlatformColor('Mark', { fallback: 'red' }) })[1]
    ).toEqual({ color: 'var(--rnw-mark, rgba(255,0,0,1.00))' });
  });
});
