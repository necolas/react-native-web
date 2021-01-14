/* eslint-env jasmine, jest */

import createElement from '..';
import React from 'react';
import { render } from '@testing-library/react';

describe('exports/createElement', () => {
  test('renders different DOM elements', () => {
    let { container } = render(createElement('span'));
    expect(container.firstChild).toMatchSnapshot();
    ({ container } = render(createElement('main')));
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "accessibilityRole"', () => {
    test('string component type', () => {
      const { container } = render(createElement('span', { accessibilityRole: 'link' }));
      expect(container.firstChild.nodeName).toBe('A');
    });

    test('function component type', () => {
      const Custom = () => <div />;
      const { container } = render(createElement(Custom, { accessibilityRole: 'link' }));
      expect(container.firstChild.nodeName).toBe('DIV');
    });
  });
});
