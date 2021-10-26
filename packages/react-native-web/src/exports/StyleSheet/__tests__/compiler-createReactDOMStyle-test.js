/* eslint-env jasmine, jest */

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
      expect(createReactDOMStyle({ fontFamily: 'Georgia, Times, serif' })).toMatchInlineSnapshot(`
        {
          "fontFamily": "Georgia, Times, serif",
        }
      `);
    });

    test('"monospace"', () => {
      expect(createReactDOMStyle({ fontFamily: 'monospace' })).toMatchInlineSnapshot(`
        {
          "fontFamily": "monospace,monospace",
        }
      `);
    });

    test('"System"', () => {
      expect(createReactDOMStyle({ fontFamily: 'System' })).toMatchInlineSnapshot(`
        {
          "fontFamily": "-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Helvetica,Arial,sans-serif",
        }
      `);
      expect(createReactDOMStyle({ font: '14px System' })).toMatchInlineSnapshot(`
        {
          "font": "14px -apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Helvetica,Arial,sans-serif",
        }
      `);
    });

    test('"Noto, System"', () => {
      expect(createReactDOMStyle({ fontFamily: 'Noto, System' })).toMatchInlineSnapshot(`
        {
          "fontFamily": "Noto,-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Helvetica,Arial,sans-serif",
        }
      `);
      expect(createReactDOMStyle({ font: '14px Noto, System' })).toMatchInlineSnapshot(`
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
    expect(createReactDOMStyle({ fontVariant: ['common-ligatures', 'small-caps'] })).toEqual({
      fontVariant: 'common-ligatures small-caps'
    });
  });

  describe('preprocesses multiple shadow styles into a single declaration', () => {
    test('shadowColor only', () => {
      const style = { shadowColor: 'red' };
      const resolved = createReactDOMStyle(style);

      expect(resolved).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,1.00)'
      });
    });

    test('shadowColor and shadowOpacity only', () => {
      expect(createReactDOMStyle({ shadowColor: 'red', shadowOpacity: 0.5 })).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,0.50)'
      });
    });

    test('shadowOffset only', () => {
      expect(createReactDOMStyle({ shadowOffset: { width: 1, height: 2 } })).toEqual({
        boxShadow: '1px 2px 0px rgba(0,0,0,1.00)'
      });
    });

    test('shadowRadius only', () => {
      expect(createReactDOMStyle({ shadowRadius: 5 })).toEqual({
        boxShadow: '0px 0px 5px rgba(0,0,0,1.00)'
      });
    });

    test('shadowOffset, shadowRadius, shadowColor', () => {
      expect(
        createReactDOMStyle({
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
      expect(createReactDOMStyle({ textShadowColor: 'red' })).toEqual({});
    });

    test('textShadowOffset only', () => {
      expect(createReactDOMStyle({ textShadowOffset: { width: 1, height: 2 } })).toEqual({});
    });

    test('textShadowRadius only', () => {
      expect(createReactDOMStyle({ textShadowRadius: 5 })).toEqual({});
    });

    test('textShadowColor and textShadowOffset only', () => {
      expect(
        createReactDOMStyle({
          textShadowColor: 'red',
          textShadowOffset: { width: 0, height: 0 }
        })
      ).toEqual({});
      expect(
        createReactDOMStyle({
          textShadowColor: 'red',
          textShadowOffset: { width: -1, height: 0 }
        })
      ).toEqual({
        textShadow: '-1px 0px 0px rgba(255,0,0,1.00)'
      });
      expect(
        createReactDOMStyle({
          textShadowColor: 'red',
          textShadowOffset: { width: 1, height: 2 }
        })
      ).toEqual({
        textShadow: '1px 2px 0px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor and textShadowRadius only', () => {
      expect(createReactDOMStyle({ textShadowColor: 'red', textShadowRadius: 0 })).toEqual({});
      expect(createReactDOMStyle({ textShadowColor: 'red', textShadowRadius: 5 })).toEqual({
        textShadow: '0px 0px 5px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor, textShadowOffset, textShadowRadius', () => {
      expect(
        createReactDOMStyle({
          textShadowColor: 'rgba(50,60,70,0.50)',
          textShadowOffset: { width: 5, height: 10 },
          textShadowRadius: 15
        })
      ).toEqual({
        textShadow: '5px 10px 15px rgba(50,60,70,0.50)'
      });
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
      const transform = 'perspective(50px) scaleX(20) translateX(20px) rotate(20deg)';
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
