import React from 'react';
import { render } from '@testing-library/react';
import TouchableWithoutFeedback from '../';
import View from '../../View';

describe('components/TouchableWithoutFeedback', () => {
  test('forwards ref', () => {
    const ref = jest.fn();
    render(
      <TouchableWithoutFeedback ref={ref}>
        <View />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });

  test('forwards ref of child', () => {
    const ref = jest.fn();
    render(
      <TouchableWithoutFeedback>
        <View ref={ref} />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });
});
