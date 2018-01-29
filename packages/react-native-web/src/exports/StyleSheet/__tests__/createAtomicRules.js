/* eslint-env jasmine, jest */

import createAtomicRules from '../createAtomicRules';

describe('StyleSheet/createAtomicRules', () => {
  test('transforms standard declarations to a single rule', () => {
    expect(createAtomicRules('.test', 'margin', 0)).toMatchSnapshot();
  });

  test('transforms custom "animationName" declaration', () => {
    const value = [
      { '0%': { top: 0 }, '50%': { top: 5 }, '100%': { top: 10 } },
      { from: { left: 0 }, to: { left: 10 } }
    ];
    expect(createAtomicRules('.test', 'animationName', value)).toMatchSnapshot();
  });

  test('transforms custom "pointerEvents" declaration', () => {
    expect(createAtomicRules('.test', 'pointerEvents', 'box-only')).toMatchSnapshot();
  });

  test('transforms custom "placeholderTextColor" declaration', () => {
    expect(createAtomicRules('.test', 'placeholderTextColor', 'gray')).toMatchSnapshot();
  });
});
