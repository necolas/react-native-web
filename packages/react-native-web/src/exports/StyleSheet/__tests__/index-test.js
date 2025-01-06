/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import StyleSheet from '../index';

describe('StyleSheet', () => {
  // test this first because subsequent 'create' calls will change the snapshot
  test('getSheet', () => {
    expect(StyleSheet.getSheet()).toMatchInlineSnapshot(`
      {
        "id": "react-native-stylesheet",
        "textContent": "[stylesheet-group="0"]{}
      body{margin:0;}
      button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}
      html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}
      input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}
      [stylesheet-group="3"]{}
      .r-bottom-1p0dtai{bottom:0px;}
      .r-left-1d2f490{left:0px;}
      .r-position-u8s1d{position:absolute;}
      .r-right-zchlnj{right:0px;}
      .r-top-ipm5af{top:0px;}",
      }
    `);
  });

  test('absoluteFill', () => {
    expect(StyleSheet.absoluteFill).toMatchInlineSnapshot(`
      {
        "bottom": 0,
        "left": 0,
        "position": "absolute",
        "right": 0,
        "top": 0,
      }
    `);
  });

  test('absoluteFillObject', () => {
    expect(StyleSheet.absoluteFillObject).toMatchInlineSnapshot(`
      {
        "bottom": 0,
        "left": 0,
        "position": "absolute",
        "right": 0,
        "top": 0,
      }
    `);
  });

  describe('create', () => {
    test('returns original style objects', () => {
      const style = StyleSheet.create({ root: { position: 'absolute' } });
      expect(style.root).toMatchInlineSnapshot(`
        {
          "position": "absolute",
        }
      `);
    });

    test('e2e resolves to classname', () => {
      const style = StyleSheet.create({ root: { position: 'absolute' } });
      expect(StyleSheet(style.root)).toMatchInlineSnapshot(`
        [
          "r-position-u8s1d",
          null,
        ]
      `);
    });

    test('e2e flattens shadow style properties', () => {
      const style = StyleSheet.create({
        root: {
          shadowColor: 'rgba(50,60,70,0.5)',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
          textShadowColor: 'rgba(50,60,70,0.50)',
          textShadowOffset: { width: 5, height: 10 },
          textShadowRadius: 15
        }
      });
      expect(StyleSheet(style.root)).toMatchInlineSnapshot(`
        [
          "r-boxShadow-o3ayyy r-textShadow-1x2q051",
          null,
        ]
      `);
    });
  });

  describe('flatten', () => {
    test('should merge style objects', () => {
      const style = StyleSheet.flatten([{ opacity: 1 }, { order: 2 }]);
      expect(style).toMatchInlineSnapshot(`
        {
          "opacity": 1,
          "order": 2,
        }
      `);
    });

    test('should override style properties', () => {
      const style = StyleSheet.flatten([
        { backgroundColor: '#000', order: 1 },
        { backgroundColor: '#023c69', order: null }
      ]);
      expect(style).toMatchInlineSnapshot(`
        {
          "backgroundColor": "#023c69",
          "order": null,
        }
      `);
    });

    test('should overwrite properties with `undefined`', () => {
      const style = StyleSheet.flatten([
        { backgroundColor: '#000' },
        { backgroundColor: undefined }
      ]);
      expect(style).toMatchInlineSnapshot(`
        {
          "backgroundColor": undefined,
        }
      `);
    });

    test('should not fail on falsy values', () => {
      expect(() => StyleSheet.flatten([null, false, undefined])).not.toThrow();
    });

    test('should not fail on single flatten style object', () => {
      const style = StyleSheet.create({
        opacity: 1,
        position: 'absolute'
      });
      expect(style).toMatchInlineSnapshot(`
        {
          "opacity": 1,
          "position": "absolute",
        }
      `);
    });

    test('should recursively flatten arrays', () => {
      const style = StyleSheet.flatten([
        null,
        [],
        [{ order: 2 }, { opacity: 1 }],
        { order: 3 }
      ]);
      expect(style).toMatchInlineSnapshot(`
        {
          "opacity": 1,
          "order": 3,
        }
      `);
    });
  });

  test('hairlineWidth', () => {
    expect(Number.isInteger(StyleSheet.hairlineWidth) === true).toBeTruthy();
  });

  describe('resolve', () => {
    test('empty', () => {
      expect(StyleSheet()).toMatchInlineSnapshot(`
        [
          "",
          null,
        ]
      `);
      expect(StyleSheet({})).toMatchInlineSnapshot(`
        [
          "",
          null,
        ]
      `);
      expect(StyleSheet([])).toMatchInlineSnapshot(`
        [
          "",
          null,
        ]
      `);
    });

    test('transforms compiled object to className', () => {
      expect(
        StyleSheet([
          {
            $$css: true,
            position: 'position-absolute',
            opacity: 'opacity-05',
            width: 'width-200'
          }
        ])
      ).toMatchInlineSnapshot(`
        [
          "position-absolute opacity-05 width-200",
          null,
        ]
      `);
    });

    test('transforms array of compiled objects to className', () => {
      expect(
        StyleSheet([
          {
            $$css: true,
            borderWidth: 'borderWidth-0',
            borderColor: 'borderColor-red',
            display: 'display-flex',
            width: 'width-100'
          },
          {
            $$css: true,
            position: 'position-absolute',
            opacity: 'opacity-05'
          },
          [
            {
              $$css: true,
              width: 'width-200'
            }
          ]
        ])
      ).toMatchInlineSnapshot(`
        [
          "borderWidth-0 borderColor-red display-flex position-absolute opacity-05 width-200",
          null,
        ]
      `);
    });

    test('dedupes class names and inline styles', () => {
      const styleACompiled = {
        $$css: true,
        backgroundColor: 'backgroundColor-red',
        display: 'display-block'
      };
      const styleBCompiled = {
        $$css: true,
        backgroundColor: 'backgroundColor-green',
        color: 'color-green'
      };
      const styleBInline = {
        backgroundColor: 'rgba(0,0,255,1.00)',
        color: null
      };

      const [className1, inlineStyle1] = StyleSheet([
        styleACompiled,
        styleBCompiled,
        styleBInline
      ]);
      expect(className1).toBe('display-block');
      expect(inlineStyle1).toEqual({ backgroundColor: 'rgba(0,0,255,1.00)' });

      const [className2, inlineStyle2] = StyleSheet([
        styleACompiled,
        styleBInline,
        styleBCompiled
      ]);
      expect(className2).toBe(
        'display-block backgroundColor-green color-green'
      );
      expect(inlineStyle2).toEqual(null);
    });

    test('long form inline style properties take precedence over static shorthand properties', () => {
      const styles1 = StyleSheet.create({
        test: { paddingHorizontal: '40px' }
      });
      const inlineStyle1 = { padding: '8px', paddingHorizontal: '40px' };
      expect(StyleSheet([styles1.test, inlineStyle1])).toMatchInlineSnapshot(`
        [
          "",
          {
            "paddingBottom": "8px",
            "paddingLeft": "40px",
            "paddingRight": "40px",
            "paddingTop": "8px",
          },
        ]
      `);

      const styles2 = StyleSheet.create({ test: { marginVertical: '40px' } });
      const inlineStyle2 = { margin: '8px', marginVertical: '40px' };
      expect(StyleSheet([styles2.test, inlineStyle2])).toMatchInlineSnapshot(`
        [
          "",
          {
            "marginBottom": "40px",
            "marginLeft": "8px",
            "marginRight": "8px",
            "marginTop": "40px",
          },
        ]
      `);
    });

    test('polyfills logical styles', () => {
      const inlineA = { start: '12.34%' };
      const inlineB = { textAlign: 'start' };
      const inlineC = { marginEnd: 10 };

      const a = StyleSheet.create({ x: { ...inlineA } }).x;
      const b = StyleSheet.create({ x: { ...inlineB } }).x;
      const c = StyleSheet.create({ x: { ...inlineC } }).x;
      const writingDirection = 'rtl';

      // inline styles
      const inlineStyle = [inlineA, inlineB, inlineC];
      expect(StyleSheet(inlineStyle)).toMatchInlineSnapshot(`
        [
          "",
          {
            "left": "12.34%",
            "marginRight": "10px",
            "textAlign": "left",
          },
        ]
      `);
      expect(StyleSheet(inlineStyle, { writingDirection }))
        .toMatchInlineSnapshot(`
        [
          "",
          {
            "marginLeft": "10px",
            "right": "12.34%",
            "textAlign": "right",
          },
        ]
      `);
      expect(
        StyleSheet(
          [
            inlineStyle,
            { marginLeft: 1, marginEnd: 0, marginStart: 0, marginRight: 11 }
          ],
          { writingDirection }
        )
      ).toMatchInlineSnapshot(`
        [
          "",
          {
            "marginLeft": "1px",
            "marginRight": "11px",
            "right": "12.34%",
            "textAlign": "right",
          },
        ]
      `);
      expect(
        StyleSheet([inlineStyle, { marginEnd: null, marginLeft: 11 }], {
          writingDirection
        })
      ).toMatchInlineSnapshot(`
        [
          "",
          {
            "marginLeft": "11px",
            "right": "12.34%",
            "textAlign": "right",
          },
        ]
      `);

      // static styles
      const staticStyle = [a, b, c];
      expect(StyleSheet(staticStyle)).toMatchInlineSnapshot(`
        [
          "r-insetInlineStart-1xn1m1p r-textAlign-fdjqy7 r-marginInlineEnd-1l8l4mf",
          null,
        ]
      `);
      expect(StyleSheet(staticStyle, { writingDirection }))
        .toMatchInlineSnapshot(`
        [
          "r-insetInlineStart-1y2vi53 r-textAlign-1ff274t r-marginInlineEnd-t1sew1",
          null,
        ]
      `);
      const z = StyleSheet.create({ x: { marginRight: 33 } }).x;
      expect(StyleSheet([staticStyle, z])).toMatchInlineSnapshot(`
        [
          "r-insetInlineStart-1xn1m1p r-textAlign-fdjqy7 r-marginInlineEnd-1l8l4mf r-marginRight-j4vy6k",
          null,
        ]
      `);
      expect(
        StyleSheet(
          [
            staticStyle,
            { marginLeft: 1, marginEnd: 0, marginStart: 0, marginRight: 11 }
          ],

          {
            writingDirection
          }
        )
      ).toMatchInlineSnapshot(`
        [
          "r-insetInlineStart-1y2vi53 r-textAlign-1ff274t",
          {
            "marginLeft": "1px",
            "marginRight": "11px",
          },
        ]
      `);
      // logical can be nulled
      expect(
        StyleSheet([staticStyle, { marginEnd: null }], {
          writingDirection
        })
      ).toMatchInlineSnapshot(`
        [
          "r-insetInlineStart-1y2vi53 r-textAlign-1ff274t",
          null,
        ]
      `);
    });
  });
});
