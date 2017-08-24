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

describe('apis/StyleSheet/createReactDOMStyle', () => {
  test('noop on DOM styles', () => {
    const firstStyle = createReactDOMStyle(reactNativeStyle);
    const secondStyle = createReactDOMStyle(firstStyle);
    expect(firstStyle).toEqual(secondStyle);
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
        flexBasis: '0px'
      });
    });

    test('flex: 10', () => {
      expect(createReactDOMStyle({ display: 'flex', flex: 10 })).toEqual({
        display: 'flex',
        flexGrow: 10,
        flexShrink: 1,
        flexBasis: '0px'
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
        flexBasis: '0px'
      });
    });
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
      margin: 10
    };

    expect(createReactDOMStyle(style)).toMatchSnapshot();
  });

  describe('shadow styles', () => {
    test('shadowColor only', () => {
      const style = { shadowColor: 'red' };
      const resolved = createReactDOMStyle(style);

      expect(resolved).toEqual({
        boxShadow: '0px 0px 0px red'
      });
    });

    test('shadowColor and shadowOpacity only', () => {
      expect(createReactDOMStyle({ shadowColor: 'red', shadowOpacity: 0.5 })).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,0.5)'
      });
    });

    test('shadowOffset only', () => {
      expect(createReactDOMStyle({ shadowOffset: { width: 1, height: 2 } })).toEqual({});
    });

    test('shadowRadius only', () => {
      expect(createReactDOMStyle({ shadowRadius: 5 })).toEqual({});
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

  test('textShadowOffset', () => {
    expect(
      createReactDOMStyle({
        textShadowColor: 'red',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 5
      })
    ).toEqual({
      textShadow: '1px 2px 5px red'
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
