/* eslint-env jasmine, jest */

import createCompileableStyle from '../createCompileableStyle';

const ignoreableStyle = {
  borderWidthLeft: 2,
  borderWidth: 1,
  borderWidthRight: 3,
  display: 'flex',
  marginVertical: 0,
  opacity: 0,
  resizeMode: 'contain'
};

describe('StyleSheet/createCompileableStyle', () => {
  test('forwards valid styles', () => {
    const noop = createCompileableStyle(ignoreableStyle);
    expect(noop).toEqual(ignoreableStyle);
  });

  describe('preprocesses multiple shadow styles into a single declaration', () => {
    test('shadowColor only', () => {
      const style = { shadowColor: 'red' };
      const resolved = createCompileableStyle(style);

      expect(resolved).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,1.00)'
      });
    });

    test('shadowColor and shadowOpacity only', () => {
      expect(createCompileableStyle({ shadowColor: 'red', shadowOpacity: 0.5 })).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,0.50)'
      });
    });

    test('shadowOffset only', () => {
      expect(createCompileableStyle({ shadowOffset: { width: 1, height: 2 } })).toEqual({
        boxShadow: '1px 2px 0px rgba(0,0,0,1.00)'
      });
    });

    test('shadowRadius only', () => {
      expect(createCompileableStyle({ shadowRadius: 5 })).toEqual({
        boxShadow: '0px 0px 5px rgba(0,0,0,1.00)'
      });
    });

    test('shadowOffset, shadowRadius, shadowColor', () => {
      expect(
        createCompileableStyle({
          shadowColor: 'rgba(50,60,70,0.5)',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3
        })
      ).toEqual({
        boxShadow: '1px 2px 3px rgba(50,60,70,0.25)'
      });
    });
  });

  describe('preprocesses multiple textShadow styles into a single declaration', () => {
    test('textShadowColor only', () => {
      expect(createCompileableStyle({ textShadowColor: 'red' })).toEqual({});
    });

    test('textShadowOffset only', () => {
      expect(createCompileableStyle({ textShadowOffset: { width: 1, height: 2 } })).toEqual({});
    });

    test('textShadowRadius only', () => {
      expect(createCompileableStyle({ textShadowRadius: 5 })).toEqual({});
    });

    test('textShadowColor and textShadowOffset only', () => {
      expect(
        createCompileableStyle({
          textShadowColor: 'red',
          textShadowOffset: { width: 0, height: 0 }
        })
      ).toEqual({});
      expect(
        createCompileableStyle({
          textShadowColor: 'red',
          textShadowOffset: { width: -1, height: 0 }
        })
      ).toEqual({
        textShadow: '-1px 0px 0px rgba(255,0,0,1.00)'
      });
      expect(
        createCompileableStyle({
          textShadowColor: 'red',
          textShadowOffset: { width: 1, height: 2 }
        })
      ).toEqual({
        textShadow: '1px 2px 0px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor and textShadowRadius only', () => {
      expect(createCompileableStyle({ textShadowColor: 'red', textShadowRadius: 0 })).toEqual({});
      expect(createCompileableStyle({ textShadowColor: 'red', textShadowRadius: 5 })).toEqual({
        textShadow: '0px 0px 5px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor, textShadowOffset, textShadowRadius', () => {
      expect(
        createCompileableStyle({
          textShadowColor: 'rgba(50,60,70,0.50)',
          textShadowOffset: { width: 5, height: 10 },
          textShadowRadius: 15
        })
      ).toEqual({
        textShadow: '5px 10px 15px rgba(50,60,70,0.50)'
      });
    });
  });
});
