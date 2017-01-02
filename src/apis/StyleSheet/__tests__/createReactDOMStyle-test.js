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
  test('converts ReactNative style to ReactDOM style', () => {
    expect(createReactDOMStyle(reactNativeStyle)).toMatchSnapshot();
  });

  test('noop on DOM styles', () => {
    const firstStyle = createReactDOMStyle(reactNativeStyle);
    const secondStyle = createReactDOMStyle(firstStyle);
    expect(firstStyle).toEqual(secondStyle);
  });
});
