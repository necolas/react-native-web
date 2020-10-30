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
      expect(createReactDOMStyle({ fontFamily: 'Georgia, Times, serif' })).toMatchSnapshot();
    });

    test('"monospace"', () => {
      expect(createReactDOMStyle({ fontFamily: 'monospace' })).toMatchSnapshot();
    });

    test('"System"', () => {
      expect(createReactDOMStyle({ fontFamily: 'System' })).toMatchSnapshot();
      expect(createReactDOMStyle({ font: '14px System' })).toMatchSnapshot();
    });

    test('"Noto, System"', () => {
      expect(createReactDOMStyle({ fontFamily: 'Noto, System' })).toMatchSnapshot();
      expect(createReactDOMStyle({ font: '14px Noto, System' })).toMatchSnapshot();
    });

    test('"Noto, BlinkMacSystemFont"', () => {
      expect(createReactDOMStyle({ fontFamily: 'Noto, BlinkMacSystemFont' })).toMatchSnapshot();
    });
  });

  test('fontVariant', () => {
    expect(createReactDOMStyle({ fontVariant: ['common-ligatures', 'small-caps'] })).toEqual({
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
