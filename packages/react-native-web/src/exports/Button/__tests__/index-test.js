import Button from '..';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import renderRootView from '../../../exports/AppRegistry/renderRootView';

describe('components/Button', () => {
  test('prop "accessibilityLabel"', () => {
    const { container } = renderRootView(
      <Button accessibilityLabel="accessibility label" title="" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "color"', () => {
    const color = 'rgb(0, 0, 255)';
    const { container } = renderRootView(<Button color={color} title="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "disabled"', () => {
    const { container } = renderRootView(<Button disabled={true} title="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "onPress"', () => {
    const onPress = jest.fn();
    const ref = React.createRef();
    act(() => {
      renderRootView(<Button onPress={onPress} ref={ref} title="" />);
    });
    const target = createEventTarget(ref.current);
    act(() => {
      target.pointerdown({ button: 0 });
      target.pointerup({ button: 0 });
    });
    expect(onPress).toBeCalled();
  });

  test('prop "testID"', () => {
    const { container } = renderRootView(<Button testID="123" title="" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "title"', () => {
    const { container } = renderRootView(<Button title="Click me" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
