/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import { render } from '@testing-library/react';
import TouchableOpacity from '../';

describe('components/Pressable', () => {
  test('ref function is called when ref changes', () => {
    const refMock = jest.fn();
    const otherRefMock = jest.fn();

    const { rerender } = render(<TouchableOpacity ref={refMock} />);
    expect(refMock).toHaveBeenCalled();

    rerender(<TouchableOpacity ref={otherRefMock} />)
    expect(otherRefMock).toHaveBeenCalled();
  });

  test('ref function is not called every render', () => {
    const refMock = jest.fn();

    const { rerender } = render(<TouchableOpacity ref={refMock} />);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<TouchableOpacity ref={refMock} />);
    expect(refMock).toHaveBeenCalledTimes(1);
  });

  test('ref function is not called on prop changes', () => {
    const refMock = jest.fn();

    const { rerender } = render(<TouchableOpacity ref={refMock} testID={'foo'} />);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<TouchableOpacity ref={refMock} testID={'bar'} />);
    expect(refMock).toHaveBeenCalledTimes(1);
  });
});
