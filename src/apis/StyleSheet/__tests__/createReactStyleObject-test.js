/* eslint-env jasmine, jest */

import createReactStyleObject from '../createReactStyleObject';

describe('apis/StyleSheet/createReactStyleObject', () => {
  it('converts ReactNative style to ReactDOM style', () => {
    const reactNativeStyle = { display: 'flex', marginVertical: 0, opacity: 0 };
    const expectedStyle = { display: 'flex', marginTop: '0px', marginBottom: '0px', opacity: 0 };

    expect(createReactStyleObject(reactNativeStyle)).toEqual(expectedStyle);
  });
});
