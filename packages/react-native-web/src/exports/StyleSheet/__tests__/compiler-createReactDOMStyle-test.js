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
      marginVertical: 25,
      margin: 10,
      overflow: 'hidden',
      overscrollBehavior: 'contain',
      paddingLeft: 50,
      paddingHorizontal: 25,
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

  test('aspectRatio', () => {
    expect(createReactDOMStyle({ aspectRatio: 9 / 16 })).toEqual({
      aspectRatio: '0.5625'
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
          "fontFamily": "-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Helvetica,Arial,sans-serif",
        }
      `);
      expect(createReactDOMStyle({ font: '14px System' }))
        .toMatchInlineSnapshot(`
        {
          "font": "14px -apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Helvetica,Arial,sans-serif",
        }
      `);
    });

    test('"Noto, System"', () => {
      expect(createReactDOMStyle({ fontFamily: 'Noto, System' }))
        .toMatchInlineSnapshot(`
        {
          "fontFamily": "Noto,-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Helvetica,Arial,sans-serif",
        }
      `);
      expect(createReactDOMStyle({ font: '14px Noto, System' }))
        .toMatchInlineSnapshot(`
        {
          "font": "14px Noto, -apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Helvetica,Arial,sans-serif",
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

  test('fontVariant', () => {
    expect(
      createReactDOMStyle({ fontVariant: 'common-ligatures small-caps' })
    ).toEqual({
      fontVariant: 'common-ligatures small-caps'
    });

    expect(
      createReactDOMStyle({ fontVariant: ['common-ligatures', 'small-caps'] })
    ).toEqual({
      fontVariant: 'common-ligatures small-caps'
    });
  });

  test('textAlignVertical', () => {
    expect(
      createReactDOMStyle({
        textAlignVertical: 'center'
      })
    ).toEqual({
      verticalAlign: 'middle'
    });
  });

  describe('transform', () => {
    // passthrough if transform value is ever a string
    test('string', () => {
      const transform =
        'perspective(50px) scaleX(20) translateX(20px) rotate(20deg)';
      const style = { transform };
      const resolved = createReactDOMStyle(style);

      expect(resolved).toEqual({ transform });
    });

    test('array', () => {
      const style = {
        transform: [
          { perspective: 50 },
          { scaleX: 20 },
          { translateX: 20 },
          { rotate: '20deg' },
          { matrix: [1, 2, 3, 4, 5, 6] },
          { matrix3d: [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4] }
        ]
      };
      const resolved = createReactDOMStyle(style);

      expect(resolved).toEqual({
        transform:
          'perspective(50px) scaleX(20) translateX(20px) rotate(20deg) matrix(1,2,3,4,5,6) matrix3d(1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4)'
      });
    });
  });
});
