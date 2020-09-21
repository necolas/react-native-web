/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import { render } from '@testing-library/react';
import Text from '../';

describe('components/Text', () => {
  test('default', () => {
    const { container } = render(<Text />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('nested', () => {
    const { container } = render(<Text children={<Text testID="child" />} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('allows "dir" to be overridden', () => {
    const { container } = render(<Text dir="rtl" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "numberOfLines"', () => {});

  test('ref function is called when ref changes', () => {
    const refMock = jest.fn();
    const otherRefMock = jest.fn();

    const { rerender } = render(<Text ref={refMock} />);
    expect(refMock).toHaveBeenCalled();

    rerender(<Text ref={otherRefMock} />)
    expect(otherRefMock).toHaveBeenCalled();
  });

  test('ref function is not called every render', () => {
    const refMock = jest.fn();

    const { rerender } = render(<Text ref={refMock} />);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<Text ref={refMock} />);
    expect(refMock).toHaveBeenCalledTimes(1);
  });

  test('ref function is not called on prop changes', () => {
    const refMock = jest.fn();

    const { rerender } = render(<Text ref={refMock} testID={'foo'} />);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<Text ref={refMock} testID={'bar'} />);
    expect(refMock).toHaveBeenCalledTimes(1);
  });
});
