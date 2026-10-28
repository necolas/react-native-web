/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createReactDOMStyle from '../compiler/createReactDOMStyle';

const reactNativeStyle = {
  boxShadow: '1px 1px 1px 1px #000',
  borderWidthLeft: 2,
  borderWidth: 1,
  borderWidthRight: 3,
  display: 'flex',
  marginVertical: 0,
  opacity: 0,
  shadowColor: 'red',
  shadowOffset: { width: 1, height: 2 },
  resizeMode: 'contain'
};

describe('compiler/createReactDOMStyle', () => {
  test('noop on DOM styles', () => {
    const firstStyle = createReactDOMStyle(reactNativeStyle);
    const secondStyle = createReactDOMStyle(firstStyle);
    expect(firstStyle).toEqual(secondStyle);
  });

  test('shortform -> longform for inline styles', () => {
    const style = {
      borderStyle: 'solid',
      boxSizing: 'border-box',
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      borderWidth: 0,
      marginTop: 50,
      marginBlock: 25,
      margin: 10,
      overflow: 'hidden',
      overscrollBehavior: 'contain',
      paddingLeft: 50,
      paddingInline: 25,
      padding: 10
    };

    expect(createReactDOMStyle(style, true)).toMatchInlineSnapshot(`
     {
       "borderBottomColor": "rgba(255,255,255,1.00)",
       "borderBottomStyle": "solid",
       "borderBottomWidth": "1px",
       "borderLeftStyle": "solid",
       "borderLeftWidth": "0px",
       "borderRightStyle": "solid",
       "borderRightWidth": "0px",
       "borderTopStyle": "solid",
       "borderTopWidth": "0px",
       "boxSizing": "border-box",
       "marginBottom": "25px",
       "marginLeft": "10px",
       "marginRight": "10px",
       "marginTop": "50px",
       "overflowX": "hidden",
       "overflowY": "hidden",
       "overscrollBehaviorX": "contain",
       "overscrollBehaviorY": "contain",
       "paddingBottom": "10px",
       "paddingLeft": "50px",
       "paddingRight": "25px",
       "paddingTop": "10px",
     }
    `);
  });

  describe('colors', () => {
    test('rgb() with a slash alpha', () => {
      expect(
        createReactDOMStyle({ backgroundColor: 'rgb(10 20 30 / 0.4)' })
      ).toEqual({
        backgroundColor: 'rgba(10,20,30,0.40)'
      });
    });
  });

  describe('flexbox styles', () => {
    test('flex: -1', () => {
      expect(createReactDOMStyle({ flex: -1 })).toEqual({
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto'
      });
    });

    test('flex: 0', () => {
      expect(createReactDOMStyle({ flex: 0 })).toEqual({
        flex: 0
      });
    });

    test('flex: 1', () => {
      expect(createReactDOMStyle({ flex: 1 })).toEqual({
        flex: 1
      });
    });

    test('flex: 10', () => {
      expect(createReactDOMStyle({ flex: 10 })).toEqual({
        flex: 10
      });
    });

    test('flexBasis overrides', () => {
      // is flex-basis applied?
      expect(createReactDOMStyle({ flexBasis: '25%' })).toEqual({
        flexBasis: '25%'
      });

      // can flex-basis override the 'flex' expansion?
      expect(createReactDOMStyle({ flex: 1, flexBasis: '25%' })).toEqual({
        flex: 1,
        flexBasis: '25%'
      });
    });

    test('flexShrink overrides', () => {
      // is flex-shrink applied?
      expect(createReactDOMStyle({ flexShrink: 1 })).toEqual({
        flexShrink: 1
      });

      // can flex-shrink override the 'flex' expansion?
      expect(createReactDOMStyle({ flex: 1, flexShrink: 2 })).toEqual({
        flex: 1,
        flexShrink: 2
      });
    });
  });

  describe('fontFamily', () => {
    test('general case', () => {
      expect(createReactDOMStyle({ fontFamily: 'Georgia, Times, serif' }))
        .toMatchInlineSnapshot(`
       {
         "fontFamily": "Georgia, Times, serif",
       }
      `);
    });

    test('"monospace"', () => {
      expect(createReactDOMStyle({ fontFamily: 'monospace' }))
        .toMatchInlineSnapshot(`
       {
         "fontFamily": "monospace,monospace",
       }
      `);
    });

    test('"System"', () => {
      expect(createReactDOMStyle({ fontFamily: 'System' }))
        .toMatchInlineSnapshot(`
       {
         "fontFamily": "-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif",
       }
      `);
      expect(createReactDOMStyle({ font: '14px System' }))
        .toMatchInlineSnapshot(`
       {
         "font": "14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif",
       }
      `);
    });

    test('"Noto, System"', () => {
      expect(createReactDOMStyle({ fontFamily: 'Noto, System' }))
        .toMatchInlineSnapshot(`
       {
         "fontFamily": "Noto,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif",
       }
      `);
      expect(createReactDOMStyle({ font: '14px Noto, System' }))
        .toMatchInlineSnapshot(`
       {
         "font": "14px Noto, -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif",
       }
      `);
    });

    test('"Noto, BlinkMacSystemFont"', () => {
      expect(createReactDOMStyle({ fontFamily: 'Noto, BlinkMacSystemFont' }))
        .toMatchInlineSnapshot(`
       {
         "fontFamily": "Noto,BlinkMacSystemFont",
       }
      `);
    });
  });

  describe('prefixed values', () => {
    test('unitless number', () => {
      expect(createReactDOMStyle({ initialLetter: 2 })).toEqual({
        initialLetter: 2,
        WebkitInitialLetter: 2
      });
    });

    test('backgroundClip', () => {
      expect(createReactDOMStyle({ backgroundClip: 'padding-box' })).toEqual({
        backgroundClip: 'padding-box'
      });
      expect(createReactDOMStyle({ backgroundClip: 'text' })).toEqual({
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text'
      });
    });

    test('image-set', () => {
      const backgroundImage = 'image-set("a.png" 1x, "b.png" 2x)';
      expect(createReactDOMStyle({ backgroundImage })).toEqual({
        backgroundImage: [
          '-webkit-image-set("a.png" 1x, "b.png" 2x)',
          backgroundImage
        ]
      });
      expect(createReactDOMStyle({ backgroundImage }, true)).toEqual({
        backgroundImage
      });
      expect(
        createReactDOMStyle({
          backgroundImage: '-webkit-image-set("a.png" 1x)'
        })
      ).toEqual({ backgroundImage: '-webkit-image-set("a.png" 1x)' });
    });

    test('image-set and cross-fade', () => {
      const backgroundImage =
        'image-set("a.png" 1x), cross-fade(url(a.png), url(b.png), 50%)';
      expect(createReactDOMStyle({ backgroundImage })).toEqual({
        backgroundImage: [
          '-webkit-image-set("a.png" 1x), -webkit-cross-fade(url(a.png), url(b.png), 50%)',
          backgroundImage
        ]
      });
    });

    test('sizing', () => {
      expect(createReactDOMStyle({ width: 'fill-available' })).toEqual({
        width: ['-webkit-fill-available', 'fill-available']
      });
    });

    test('transition', () => {
      expect(
        createReactDOMStyle({
          transition: 'opacity 1s cubic-bezier(0, 0, 1, 1), backdrop-filter 2s'
        })
      ).toEqual({
        transition:
          'opacity 1s cubic-bezier(0, 0, 1, 1), -webkit-backdrop-filter 2s, backdrop-filter 2s'
      });
      expect(
        createReactDOMStyle({ transitionProperty: 'opacity,mask' })
      ).toEqual({
        transitionProperty: 'opacity,-webkit-mask,mask'
      });
      expect(
        createReactDOMStyle({ transitionProperty: 'opacity, transform' })
      ).toEqual({
        transitionProperty: 'opacity, transform'
      });
      expect(
        createReactDOMStyle({
          transitionProperty: 'mask-image, text-emphasis-color'
        })
      ).toEqual({
        transitionProperty:
          '-webkit-mask-image,mask-image, -webkit-text-emphasis-color, text-emphasis-color'
      });
      expect(
        createReactDOMStyle({
          transition: 'opacity 1s, -webkit-transform 1s, backdrop-filter 1s'
        })
      ).toEqual({
        transition: 'opacity 1s, -webkit-transform 1s, backdrop-filter 1s'
      });
    });
  });
});
