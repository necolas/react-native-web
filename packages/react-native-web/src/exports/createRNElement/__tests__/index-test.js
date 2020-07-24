/* eslint-env jasmine, jest */

import createRNElement from '../index';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('exports/createRNElement', () => {
  test('renders different DOM elements', () => {
    const Text = createRNElement('h3', { ref: true });
    const { container: h3Container } = render(<Text>test</Text>);
    expect(h3Container.firstChild).toMatchSnapshot();
    const Button = createRNElement('button', { ref: true });
    const { container: btnContainer } = render(<Button />);
    expect(btnContainer.firstChild).toMatchSnapshot();
  });

  test('renders default style', () => {
    const View = createRNElement('div', {}, { backgoundColor: 'red' });
    const { container } = render(<View style={{ height: 10, width: 10 }} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "href"', () => {
    const propList = {
      ref: true,
      href: true
    };
    const Text = createRNElement('a', propList);
    const { container } = render(<Text href={'http://mylink.com'}>test</Text>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('onPress callback', () => {
    const Button = ({ onPress }) => {
      const Custom = createRNElement('button', { onClick: true });
      return <Custom onClick={onPress} />;
    };
    const myFn = jest.fn();
    const { container } = render(<Button onPress={myFn} />);
    fireEvent.click(container.firstChild);
    expect(myFn).toHaveBeenCalledTimes(1);
  });

  test('onLayout callback', () => {
    const myFn = jest.fn();
    const View = createRNElement('div');
    const { rerender } = render(<View onLayout={myFn} style={{ height: 10, width: 10 }} />);
    rerender(<View onLayout={myFn} style={{ height: 15, width: 15 }} />);
    expect(myFn).toHaveBeenCalledTimes(2);
  });
});
