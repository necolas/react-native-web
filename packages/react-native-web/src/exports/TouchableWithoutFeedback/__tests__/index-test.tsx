import { act, render } from '@testing-library/react';
import { createEventTarget } from 'dom-event-testing-library';
import { createRef } from 'react';

import TouchableWithoutFeedback from '../';
import type { HostNode } from '../../../types';
import Text from '../../Text';
import View from '../../View';

describe('components/TouchableWithoutFeedback', () => {
  test('forwards ref', () => {
    const ref = vi.fn();
    render(
      <TouchableWithoutFeedback ref={ref}>
        <View />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });

  test('forwards ref of child', () => {
    const ref = vi.fn();
    render(
      <TouchableWithoutFeedback>
        <View ref={ref} />
      </TouchableWithoutFeedback>
    );
    expect(ref).toHaveBeenCalled();
  });

  test('forwards type', () => {
    const { container } = render(
      <TouchableWithoutFeedback type="submit">
        <View />
      </TouchableWithoutFeedback>
    );
    const element = container.firstChild as HTMLElement;
    expect(element.getAttribute('type')).toBe('submit');
  });

  test('forwards type to a host child', () => {
    // React DOM warns about the responder props cloned onto <button>
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <TouchableWithoutFeedback type="submit">
        <button />
      </TouchableWithoutFeedback>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.getAttribute('type')).toBe('submit');
    expect(element.hasAttribute('unstable_type')).toBe(false);
  });

  test('forwards title', () => {
    const { container } = render(
      <TouchableWithoutFeedback title="Hello">
        <View />
      </TouchableWithoutFeedback>
    );
    expect((container.firstChild as HTMLElement).getAttribute('title')).toBe(
      'Hello'
    );
  });

  test('prop "disabled" disables press', () => {
    const onPress = vi.fn();
    const ref = createRef<HostNode>();
    let container!: HTMLElement;

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
      vi.runAllTimers();
    });
    act(() => {
      target.pointerup({ button: 0 });
      vi.runAllTimers();
    });

    expect(
      (container.firstChild as HTMLElement).getAttribute('aria-disabled')
    ).toBe('true');
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

    expect(
      (container.firstChild as HTMLElement).getAttribute('aria-label')
    ).toBe('Close');
    expect(
      (container.firstChild as HTMLElement).getAttribute('aria-live')
    ).toBe('polite');
    expect((container.firstChild as HTMLElement).getAttribute('role')).toBe(
      'button'
    );
  });

  test('prop "accessibilityState.disabled" takes precedence over child "aria-disabled"', () => {
    const { container } = render(
      <TouchableWithoutFeedback accessibilityState={{ disabled: true }}>
        <View aria-disabled={false} />
      </TouchableWithoutFeedback>
    );
    expect(
      (container.firstChild as HTMLElement).getAttribute('aria-disabled')
    ).toBe('true');
  });

  test('keeps child prop "aria-disabled"', () => {
    const { container } = render(
      <TouchableWithoutFeedback>
        <View aria-disabled={true} />
      </TouchableWithoutFeedback>
    );
    expect(
      (container.firstChild as HTMLElement).getAttribute('aria-disabled')
    ).toBe('true');
  });

  test('keeps child prop "accessibilityState.disabled"', () => {
    const { container } = render(
      <TouchableWithoutFeedback>
        <View accessibilityState={{ disabled: true }} />
      </TouchableWithoutFeedback>
    );
    expect(
      (container.firstChild as HTMLElement).getAttribute('aria-disabled')
    ).toBe('true');
  });

  test('prop "disabled" disables a native button child', () => {
    const { container } = render(
      <TouchableWithoutFeedback disabled={true}>
        <Text accessibilityRole="button">Save</Text>
      </TouchableWithoutFeedback>
    );
    expect((container.firstChild as HTMLButtonElement).disabled).toBe(true);
  });
});
