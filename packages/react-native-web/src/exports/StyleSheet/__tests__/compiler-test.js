/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { atomic, classic, inline } from '../compiler';

describe('StyleSheet/compile', () => {
  describe('atomic', () => {
    test('converts style to atomic CSS', () => {
      const result = atomic({
        animationDirection: 'alternate,alternate-reverse',
        animationKeyframes: [
          { '0%': { top: 0 }, '50%': { top: 5 }, '100%': { top: 10 } },
          { from: { left: 0 }, to: { left: 10 } }
        ],
        fontFamily: 'System',
        insetInlineStart: '12.34%',
        marginBlockEnd: 5,
        marginInline: 10,
        marginInlineEnd: 2,
        marginInlineStart: 1,
        placeholderTextColor: 'gray',
        scrollbarWidth: 'none',
        pointerEvents: 'box-only',
        textAlign: 'start',
        transform: 'translateX(50px) scale(-1)'
      });

      expect(result).toMatchInlineSnapshot(`
        [
          {
            "$$css": true,
            "$$css$localize": true,
            "animationDirection": "r-animationDirection-1wgwto7",
            "animationKeyframes": "r-animationKeyframes-zacbmr",
            "fontFamily": "r-fontFamily-1qd0xha",
            "insetInlineStart": [
              "r-insetInlineStart-1xn1m1p",
              "r-insetInlineStart-1y2vi53",
            ],
            "marginBlockEnd": "r-marginBlockEnd-1xf1q1v",
            "marginInline": "r-marginInline-lcslpx",
            "marginInlineEnd": [
              "r-marginInlineEnd-n2wkgt",
              "r-marginInlineEnd-r7lizz",
            ],
            "marginInlineStart": [
              "r-marginInlineStart-hjq6k0",
              "r-marginInlineStart-1iwt575",
            ],
            "placeholderTextColor": "r-placeholderTextColor-1418aci",
            "pointerEvents": "r-pointerEvents-ah5dr5",
            "scrollbarWidth": "r-scrollbarWidth-2eszeu",
            "textAlign": [
              "r-textAlign-fdjqy7",
              "r-textAlign-1ff274t",
            ],
            "transform": "r-transform-d7xd9i",
          },
          [
            [
              [
                ".r-animationDirection-1wgwto7{animation-direction:alternate,alternate-reverse;}",
              ],
              3,
            ],
            [
              [
                ".r-animationKeyframes-zacbmr{animation-name:r-animation-8jhqzh,r-animation-5azpl5;}",
                "@-webkit-keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
                "@keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
                "@-webkit-keyframes r-animation-5azpl5{from{left:0px;}to{left:10px;}}",
                "@keyframes r-animation-5azpl5{from{left:0px;}to{left:10px;}}",
              ],
              3,
            ],
            [
              [
                ".r-fontFamily-1qd0xha{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}",
              ],
              3,
            ],
            [
              [
                ".r-insetInlineStart-1xn1m1p{left:12.34%;}",
              ],
              2.2,
            ],
            [
              [
                ".r-insetInlineStart-1y2vi53{right:12.34%;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginBlockEnd-1xf1q1v{margin-bottom:5px;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginInline-lcslpx{margin-left:10px;margin-right:10px;}",
              ],
              2.1,
            ],
            [
              [
                ".r-marginInlineEnd-n2wkgt{margin-right:2px;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginInlineEnd-r7lizz{margin-left:2px;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginInlineStart-hjq6k0{margin-left:1px;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginInlineStart-1iwt575{margin-right:1px;}",
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
              3,
            ],
            [
              [
                ".r-pointerEvents-ah5dr5 * {pointer-events:none;}",
                ".r-pointerEvents-ah5dr5{pointer-events:auto!important;}",
              ],
              3,
            ],
            [
              [
                ".r-scrollbarWidth-2eszeu::-webkit-scrollbar{display:none}",
                ".r-scrollbarWidth-2eszeu{scrollbar-width:none;}",
              ],
              3,
            ],
            [
              [
                ".r-textAlign-fdjqy7{text-align:left;}",
              ],
              3,
            ],
            [
              [
                ".r-textAlign-1ff274t{text-align:right;}",
              ],
              3,
            ],
            [
              [
                ".r-transform-d7xd9i{transform:translateX(50px) scale(-1);}",
              ],
              3,
            ],
          ],
        ]
      `);
    });

    test('when parent is pointer-events=none, pointer-events=none applied to children', () => {
      const result = atomic({
        pointerEvents: 'none'
      });

      expect(result).toMatchInlineSnapshot(`
        [
          {
            "$$css": true,
            "pointerEvents": "r-pointerEvents-633pao",
          },
          [
            [
              [
                ".r-pointerEvents-633pao * {pointer-events:none;}",
                ".r-pointerEvents-633pao{pointer-events:none!important;}",
              ],
              3,
            ],
          ],
        ]
      `);
    });

    test('when parent is pointer-events=box-none, pointer-events=auto applied to children', () => {
      const result = atomic({
        pointerEvents: 'box-none'
      });

      expect(result).toMatchInlineSnapshot(`
        [
          {
            "$$css": true,
            "pointerEvents": "r-pointerEvents-12vffkv",
          },
          [
            [
              [
                ".r-pointerEvents-12vffkv * {pointer-events:auto;}",
                ".r-pointerEvents-12vffkv{pointer-events:none!important;}",
              ],
              3,
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
          animationDirection: 'alternate,alternate-reverse',
          animationKeyframes: [
            { '0%': { top: 0 }, '50%': { top: 5 }, '100%': { top: 10 } },
            { from: { left: 0 }, to: { left: 10 } }
          ],
          marginInline: 10,
          font: '14px System',
          transform: 'translateX(50px) scale(-1)'
        },
        'test'
      );
      expect(result).toMatchInlineSnapshot(`
        [
          {
            "$$css": true,
            "css-test-tbk4su": "css-test-tbk4su",
          },
          [
            [
              [
                "@-webkit-keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
                "@keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
                "@-webkit-keyframes r-animation-5azpl5{from{left:0px;}to{left:10px;}}",
                "@keyframes r-animation-5azpl5{from{left:0px;}to{left:10px;}}",
                ".css-test-tbk4su{animation-direction:alternate,alternate-reverse;animation-name:r-animation-8jhqzh,r-animation-5azpl5;font:14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;margin-left:10px;margin-right:10px;transform:translateX(50px) scale(-1);}",
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
        marginBlockEnd: 5,
        marginInline: 10,
        display: 'flex',
        flexShrink: 1
      });

      expect(result).toMatchInlineSnapshot(`
        {
          "display": "flex",
          "flexShrink": 1,
          "marginBottom": "5px",
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
            borderInlineStartColor: 'red',
            borderInlineStartStyle: 'solid',
            borderInlineStartWidth: 1,
            insetInlineStart: 1,
            marginBlockStart: 5,
            marginInlineStart: 5,
            paddingInlineStart: 10
          };

          const expectedLTR = {
            borderLeftColor: 'rgba(255,0,0,1.00)',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            left: '1px',
            marginLeft: '5px',
            marginTop: '5px',
            paddingLeft: '10px'
          };
          const expectedRTL = {
            borderRightColor: 'rgba(255,0,0,1.00)',
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            right: '1px',
            marginRight: '5px',
            marginTop: '5px',
            paddingRight: '10px'
          };
          expect(inline(initial, isRTL)).toEqual(
            isRTL ? expectedRTL : expectedLTR
          );
        });

        test(`converts "end" properties for ${dir}`, () => {
          const initial = {
            borderInlineEndColor: 'red',
            borderInlineEndStyle: 'solid',
            borderInlineEndWidth: 1,
            insetInlineEnd: 1,
            marginBlockEnd: 5,
            marginInlineEnd: 5,
            paddingInlineEnd: 10
          };

          const expectedLTR = {
            borderRightColor: 'rgba(255,0,0,1.00)',
            borderRightStyle: 'solid',
            borderRightWidth: '1px',
            right: '1px',
            marginBottom: '5px',
            marginRight: '5px',
            paddingRight: '10px'
          };
          const expectedRTL = {
            borderLeftColor: 'rgba(255,0,0,1.00)',
            borderLeftStyle: 'solid',
            borderLeftWidth: '1px',
            left: '1px',
            marginBottom: '5px',
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
            transitionProperty: 'insetInlineStart'
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
            transitionProperty: 'insetInlineEnd'
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

        test('physical properties take precedence over logical properties', () => {
          const initialLTR = {
            borderInlineStartWidth: 10,
            borderLeftWidth: 0,
            insetInlineEnd: 10,
            right: 0,
            insetBlockStart: 5,
            top: 0,
            marginInlineStart: 10,
            marginLeft: 0
          };
          const expectedLTR = {
            borderLeftWidth: '0px',
            marginLeft: '0px',
            right: '0px',
            top: '0px'
          };

          const initialRTL = {
            borderInlineStartWidth: 10,
            borderRightWidth: 0,
            insetInlineEnd: 10,
            left: 0,
            insetBlockStart: 5,
            top: 0,
            marginInlineStart: 10,
            marginRight: 0
          };
          const expectedRTL = {
            borderRightWidth: '0px',
            marginRight: '0px',
            left: '0px',
            top: '0px'
          };
          expect(inline(isRTL ? initialRTL : initialLTR, isRTL)).toEqual(
            isRTL ? expectedRTL : expectedLTR
          );
        });
      });
    });
  });
});
