/* eslint-env jasmine, jest */

import multiplyStyleLengthValue from '..';

describe('modules/multiplyStyleLengthValue', () => {
  test('number', () => {
    expect(multiplyStyleLengthValue(2, -1)).toEqual(-2);
    expect(multiplyStyleLengthValue(2, 2)).toEqual(4);
    expect(multiplyStyleLengthValue(2.5, 2)).toEqual(5);
  });

  test('length', () => {
    expect(multiplyStyleLengthValue('2rem', -1)).toEqual('-2rem');
    expect(multiplyStyleLengthValue('2px', 2)).toEqual('4px');
    expect(multiplyStyleLengthValue('2.5em', 2)).toEqual('5em');
    expect(multiplyStyleLengthValue('2e3px', 2)).toEqual('4000px');
  });
});
