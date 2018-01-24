/* eslint-env jasmine, jest */

import createAtomicRules from '../createAtomicRules';

describe('StyleSheet/createAtomicRules', () => {
  test('transforms standard declarations to a single rule', () => {
    expect(createAtomicRules('.test', 'margin', 0)).toMatchSnapshot();
  });

  test('transforms custom pointerEvents declaration', () => {
    expect(createAtomicRules('.test', 'pointerEvents', 'box-only')).toMatchSnapshot();
  });

  test('transforms custom placeholderTextColor declaration', () => {
    expect(createAtomicRules('.test', 'placeholderTextColor', 'gray')).toMatchSnapshot();
  });
});
