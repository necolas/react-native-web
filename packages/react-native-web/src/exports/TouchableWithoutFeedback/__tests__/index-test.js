import React from 'react';
import renderRootView from '../../../exports/AppRegistry/renderRootView';
import TouchableWithoutFeedback from '../';
import View from '../../View';

describe('components/TouchableWithoutFeedback', () => {
  test('forwards ref', () => {
    const ref = jest.fn();
    renderRootView(
      <TouchableWithoutFeedback ref={ref}>
        <View />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });

  test('forwards ref of child', () => {
    const ref = jest.fn();
    renderRootView(
      <TouchableWithoutFeedback>
        <View ref={ref} />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });
});
