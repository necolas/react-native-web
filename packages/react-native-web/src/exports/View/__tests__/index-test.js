/* eslint-env jasmine, jest */

import React from 'react';
import { render } from '@testing-library/react';
import View from '../';

describe('components/View', () => {
  test('default', () => {
    const { container } = render(<View />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('text node throws error (single)', () => {
    const subject = () => render(<View>hello</View>);
    expect(subject).toThrow();
  });

  test('text node throws error (array)', () => {
    const subject = () =>
      render(
        <View>
          <View />
          hello
          <View />
        </View>
      );
    expect(subject).toThrow();
  });

  test('non-text is rendered', () => {
    const children = <View testID="1" />;
    const { container } = render(<View>{children}</View>);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "hitSlop"', () => {
    it('renders a span with negative position offsets', () => {
      const { container } = render(<View hitSlop={{ top: 10, bottom: 10, right: 5, left: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('handles partial offsets', () => {
      const { container } = render(<View hitSlop={{ top: 10 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "pointerEvents"', () => {
    const { container } = render(<View pointerEvents="box-only" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
