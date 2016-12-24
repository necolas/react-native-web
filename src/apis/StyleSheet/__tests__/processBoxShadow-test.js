/* eslint-env jasmine, jest */

import processBoxShadow from '../processBoxShadow';

describe('apis/StyleSheet/processBoxShadow', () => {
  test('missing shadowColor', () => {
    const style = {
      shadowOffset: { width: 1, height: 2 }
    };

    expect(processBoxShadow(style)).toEqual({});
  });

  test('shadowColor only', () => {
    const style = {
      shadowColor: 'red'
    };

    expect(processBoxShadow(style)).toEqual({
      boxShadow: '0px 0px 0px rgba(255,0,0,1)'
    });
  });

  test('shadowColor and shadowOpacity only', () => {
    const style = {
      shadowColor: 'red',
      shadowOpacity: 0.5
    };

    expect(processBoxShadow(style)).toEqual({
      boxShadow: '0px 0px 0px rgba(255,0,0,0.5)'
    });
  });

  test('shadowOffset, shadowRadius, shadowSpread', () => {
    const style = {
      shadowColor: 'rgba(50,60,70,0.5)',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3
    };

    expect(processBoxShadow(style)).toEqual({
      boxShadow: '2px 1px 3px rgba(50,60,70,0.25)'
    });
  });
});
