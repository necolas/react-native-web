import Button from '..';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import { render } from '@testing-library/react';

describe('components/Button', () => {
  test('prop "accessibilityLabel"', () => {
    const { container } = render(<Button accessibilityLabel="accessibility label" title="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "color"', () => {
    const color = 'rgb(0, 0, 255)';
    const { container } = render(<Button color={color} title="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "disabled"', () => {
    const { container } = render(<Button disabled={true} title="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "onPress"', () => {
    const onPress = jest.fn();
    const ref = React.createRef();
    act(() => {
      render(<Button onPress={onPress} ref={ref} title="" />);
    });
    const target = createEventTarget(ref.current);
    act(() => {
      target.pointerdown();
      target.pointerup();
    });
    expect(onPress).toBeCalled();
  });

  test('prop "testID"', () => {
    const { container } = render(<Button testID="123" title="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "title"', () => {
    const { container } = render(<Button title="Click me" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
