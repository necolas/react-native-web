/* eslint-env jasmine, jest */

import normalizeValueWithProperty from '../normalizeValueWithProperty';

describe('StyleSheet/normalizeValueWithProperty', () => {
  test('normalizes property values requiring units', () => {
    expect(normalizeValueWithProperty(0, 'margin')).toEqual('0px');
  });
  test('normalizes colors', () => {
    expect(normalizeValueWithProperty('red', 'color')).toEqual('rgba(255,0,0,1.00)');
  });
  test('ignores unitless property values', () => {
    expect(normalizeValueWithProperty(1, 'flexGrow')).toEqual(1);
    expect(normalizeValueWithProperty(2, 'scale')).toEqual(2);
  });
  test('ignores objects and arrays', () => {
    expect(normalizeValueWithProperty([])).toEqual([]);
    expect(normalizeValueWithProperty({})).toEqual({});
  });
});
