/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import { render } from '@testing-library/react';
import TouchableWithoutFeedback from '../';
import View from '../../View';

describe('components/TouchableWithoutFeedback', () => {
  test('ref function is called when ref changes', () => {
    const refMock = jest.fn();
    const otherRefMock = jest.fn();

    const { rerender } = render(<TouchableWithoutFeedback ref={refMock}><View /></TouchableWithoutFeedback>);
    expect(refMock).toHaveBeenCalled();

    rerender(<TouchableWithoutFeedback ref={otherRefMock}><View /></TouchableWithoutFeedback>)
    expect(otherRefMock).toHaveBeenCalled();
  });

  test('ref function is not called every render', () => {
    const refMock = jest.fn();

    const { rerender } = render(<TouchableWithoutFeedback ref={refMock}><View /></TouchableWithoutFeedback>);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<TouchableWithoutFeedback ref={refMock}><View /></TouchableWithoutFeedback>);
    expect(refMock).toHaveBeenCalledTimes(1);
  });

  test('ref function is not called on prop changes', () => {
    const refMock = jest.fn();

    const { rerender } = render(<TouchableWithoutFeedback ref={refMock} testID={'foo'}><View /></TouchableWithoutFeedback>);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<TouchableWithoutFeedback ref={refMock} testID={'bar'}><View /></TouchableWithoutFeedback>);
    expect(refMock).toHaveBeenCalledTimes(1);
  });
});
