/* eslint-env jasmine, jest */

import React from 'react';
import View from '../';
import { render } from '@testing-library/react';

describe('components/View', () => {
  test('default', () => {
    const { container } = render(<View />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('non-text is rendered', () => {
    const children = <View testID="1" />;
    const { container } = render(<View>{children}</View>);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('raw text nodes as children', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error');
      console.error.mockImplementation(() => {});
    });

    afterEach(() => {
      console.error.mockRestore();
    });

    test('error logged (single)', () => {
      render(<View>hello</View>);
      expect(console.error).toBeCalled();
    });

    test('error logged (array)', () => {
      render(
        <View>
          <View />
          hello
          <View />
        </View>
      );
      expect(console.error).toBeCalled();
    });

    test('ref function is called when ref changes', () => {
      const refMock = jest.fn();
      const otherRefMock = jest.fn();

      const { rerender } = render(<View ref={refMock} />);
      expect(refMock).toHaveBeenCalled();

      rerender(<View ref={otherRefMock} />)
      expect(otherRefMock).toHaveBeenCalled();
    });

    test('ref function is not called every render', () => {
      const refMock = jest.fn();

      const { rerender } = render(<View ref={refMock} />);
      expect(refMock).toHaveBeenCalledTimes(1);

      rerender(<View ref={refMock} />);
      expect(refMock).toHaveBeenCalledTimes(1);
    });

    test('ref function is not called on prop changes', () => {
      const refMock = jest.fn();

      const { rerender } = render(<View ref={refMock} testID={'foo'} />);
      expect(refMock).toHaveBeenCalledTimes(1);

      rerender(<View ref={refMock} testID={'bar'} />);
      expect(refMock).toHaveBeenCalledTimes(1);
    });
  });

  test('prop "pointerEvents"', () => {
    const { container } = render(<View pointerEvents="box-only" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
