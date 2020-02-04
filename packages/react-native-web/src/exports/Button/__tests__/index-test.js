/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import Button from '..';
import React from 'react';
import { render } from '@testing-library/react';

describe('components/Button', () => {
  test('prop "color"', () => {
    const onPress = () => {};
    const color = 'rgb(0, 0, 255)';
    const { container } = render(<Button color={color} onPress={onPress} title="" />);
    expect(container.firstChild.style.backgroundColor).toEqual(color);
  });

  test('prop "title"', () => {
    const onPress = () => {};
    const text = 'Click me';
    const { getByText } = render(<Button onPress={onPress} title={text} />);
    expect(getByText(text)).toBeDefined();
  });
});
