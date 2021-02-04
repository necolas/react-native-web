/* eslint-env jasmine, jest */

import React from 'react';
import Pressable from '../';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import { render } from '@testing-library/react';

describe('components/Pressable', () => {
  test('default', () => {
    const { container } = render(<Pressable />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "accessibilityLabel"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable accessibilityLabel="label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityLiveRegion"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable accessibilityLiveRegion="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityRole"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable accessibilityRole="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = render(<Pressable accessibilityRole="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = render(<Pressable accessibilityRole="link" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "disabled"', () => {
    const { container } = render(<Pressable disabled={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable nativeID="nativeID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('focus interaction', () => {
    let container;
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const ref = React.createRef();
    act(() => {
      ({ container } = render(
        <Pressable
          children={({ focused }) => (focused ? <div data-testid="focus-content" /> : null)}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={ref}
          style={({ focused }) => [focused && { outline: 'focus-ring' }]}
        />
      ));
    });
    const target = createEventTarget(ref.current);
    const body = createEventTarget(document.body);
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.focus();
    });
    expect(onFocus).toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      body.focus({ relatedTarget: target.node });
    });
    expect(onBlur).toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('hover interaction', () => {
    let container;
    const ref = React.createRef();
    act(() => {
      ({ container } = render(
        <Pressable
          children={({ hovered }) => (hovered ? <div data-testid="hover-content" /> : null)}
          ref={ref}
          style={({ hovered }) => [hovered && { outline: 'hover-ring' }]}
        />
      ));
    });
    const target = createEventTarget(ref.current);
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerover();
    });
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerout();
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('press interaction', () => {
    let container;
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const ref = React.createRef();
    act(() => {
      ({ container } = render(
        <Pressable
          children={({ pressed }) => (pressed ? <div data-testid="press-content" /> : null)}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          ref={ref}
          style={({ pressed }) => [pressed && { outline: 'press-ring' }]}
        />
      ));
    });
    const target = createEventTarget(ref.current);
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerdown({ button: 0 });
      jest.runAllTimers();
    });
    expect(onPressIn).toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerup({ button: 0 });
      jest.runAllTimers();
    });
    expect(onPressOut).toBeCalled();
    expect(onPress).toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = jest.fn();
      render(<Pressable ref={ref} />);
      expect(ref).toBeCalled();
    });

    test('node has imperative methods', () => {
      const ref = React.createRef();
      act(() => {
        render(<Pressable ref={ref} />);
      });
      const node = ref.current;
      expect(typeof node.measure === 'function');
      expect(typeof node.measureLayout === 'function');
      expect(typeof node.measureInWindow === 'function');
      expect(typeof node.setNativeProps === 'function');
    });
  });

  test('prop "pointerEvents"', () => {
    const { container } = render(<Pressable pointerEvents="box-only" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
