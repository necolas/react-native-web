import React from 'react';
import renderRootContext from '../../../vendor/renderRootContext';
import TouchableWithoutFeedback from '../';
import View from '../../View';

describe('components/TouchableWithoutFeedback', () => {
  test('forwards ref', () => {
    const ref = jest.fn();
    renderRootContext(
      <TouchableWithoutFeedback ref={ref}>
        <View />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });

  test('forwards ref of child', () => {
    const ref = jest.fn();
    renderRootContext(
      <TouchableWithoutFeedback>
        <View ref={ref} />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });
});
