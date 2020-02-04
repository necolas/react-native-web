/* eslint-env jasmine, jest */

import ActivityIndicator from '..';
import React from 'react';
import { render } from '@testing-library/react';

describe('components/ActivityIndicator', () => {
  describe('prop "animating"', () => {
    test('is "true"', () => {
      const { container } = render(<ActivityIndicator animating={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is "false"', () => {
      const { container } = render(<ActivityIndicator animating={false} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "color"', () => {
    const { container } = render(<ActivityIndicator color="red" />);
    const svg = container.firstChild.querySelector('svg');
    expect(svg).toMatchSnapshot();
  });

  describe('prop "hidesWhenStopped"', () => {
    test('is "true"', () => {
      const { container } = render(<ActivityIndicator animating={false} hidesWhenStopped={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is "false"', () => {
      const { container } = render(
        <ActivityIndicator animating={false} hidesWhenStopped={false} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "size"', () => {
    test('is "large"', () => {
      const { container } = render(<ActivityIndicator size="large" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is a number', () => {
      const { container } = render(<ActivityIndicator size={30} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
