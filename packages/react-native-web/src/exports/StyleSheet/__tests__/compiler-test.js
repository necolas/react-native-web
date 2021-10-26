/* eslint-env jasmine, jest */

'use strict';

import { atomic, classic, inline } from '../compiler';

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
        scrollbarWidth: 'none',
        pointerEvents: 'box-only',
        transform: [
          {
            translateX: 50,
            scale: -1
          }
        ]
      });

      expect(result).toMatchInlineSnapshot(`
        [
          {
            "$$css": true,
            "animationDirection": "r-animationDirection-1kmv48j",
            "animationKeyframes": "r-animationKeyframes-zacbmr",
            "fontFamily": "r-fontFamily-1qd0xha",
            "marginHorizontal": "r-marginHorizontal-vlx1xi",
            "placeholderTextColor": "r-placeholderTextColor-1418aci",
            "pointerEvents": "r-pointerEvents-ah5dr5",
            "scrollbarWidth": "r-scrollbarWidth-2eszeu",
            "transform": "r-transform-1ehiua4",
          },
          [
            [
              [
                ".r-animationDirection-1kmv48j{animation-direction:alternate,alternate-reverse;}",
              ],
              2.2,
            ],
            [
              [
                ".r-animationKeyframes-zacbmr{animation-name:r-animation-8jhqzh,r-animation-5azpl5;}",
                "@-webkit-keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
                "@keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
                "@-webkit-keyframes r-animation-5azpl5{from{left:0px;}to{left:10px;}}",
                "@keyframes r-animation-5azpl5{from{left:0px;}to{left:10px;}}",
              ],
              2.2,
            ],
            [
              [
                ".r-fontFamily-1qd0xha{font-family:-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Helvetica,Arial,sans-serif;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginHorizontal-vlx1xi{margin-left:10px;margin-right:10px;}",
              ],
              2.1,
            ],
            [
              [
                ".r-placeholderTextColor-1418aci::-webkit-input-placeholder{color:rgba(128,128,128,1.00);opacity:1;}",
                ".r-placeholderTextColor-1418aci::-moz-placeholder{color:rgba(128,128,128,1.00);opacity:1;}",
                ".r-placeholderTextColor-1418aci:-ms-input-placeholder{color:rgba(128,128,128,1.00);opacity:1;}",
                ".r-placeholderTextColor-1418aci::placeholder{color:rgba(128,128,128,1.00);opacity:1;}",
              ],
              2.2,
            ],
            [
              [
                ".r-pointerEvents-ah5dr5>*{pointer-events:none;}",
                ".r-pointerEvents-ah5dr5{pointer-events:auto!important;}",
              ],
              2.2,
            ],
            [
              [
                ".r-scrollbarWidth-2eszeu::-webkit-scrollbar{display:none}",
                ".r-scrollbarWidth-2eszeu{scrollbar-width:none;}",
              ],
              2.2,
            ],
            [
              [
                ".r-transform-1ehiua4{transform:translateX(50px);}",
              ],
              2.2,
            ],
          ],
        ]
      `);
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
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "$$css": true,
            "css-text-1jr0ypv": "css-text-1jr0ypv",
          },
          [
            [
              [
                "@-webkit-keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
                "@keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
                "@-webkit-keyframes r-animation-5azpl5{from{left:0px;}to{left:10px;}}",
                "@keyframes r-animation-5azpl5{from{left:0px;}to{left:10px;}}",
                ".css-text-1jr0ypv{animation-direction:alternate,alternate-reverse;animation-name:r-animation-8jhqzh,r-animation-5azpl5;font:14px -apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Helvetica,Arial,sans-serif;margin-left:10px;margin-right:10px;transform:translateX(50px);}",
              ],
              1,
            ],
          ],
        ]
      `);
    });
  });

  describe('inline', () => {
    test('converts style to inline styles', () => {
      const result = inline({
        marginHorizontal: 10,
        display: 'flex',
        flexShrink: 1
      });

      expect(result).toMatchInlineSnapshot(`
        {
          "display": "flex",
          "flexShrink": 1,
          "marginLeft": "10px",
          "marginRight": "10px",
        }
      `);
    });
  });
});
