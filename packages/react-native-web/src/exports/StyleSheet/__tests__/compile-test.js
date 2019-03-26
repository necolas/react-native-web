/* eslint-env jasmine, jest */

'use strict';

import { atomic, classic, inline } from '../compile';

describe('StyleSheet/compile', () => {
  describe('atomic', () => {
    test('converts style to atomic CSS', () => {
      const result = atomic({
        animationDirection: ['alternate', 'alternate-reverse'],
        animationKeyframes: [
          { '0%': { top: 0 }, '50%': { top: 5 }, '100%': { top: 10 } },
          { from: { left: 0 }, to: { left: 10 } }
        ],
        fontFamily: 'System',
        marginHorizontal: 10,
        placeholderTextColor: 'gray',
        scrollIndicator: 'none',
        pointerEvents: 'box-only',
        transform: [
          {
            translateX: 50,
            scale: -1
          }
        ]
      });

      expect(result).toMatchSnapshot();
    });
  });

  describe('classic', () => {
    test('converts style to classic CSS', () => {
      const result = classic(
        {
          animationDirection: ['alternate', 'alternate-reverse'],
          animationKeyframes: [
            { '0%': { top: 0 }, '50%': { top: 5 }, '100%': { top: 10 } },
            { from: { left: 0 }, to: { left: 10 } }
          ],
          marginHorizontal: 10,
          font: '14px System',
          transform: [
            {
              translateX: 50,
              scale: -1
            }
          ]
        },
        'text'
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('inline', () => {
    test('converts style to inline styles', () => {
      const result = inline({
        marginHorizontal: 10,
        display: 'flex',
        flexShrink: 1
      });

      expect(result).toMatchSnapshot();
    });
  });
});
