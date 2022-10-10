/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { atomic, classic, inline } from '../compiler';

describe('StyleSheet/compile', () => {
  describe('atomic', () => {
    test.only('converts style to atomic CSS', () => {
      const result = atomic({
        animationDirection: ['alternate', 'alternate-reverse'],
        animationKeyframes: [
          { '0%': { top: 0 }, '50%': { top: 5 }, '100%': { top: 10 } },
          { from: { left: 0 }, to: { left: 10 } }
        ],
        fontFamily: 'System',
        marginHorizontal: 10,
        marginStart: 1,
        marginEnd: 2,
        placeholderTextColor: 'gray',
        scrollbarWidth: 'none',
        pointerEvents: 'box-only',
        start: '12.34%',
        textAlign: 'start',
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
            "$$css$localize": true,
            "animationDirection": "r-animationDirection-1kmv48j",
            "animationKeyframes": "r-animationKeyframes-zacbmr",
            "fontFamily": "r-fontFamily-1qd0xha",
            "marginEnd": [
              "r-marginRight-a5pmau",
              "r-marginLeft-9cviqr",
            ],
            "marginHorizontal": "r-marginHorizontal-vlx1xi",
            "marginStart": [
              "r-marginLeft-13kc5u0",
              "r-marginRight-1knfw1x",
            ],
            "placeholderTextColor": "r-placeholderTextColor-1418aci",
            "pointerEvents": "r-pointerEvents-ah5dr5",
            "scrollbarWidth": "r-scrollbarWidth-2eszeu",
            "start": [
              "r-left-2s0hu9",
              "r-right-1bnbe1j",
            ],
            "textAlign": [
              "r-textAlign-fdjqy7",
              "r-textAlign-1ff274t",
            ],
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
                ".r-marginRight-a5pmau{margin-right:2px;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginLeft-9cviqr{margin-left:2px;}",
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
                ".r-marginLeft-13kc5u0{margin-left:1px;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginRight-1knfw1x{margin-right:1px;}",
              ],
              2.2,
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
                ".r-left-2s0hu9{left:12.34%;}",
              ],
              2.2,
            ],
            [
              [
                ".r-right-1bnbe1j{right:12.34%;}",
              ],
              2.2,
            ],
            [
              [
                ".r-textAlign-fdjqy7{text-align:left;}",
              ],
              2.2,
            ],
            [
              [
                ".r-textAlign-1ff274t{text-align:right;}",
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

    describe('logical style polyfill', () => {
      [false, true].forEach((isRTL) => {
        const dir = isRTL ? 'rtl' : 'ltr';

        test(`ignores "left" properties for ${dir}`, () => {
          const initial = {
            borderLeftColor: 'rgba(255,0,0,1.00)',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            left: '1px',
            marginLeft: '5px',
            paddingLeft: '10px'
          };
          expect(inline(initial, isRTL)).toEqual(initial);
        });

        test(`ignores "right" properties for ${dir}`, () => {
          const initial = {
            borderRightColor: 'rgba(255,0,0,1.00)',
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            right: '1px',
            marginRight: '5px',
            paddingRight: '10px'
          };
          expect(inline(initial, isRTL)).toEqual(initial);
        });

        test(`ignores "left" values for ${dir}`, () => {
          const initial = {
            clear: 'left',
            float: 'left',
            textAlign: 'left',
            transitionProperty: 'left'
          };
          expect(inline(initial, isRTL)).toEqual(initial);
        });

        test(`ignores "right" values for ${dir}`, () => {
          const initial = {
            clear: 'right',
            float: 'right',
            textAlign: 'right',
            transitionProperty: 'right'
          };
          expect(inline(initial, isRTL)).toEqual(initial);
        });

        test(`converts "start" properties for ${dir}`, () => {
          const initial = {
            borderStartColor: 'red',
            borderStartStyle: 'solid',
            borderStartWidth: 1,
            start: 1,
            marginStart: 5,
            paddingStart: 10
          };

          const expectedLTR = {
            borderLeftColor: 'rgba(255,0,0,1.00)',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            left: '1px',
            marginLeft: '5px',
            paddingLeft: '10px'
          };
          const expectedRTL = {
            borderRightColor: 'rgba(255,0,0,1.00)',
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            right: '1px',
            marginRight: '5px',
            paddingRight: '10px'
          };
          expect(inline(initial, isRTL)).toEqual(
            isRTL ? expectedRTL : expectedLTR
          );
        });

        test(`converts "end" properties for ${dir}`, () => {
          const initial = {
            borderEndColor: 'red',
            borderEndStyle: 'solid',
            borderEndWidth: 1,
            end: 1,
            marginEnd: 5,
            paddingEnd: 10
          };

          const expectedLTR = {
            borderRightColor: 'rgba(255,0,0,1.00)',
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            right: '1px',
            marginRight: '5px',
            paddingRight: '10px'
          };
          const expectedRTL = {
            borderLeftColor: 'rgba(255,0,0,1.00)',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            left: '1px',
            marginLeft: '5px',
            paddingLeft: '10px'
          };
          expect(inline(initial, isRTL)).toEqual(
            isRTL ? expectedRTL : expectedLTR
          );
        });

        test(`converts "start" values for ${dir}`, () => {
          const initial = {
            clear: 'start',
            float: 'start',
            textAlign: 'start',
            transitionProperty: 'start'
          };

          const expectedLTR = {
            clear: 'left',
            float: 'left',
            textAlign: 'left',
            transitionProperty: 'left'
          };
          const expectedRTL = {
            clear: 'right',
            float: 'right',
            textAlign: 'right',
            transitionProperty: 'right'
          };
          expect(inline(initial, isRTL)).toEqual(
            isRTL ? expectedRTL : expectedLTR
          );
        });

        test(`converts "end" values for ${dir}`, () => {
          const initial = {
            clear: 'end',
            float: 'end',
            textAlign: 'end',
            transitionProperty: 'end'
          };

          const expectedLTR = {
            clear: 'right',
            float: 'right',
            textAlign: 'right',
            transitionProperty: 'right'
          };
          const expectedRTL = {
            clear: 'left',
            float: 'left',
            textAlign: 'left',
            transitionProperty: 'left'
          };
          expect(inline(initial, isRTL)).toEqual(
            isRTL ? expectedRTL : expectedLTR
          );
        });

        test('end/start properties take precedence over left/right', () => {
          const initialLTR = {
            borderStartWidth: 10,
            borderLeftWidth: 0,
            end: 10,
            right: 0,
            marginStart: 10,
            marginLeft: 0
          };
          const expectedLTR = {
            borderLeftWidth: '10px',
            marginLeft: '10px',
            right: '10px'
          };

          const initialRTL = {
            borderStartWidth: 10,
            borderRightWidth: 0,
            end: 10,
            left: 0,
            marginStart: 10,
            marginRight: 0
          };
          const expectedRTL = {
            borderRightWidth: '10px',
            marginRight: '10px',
            left: '10px'
          };
          expect(inline(isRTL ? initialRTL : initialLTR, isRTL)).toEqual(
            isRTL ? expectedRTL : expectedLTR
          );
        });
      });
    });
  });
});
