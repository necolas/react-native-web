/* eslint-env jasmine, jest */

import StyleSheet from '../index';

describe('StyleSheet', () => {
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

  test('compose', () => {
    expect(StyleSheet.compose(1, 2)).toEqual([1, 2]);
    expect(StyleSheet.compose(1, null)).toBe(1);
    expect(StyleSheet.compose(null, 2)).toBe(2);
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

    test('should recursively flatten arrays', () => {
      const style = StyleSheet.flatten([null, [], [{ order: 2 }, { opacity: 1 }], { order: 3 }]);
      expect(style).toMatchInlineSnapshot(`
        {
          "opacity": 1,
          "order": 3,
        }
      `);
    });
  });

  test('getSheet', () => {
    expect(StyleSheet.getSheet()).toMatchSnapshot();
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

      const [className1, inlineStyle1] = StyleSheet([styleACompiled, styleBCompiled, styleBInline]);
      expect(className1).toBe('display-block');
      expect(inlineStyle1).toEqual({ backgroundColor: 'rgba(0,0,255,1.00)' });

      const [className2, inlineStyle2] = StyleSheet([styleACompiled, styleBInline, styleBCompiled]);
      expect(className2).toBe('display-block backgroundColor-green color-green');
      expect(inlineStyle2).toEqual(null);
    });

    test('long form inline style properties take precedence over static shorthand properties', () => {
      const styles1 = StyleSheet.create({ test: { paddingHorizontal: '40px' } });
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
      const a = StyleSheet.create({ x: { start: '12.34%' } }).x;
      const b = StyleSheet.create({ x: { textAlign: 'start' } }).x;
      const c = StyleSheet.create({ x: { marginEnd: 10 } }).x;
      const isRTL = true;

      expect(StyleSheet([a, b, c])).toMatchInlineSnapshot(`
        [
          "r-left-2s0hu9 r-textAlign-fdjqy7 r-marginRight-zso239",
          null,
        ]
      `);
      expect(StyleSheet([a, b, c], isRTL)).toMatchInlineSnapshot(`
        [
          "r-right-1bnbe1j r-textAlign-1ff274t r-marginLeft-1n0xq6e",
          null,
        ]
      `);
      // logical wins
      expect(
        StyleSheet(
          [a, b, c, { marginLeft: 1, marginEnd: 0, marginStart: 0, marginRight: 11 }],
          isRTL
        )
      ).toMatchInlineSnapshot(`
        [
          "r-right-1bnbe1j r-textAlign-1ff274t",
          {
            "marginLeft": "0px",
            "marginRight": "0px",
          },
        ]
      `);
      // logical can be nulled
      expect(StyleSheet([a, b, c, { marginEnd: null, marginLeft: 11 }], isRTL))
        .toMatchInlineSnapshot(`
        [
          "r-right-1bnbe1j r-textAlign-1ff274t",
          {
            "marginLeft": "11px",
          },
        ]
      `);
    });
  });
});
