/* eslint-env jasmine, jest */

import resolveBoxShadow from '../resolveBoxShadow';

describe('apis/StyleSheet/resolveBoxShadow', () => {
  test('shadowColor only', () => {
    const resolvedStyle = {};
    const style = { shadowColor: 'red' };
    resolveBoxShadow(resolvedStyle, style);

    expect(resolvedStyle).toEqual({
      boxShadow: '0px 0px 0px red'
    });
  });

  test('shadowColor and shadowOpacity only', () => {
    const resolvedStyle = {};
    const style = { shadowColor: 'red', shadowOpacity: 0.5 };
    resolveBoxShadow(resolvedStyle, style);

    expect(resolvedStyle).toEqual({
      boxShadow: '0px 0px 0px rgba(255,0,0,0.5)'
    });
  });

  test('shadowOffset only', () => {
    const resolvedStyle = {};
    const style = { shadowOffset: { width: 1, height: 2 } };
    resolveBoxShadow(resolvedStyle, style);

    expect(resolvedStyle).toEqual({});
  });

  test('shadowRadius only', () => {
    const resolvedStyle = {};
    const style = { shadowRadius: 5 };
    resolveBoxShadow(resolvedStyle, style);

    expect(resolvedStyle).toEqual({});
  });

  test('shadowOffset, shadowRadius, shadowColor', () => {
    const resolvedStyle = {};
    const style = {
      shadowColor: 'rgba(50,60,70,0.5)',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3
    };
    resolveBoxShadow(resolvedStyle, style);

    expect(resolvedStyle).toEqual({
      boxShadow: '1px 2px 3px rgba(50,60,70,0.25)'
    });
  });
});
