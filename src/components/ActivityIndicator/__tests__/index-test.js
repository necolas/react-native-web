/* eslint-env jasmine, jest */

import ActivityIndicator from '..';
import React from 'react';
import { render } from 'enzyme';

describe('components/ActivityIndicator', () => {
  describe('prop "animating"', () => {
    test('is "true"', () => {
      const component = render(<ActivityIndicator animating={true} />);
      expect(component).toMatchSnapshot();
    });

    test('is "false"', () => {
      const component = render(<ActivityIndicator animating={false} />);
      expect(component).toMatchSnapshot();
    });
  });

  test('prop "color"', () => {
    const component = render(<ActivityIndicator color="red" />);
    expect(component).toMatchSnapshot();
  });

  describe('prop "hidesWhenStopped"', () => {
    test('is "true"', () => {
      const component = render(<ActivityIndicator animating={false} hidesWhenStopped={true} />);
      expect(component).toMatchSnapshot();
    });

    test('is "false"', () => {
      const component = render(<ActivityIndicator animating={false} hidesWhenStopped={false} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('prop "size"', () => {
    test('is "large"', () => {
      const component = render(<ActivityIndicator size="large" />);
      expect(component).toMatchSnapshot();
    });

    test('is a number', () => {
      const component = render(<ActivityIndicator size={30} />);
      expect(component).toMatchSnapshot();
    });
  });
});
