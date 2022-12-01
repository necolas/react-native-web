/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { preprocess } from '../preprocess';

describe('StyleSheet/preprocess', () => {
  describe('non-standard styles', () => {
    test('converts non-standard logical styles', () => {
      expect(
        preprocess({
          end: 1,
          marginEnd: 1,
          marginHorizontal: 1,
          marginStart: 1,
          marginVertical: 1,
          paddingEnd: 1,
          paddingHorizontal: 1,
          paddingStart: 1,
          paddingVertical: 1,
          start: 1
        })
      ).toEqual({
        insetInlineEnd: 1,
        insetInlineStart: 1,
        marginBlock: 1,
        marginInline: 1,
        marginInlineEnd: 1,
        marginInlineStart: 1,
        paddingBlock: 1,
        paddingInline: 1,
        paddingInlineEnd: 1,
        paddingInlineStart: 1
      });
    });

    test('respects standard logical styles', () => {
      expect(
        preprocess({
          end: 1,
          marginEnd: 1,
          marginHorizontal: 1,
          marginStart: 1,
          marginVertical: 1,
          paddingEnd: 1,
          paddingHorizontal: 1,
          paddingStart: 1,
          paddingVertical: 1,
          start: 1,
          // standard
          insetInlineEnd: 2,
          insetInlineStart: 2,
          marginBlock: 2,
          marginInline: 2,
          marginInlineEnd: 2,
          marginInlineStart: 2,
          paddingBlock: 2,
          paddingInline: 2,
          paddingInlineEnd: 2,
          paddingInlineStart: 2
        })
      ).toEqual({
        insetInlineEnd: 2,
        insetInlineStart: 2,
        marginBlock: 2,
        marginInline: 2,
        marginInlineEnd: 2,
        marginInlineStart: 2,
        paddingBlock: 2,
        paddingInline: 2,
        paddingInlineEnd: 2,
        paddingInlineStart: 2
      });
    });
  });

  describe('preprocesses multiple shadow styles into a single declaration', () => {
    test('shadowColor only', () => {
      expect(preprocess({ shadowColor: 'red' })).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,1.00)'
      });
    });

    test('shadowColor and shadowOpacity only', () => {
      expect(preprocess({ shadowColor: 'red', shadowOpacity: 0.5 })).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,0.50)'
      });
    });

    test('shadowOffset only', () => {
      expect(preprocess({ shadowOffset: { width: 1, height: 2 } })).toEqual({
        boxShadow: '1px 2px 0px rgba(0,0,0,1.00)'
      });
    });

    test('shadowRadius only', () => {
      expect(preprocess({ shadowRadius: 5 })).toEqual({
        boxShadow: '0px 0px 5px rgba(0,0,0,1.00)'
      });
    });

    test('shadowOffset, shadowRadius, shadowColor', () => {
      expect(
        preprocess({
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
      expect(preprocess({ textShadowColor: 'red' })).toEqual({});
    });

    test('textShadowOffset only', () => {
      expect(preprocess({ textShadowOffset: { width: 1, height: 2 } })).toEqual(
        {}
      );
    });

    test('textShadowRadius only', () => {
      expect(preprocess({ textShadowRadius: 5 })).toEqual({});
    });

    test('textShadowColor and textShadowOffset only', () => {
      expect(
        preprocess({
          textShadowColor: 'red',
          textShadowOffset: { width: 0, height: 0 }
        })
      ).toEqual({});
      expect(
        preprocess({
          textShadowColor: 'red',
          textShadowOffset: { width: -1, height: 0 }
        })
      ).toEqual({
        textShadow: '-1px 0px 0px rgba(255,0,0,1.00)'
      });
      expect(
        preprocess({
          textShadowColor: 'red',
          textShadowOffset: { width: 1, height: 2 }
        })
      ).toEqual({
        textShadow: '1px 2px 0px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor and textShadowRadius only', () => {
      expect(
        preprocess({ textShadowColor: 'red', textShadowRadius: 0 })
      ).toEqual({});
      expect(
        preprocess({ textShadowColor: 'red', textShadowRadius: 5 })
      ).toEqual({
        textShadow: '0px 0px 5px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor, textShadowOffset, textShadowRadius', () => {
      expect(
        preprocess({
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
