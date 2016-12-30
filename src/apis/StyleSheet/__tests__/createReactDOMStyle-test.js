/* eslint-env jasmine, jest */

import createReactDOMStyle from '../createReactDOMStyle';

describe('apis/StyleSheet/createReactDOMStyle', () => {
  test('converts ReactNative style to ReactDOM style', () => {
    const reactNativeStyle = { display: 'flex', marginVertical: 0, opacity: 0 };
    const expectedStyle = { display: 'flex', marginTop: '0px', marginBottom: '0px', opacity: 0 };

    expect(createReactDOMStyle(reactNativeStyle)).toEqual(expectedStyle);
  });
});
