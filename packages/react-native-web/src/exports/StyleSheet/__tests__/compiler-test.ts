/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { atomic, classic } from '../compiler';
import createReactDOMStyle from '../compiler/createReactDOMStyle';

const inline = (style: Readonly<Record<string, unknown>>) =>
  createReactDOMStyle(style, true);

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
            "animationDirection": "r-animationDirection-1wgwto7",
            "animationKeyframes": "r-animationKeyframes-zacbmr",
            "fontFamily": "r-fontFamily-1qd0xha",
            "insetInlineStart": "r-insetInlineStart-1a9qabf",
            "marginBlockEnd": "r-marginBlockEnd-1xf1q1v",
            "marginInline": "r-marginInline-lcslpx",
            "marginInlineEnd": "r-marginInlineEnd-1c1fkyo",
            "marginInlineStart": "r-marginInlineStart-1k2jm4g",
            "placeholderTextColor": "r-placeholderTextColor-1418aci",
            "pointerEvents": "r-pointerEvents-ah5dr5",
            "scrollbarWidth": "r-scrollbarWidth-2eszeu",
            "textAlign": "r-textAlign-14537ki",
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
                "@keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
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
                ".r-insetInlineStart-1a9qabf{inset-inline-start:12.34%;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginBlockEnd-1xf1q1v{margin-block-end:5px;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginInline-lcslpx{margin-inline:10px;}",
              ],
              2.1,
            ],
            [
              [
                ".r-marginInlineEnd-1c1fkyo{margin-inline-end:2px;}",
              ],
              2.2,
            ],
            [
              [
                ".r-marginInlineStart-1k2jm4g{margin-inline-start:1px;}",
              ],
              2.2,
            ],
            [
              [
                ".r-placeholderTextColor-1418aci::placeholder{color:rgba(128,128,128,1.00);opacity:1;}",
              ],
              3,
            ],
            [
              [
                ".r-pointerEvents-ah5dr5>* {pointer-events:none;}",
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
                ".r-textAlign-14537ki{text-align:start;}",
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
               ".r-pointerEvents-633pao>* {pointer-events:none;}",
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
               ".r-pointerEvents-12vffkv>* {pointer-events:auto;}",
               ".r-pointerEvents-12vffkv{pointer-events:none!important;}",
             ],
             3,
           ],
         ],
       ]
      `);
    });

    test('expands physical axis shortform properties', () => {
      expect(atomic({ marginHorizontal: 10 })).toMatchInlineSnapshot(`
        [
          {
            "$$css": true,
            "marginHorizontal": "r-marginHorizontal-vlx1xi",
          },
          [
            [
              [
                ".r-marginHorizontal-vlx1xi{margin-left:10px;margin-right:10px;}",
              ],
              2.3,
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
                "@keyframes r-animation-8jhqzh{0%{top:0px;}50%{top:5px;}100%{top:10px;}}",
                "@keyframes r-animation-5azpl5{from{left:0px;}to{left:10px;}}",
                ".css-test-tbk4su{animation-direction:alternate,alternate-reverse;animation-name:r-animation-8jhqzh,r-animation-5azpl5;font:14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;margin-inline:10px;transform:translateX(50px) scale(-1);}",
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
          "marginBlockEnd": "5px",
          "marginInlineEnd": "10px",
          "marginInlineStart": "10px",
        }
      `);
    });

    test('axis shortform properties take precedence over shortform properties', () => {
      const expected = {
        borderBlockEndColor: 'rgba(255,0,0,1.00)',
        borderBlockStartColor: 'rgba(255,0,0,1.00)',
        borderLeftColor: 'rgba(0,0,255,1.00)',
        borderRightColor: 'rgba(0,0,255,1.00)'
      };
      expect(inline({ borderBlockColor: 'red', borderColor: 'blue' })).toEqual(
        expected
      );
      expect(inline({ borderColor: 'blue', borderBlockColor: 'red' })).toEqual(
        expected
      );
      expect(inline({ marginInline: 4, margin: 8 })).toEqual({
        marginBottom: '8px',
        marginInlineEnd: '4px',
        marginInlineStart: '4px',
        marginTop: '8px'
      });
      expect(inline({ marginHorizontal: 4, margin: 8 })).toEqual({
        marginBottom: '8px',
        marginLeft: '4px',
        marginRight: '4px',
        marginTop: '8px'
      });
    });

    test('longform properties take precedence over shortform properties', () => {
      expect(inline({ rowGap: 5, gap: 10 })).toEqual({
        columnGap: '10px',
        rowGap: '5px'
      });
      expect(inline({ marginBlock: 16 })).toEqual({
        marginBlockEnd: '16px',
        marginBlockStart: '16px'
      });
      expect(inline({ marginVertical: 16 })).toEqual({
        marginBottom: '16px',
        marginTop: '16px'
      });
      expect(inline({ marginLeft: 8, marginHorizontal: 16 })).toEqual({
        marginLeft: '8px',
        marginRight: '16px'
      });
      expect(inline({ marginInlineStart: 8, marginInline: 16 })).toEqual({
        marginInlineEnd: '16px',
        marginInlineStart: '8px'
      });
      expect(inline({ paddingTop: 4, padding: 10 })).toEqual({
        paddingBottom: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '4px'
      });
    });

    test('shortform properties expand to logical properties next to logical longform properties', () => {
      expect(inline({ marginBlockStart: 8, margin: 16 })).toEqual({
        marginBlockEnd: '16px',
        marginBlockStart: '8px',
        marginLeft: '16px',
        marginRight: '16px'
      });
      expect(inline({ paddingInlineStart: 4, padding: 10 })).toEqual({
        paddingBottom: '10px',
        paddingInlineEnd: '10px',
        paddingInlineStart: '4px',
        paddingTop: '10px'
      });
      expect(inline({ insetInlineEnd: 0, inset: 10 })).toEqual({
        bottom: '10px',
        insetInlineEnd: '0px',
        insetInlineStart: '10px',
        top: '10px'
      });
      expect(
        inline({ borderInlineStartColor: 'red', borderColor: 'blue' })
      ).toEqual({
        borderBottomColor: 'rgba(0,0,255,1.00)',
        borderInlineEndColor: 'rgba(0,0,255,1.00)',
        borderInlineStartColor: 'rgba(255,0,0,1.00)',
        borderTopColor: 'rgba(0,0,255,1.00)'
      });
      expect(inline({ borderStartStartRadius: 10, borderRadius: 4 })).toEqual({
        borderEndEndRadius: '4px',
        borderEndStartRadius: '4px',
        borderStartEndRadius: '4px',
        borderStartStartRadius: '10px'
      });
    });

    test('static shortform properties expand to logical properties next to logical longform properties', () => {
      expect(
        createReactDOMStyle({
          borderColor: 'blue',
          borderInlineStartColor: 'red'
        })
      ).toEqual({
        borderBottomColor: 'rgba(0,0,255,1.00)',
        borderInlineEndColor: 'rgba(0,0,255,1.00)',
        borderInlineStartColor: 'rgba(255,0,0,1.00)',
        borderTopColor: 'rgba(0,0,255,1.00)'
      });
    });

    test('keeps logical properties and values', () => {
      const initial = {
        borderInlineEndColor: 'red',
        borderInlineStartWidth: 1,
        borderStartStartRadius: 2,
        clear: 'inline-start',
        float: 'inline-end',
        insetInlineStart: 1,
        marginInlineEnd: 5,
        paddingInlineStart: 10,
        textAlign: 'start',
        transitionProperty: 'margin-inline-start'
      };

      expect(inline(initial)).toEqual({
        borderInlineEndColor: 'rgba(255,0,0,1.00)',
        borderInlineStartWidth: '1px',
        borderStartStartRadius: '2px',
        clear: 'inline-start',
        float: 'inline-end',
        insetInlineStart: '1px',
        marginInlineEnd: '5px',
        paddingInlineStart: '10px',
        textAlign: 'start',
        transitionProperty: 'margin-inline-start'
      });
    });
  });
});
