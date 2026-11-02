import React from 'react';
import { act, render } from '@testing-library/react';
import { createEventTarget } from 'dom-event-testing-library';
import TouchableWithoutFeedback from '../';
import View from '../../View';

describe('components/TouchableWithoutFeedback', () => {
  test('forwards ref', () => {
    const ref = jest.fn();
    render(
      <TouchableWithoutFeedback ref={ref}>
        <View />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });

  test('forwards ref of child', () => {
    const ref = jest.fn();
    render(
      <TouchableWithoutFeedback>
        <View ref={ref} />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });

  test('forwards title', () => {
    const { container } = render(
      <TouchableWithoutFeedback title="Hello">
        <View />
      </TouchableWithoutFeedback>
    );
    expect(container.firstChild.getAttribute('title')).toBe('Hello');
  });

  test('prop "disabled" disables press', () => {
    const onPress = jest.fn();
    const ref = React.createRef();
    let container;

    act(() => {
      ({ container } = render(
        <TouchableWithoutFeedback disabled={true} onPress={onPress}>
          <View ref={ref} />
        </TouchableWithoutFeedback>
      ));
    });

    const target = createEventTarget(ref.current);

    act(() => {
      target.pointerdown({ button: 0 });
      jest.runAllTimers();
    });
    act(() => {
      target.pointerup({ button: 0 });
      jest.runAllTimers();
    });

    expect(container.firstChild.getAttribute('aria-disabled')).toBe('true');
    expect(onPress).not.toHaveBeenCalled();
  });

  test('forwards ARIA props', () => {
    const { container } = render(
      <TouchableWithoutFeedback
        aria-label="Close"
        aria-live="polite"
        role="button"
      >
        <View />
      </TouchableWithoutFeedback>
    );

    expect(container.firstChild.getAttribute('aria-label')).toBe('Close');
    expect(container.firstChild.getAttribute('aria-live')).toBe('polite');
    expect(container.firstChild.getAttribute('role')).toBe('button');
  });

  test('prop "accessibilityState.disabled" takes precedence over child "aria-disabled"', () => {
    const { container } = render(
      <TouchableWithoutFeedback accessibilityState={{ disabled: true }}>
        <View aria-disabled={false} />
      </TouchableWithoutFeedback>
    );
    expect(container.firstChild.getAttribute('aria-disabled')).toBe('true');
  });

  test('keeps child prop "aria-disabled"', () => {
    const { container } = render(
      <TouchableWithoutFeedback>
        <View aria-disabled={true} />
      </TouchableWithoutFeedback>
    );
    expect(container.firstChild.getAttribute('aria-disabled')).toBe('true');
  });

  test('keeps child prop "accessibilityState.disabled"', () => {
    const { container } = render(
      <TouchableWithoutFeedback>
        <View accessibilityState={{ disabled: true }} />
      </TouchableWithoutFeedback>
    );
    expect(container.firstChild.getAttribute('aria-disabled')).toBe('true');
  });
});
