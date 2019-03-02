/* eslint-env jasmine, jest */

import createReactDOMStyle from '../createReactDOMStyle';

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

describe('StyleSheet/createReactDOMStyle', () => {
  test('noop on DOM styles', () => {
    const firstStyle = createReactDOMStyle(reactNativeStyle);
    const secondStyle = createReactDOMStyle(firstStyle);
    expect(firstStyle).toEqual(secondStyle);
  });

  test('shortform -> longform', () => {
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
      overscrollBehavior: 'contain'
    };

    expect(createReactDOMStyle(style)).toMatchSnapshot();
  });

  describe('borderWidth styles', () => {
    test('defaults to 0 when "null"', () => {
      expect(createReactDOMStyle({ borderWidth: null })).toEqual({
        borderTopWidth: '0px',
        borderRightWidth: '0px',
        borderBottomWidth: '0px',
        borderLeftWidth: '0px'
      });
      expect(createReactDOMStyle({ borderWidth: 2, borderRightWidth: null })).toEqual({
        borderTopWidth: '2px',
        borderRightWidth: '0px',
        borderBottomWidth: '2px',
        borderLeftWidth: '2px'
      });
    });
  });

  describe('flexbox styles', () => {
    test('flex defaults', () => {
      expect(createReactDOMStyle({ display: 'flex' })).toEqual({
        display: 'flex',
        flexShrink: 0,
        flexBasis: 'auto'
      });
    });

    test('flex: -1', () => {
      expect(createReactDOMStyle({ display: 'flex', flex: -1 })).toEqual({
        display: 'flex',
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto'
      });
    });

    test('flex: 0', () => {
      expect(createReactDOMStyle({ display: 'flex', flex: 0 })).toEqual({
        display: 'flex',
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto'
      });
    });

    test('flex: 1', () => {
      expect(createReactDOMStyle({ display: 'flex', flex: 1 })).toEqual({
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto'
      });
    });

    test('flex: 10', () => {
      expect(createReactDOMStyle({ display: 'flex', flex: 10 })).toEqual({
        display: 'flex',
        flexGrow: 10,
        flexShrink: 1,
        flexBasis: 'auto'
      });
    });

    test('flexBasis overrides', () => {
      // is flex-basis applied?
      expect(createReactDOMStyle({ display: 'flex', flexBasis: '25%' })).toEqual({
        display: 'flex',
        flexShrink: 0,
        flexBasis: '25%'
      });

      // can flex-basis override the 'flex' expansion?
      expect(createReactDOMStyle({ display: 'flex', flex: 1, flexBasis: '25%' })).toEqual({
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '25%'
      });
    });

    test('flexShrink overrides', () => {
      // is flex-shrink applied?
      expect(createReactDOMStyle({ display: 'flex', flexShrink: 1 })).toEqual({
        display: 'flex',
        flexShrink: 1,
        flexBasis: 'auto'
      });

      // can flex-shrink override the 'flex' expansion?
      expect(createReactDOMStyle({ display: 'flex', flex: 1, flexShrink: 2 })).toEqual({
        display: 'flex',
        flexGrow: 1,
        flexShrink: 2,
        flexBasis: 'auto'
      });
    });
  });

  describe('fontFamily', () => {
    test('general case', () => {
      expect(createReactDOMStyle({ fontFamily: 'Georgia, Times, serif' })).toMatchSnapshot();
    });

    test('"monospace"', () => {
      expect(createReactDOMStyle({ fontFamily: 'monospace' })).toMatchSnapshot();
    });

    test('"System"', () => {
      expect(createReactDOMStyle({ fontFamily: 'System' })).toMatchSnapshot();
    });

    test('"Noto, System"', () => {
      expect(createReactDOMStyle({ fontFamily: 'Noto, System' })).toMatchSnapshot();
    });
  });

  test('fontVariant', () => {
    expect(createReactDOMStyle({ fontVariant: ['common-ligatures', 'small-caps'] })).toEqual({
      fontVariant: 'common-ligatures small-caps'
    });
  });

  describe('shadow styles', () => {
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

  test('textAlignVertical', () => {
    expect(
      createReactDOMStyle({
        textAlignVertical: 'center'
      })
    ).toEqual({
      verticalAlign: 'middle'
    });
  });

  describe('textDecoration styles', () => {
    test('textDecorationColor only', () => {
      expect(
        createReactDOMStyle({
          textDecorationColor: 'red'
        })
      ).toEqual({});
    });

    test('textDecorationLine only', () => {
      expect(
        createReactDOMStyle({
          textDecorationLine: 'underline'
        })
      ).toEqual({
        textDecoration: 'underline'
      });
    });

    test('textDecorationStyle only', () => {
      expect(
        createReactDOMStyle({
          textDecorationStyle: 'dashed'
        })
      ).toEqual({});
    });

    test('textDecorationColor, textDecorationLine, textDecorationStyle', () => {
      expect(
        createReactDOMStyle({
          textDecorationColor: 'red',
          textDecorationLine: 'underline',
          textDecorationStyle: 'dashed'
        })
      ).toEqual({
        textDecoration: 'underline',
        textDecorationColor: 'rgba(255,0,0,1.00)',
        textDecorationStyle: 'dashed'
      });
    });
  });

  describe('textShadow styles', () => {
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
        createReactDOMStyle({ textShadowColor: 'red', textShadowOffset: { width: 0, height: 0 } })
      ).toEqual({});
      expect(
        createReactDOMStyle({ textShadowColor: 'red', textShadowOffset: { width: -1, height: 0 } })
      ).toEqual({
        textShadow: '-1px 0px 0px rgba(255,0,0,1.00)'
      });
      expect(
        createReactDOMStyle({ textShadowColor: 'red', textShadowOffset: { width: 1, height: 2 } })
      ).toEqual({
        textShadow: '1px 2px 0px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor and textShadowRadius only', () => {
      expect(createReactDOMStyle({ textShadowColor: 'red', textShadowRadius: 5 })).toEqual({});
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
        transform: [{ perspective: 50 }, { scaleX: 20 }, { translateX: 20 }, { rotate: '20deg' }]
      };
      const resolved = createReactDOMStyle(style);

      expect(resolved).toEqual({
        transform: 'perspective(50px) scaleX(20) translateX(20px) rotate(20deg)'
      });
    });

    test('transformMatrix', () => {
      const style = { transformMatrix: [1, 2, 3, 4, 5, 6] };
      const resolved = createReactDOMStyle(style);

      expect(resolved).toEqual({
        transform: 'matrix3d(1,2,3,4,5,6)'
      });
    });
  });
});
