/* eslint-env jasmine, jest */

import logicalStylePolyfill from '../compiler/logicalStylePolyfill';

describe('StyleSheet/logicalStylePolyfill', () => {
  describe('isRTL is false', () => {
    test('converts end/start properties', () => {
      const initial = {
        borderStartColor: 'red',
        start: 1,
        marginStart: 5,
        paddingEnd: 10
      };
      const expected = {
        borderLeftColor: 'red',
        left: 1,
        marginLeft: 5,
        paddingRight: 10
      };
      expect(logicalStylePolyfill(initial)).toEqual(expected);
    });

    test('converts end/start values', () => {
      const initial = {
        float: 'start',
        textAlign: 'end',
        transitionProperty: 'marginStart'
      };
      const expected = {
        float: 'left',
        textAlign: 'right',
        transitionProperty: 'marginLeft'
      };
      expect(logicalStylePolyfill(initial)).toEqual(expected);
    });

    test('noop on left/right properties', () => {
      const initial = {
        paddingLeft: 0,
        left: 0,
        marginRight: 0,
        paddingRight: 10
      };
      expect(logicalStylePolyfill(initial)).toEqual(initial);
    });

    test('noop on left/right values', () => {
      const initial = {
        clear: 'left',
        float: 'left',
        textAlign: 'right',
        textShadowOffset: { width: '1rem', height: 10 },
        transitionProperty: 'marginLeft'
      };
      expect(logicalStylePolyfill(initial)).toEqual(initial);
    });

    test('end/start properties take precedence', () => {
      const initial = {
        borderStartWidth: 10,
        borderLeftWidth: 0,
        end: 10,
        right: 0,
        marginStart: 10,
        marginLeft: 0
      };
      const expected = {
        borderLeftWidth: 10,
        marginLeft: 10,
        right: 10
      };
      expect(logicalStylePolyfill(initial)).toEqual(expected);
    });
  });

  describe('isRTL is true', () => {
    const isRTL = true;

    test('converts end/start properties', () => {
      const initial = {
        borderStartColor: 'red',
        start: 1,
        marginStart: 5,
        paddingEnd: 10
      };
      const expected = {
        borderRightColor: 'red',
        right: 1,
        marginRight: 5,
        paddingLeft: 10
      };
      expect(logicalStylePolyfill(initial, isRTL)).toEqual(expected);
    });

    test('converts end/start values', () => {
      const initial = {
        float: 'start',
        textAlign: 'end',
        transitionProperty: 'marginStart'
      };
      const expected = {
        float: 'right',
        textAlign: 'left',
        transitionProperty: 'marginRight'
      };
      expect(logicalStylePolyfill(initial, isRTL)).toEqual(expected);
    });

    test('noop on left/right properties', () => {
      const initial = {
        paddingLeft: 0,
        left: 0,
        marginRight: 0,
        paddingRight: 10
      };
      expect(logicalStylePolyfill(initial, isRTL)).toEqual(initial);
    });

    test('noop on left/right values', () => {
      const initial = {
        clear: 'left',
        float: 'left',
        textAlign: 'right',
        textShadowOffset: { width: '1rem', height: 10 },
        transitionProperty: 'marginLeft'
      };
      expect(logicalStylePolyfill(initial, isRTL)).toEqual(initial);
    });

    test('end/start properties take precedence', () => {
      const style = {
        borderStartWidth: 10,
        borderRightWidth: 0,
        end: 10,
        left: 0,
        marginStart: 10,
        marginRight: 0
      };
      const expected = {
        borderRightWidth: 10,
        marginRight: 10,
        left: 10
      };
      expect(logicalStylePolyfill(style, isRTL)).toEqual(expected);
    });
  });
});
