/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Pressable from '../';
import { createEventTarget } from 'dom-event-testing-library';
import { act, render } from '@testing-library/react';

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
      const { container } = render(
        <Pressable accessibilityLiveRegion="polite" />
      );
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
      const { container } = render(<Pressable accessibilityRole="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "disabled"', () => {
    const { container } = render(<Pressable disabled={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "href"', () => {
    const { container } = render(<Pressable href="#href" />);
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
          children={({ focused }) =>
            focused ? <div data-testid="focus-content" /> : null
          }
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

  test('focus interaction (disabled)', () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const ref = React.createRef();
    act(() => {
      render(
        <Pressable
          disabled={true}
          onBlur={onBlur}
          onFocus={onFocus}
          ref={ref}
        />
      );
    });
    const target = createEventTarget(ref.current);
    const body = createEventTarget(document.body);
    act(() => {
      target.focus();
    });
    expect(onFocus).toBeCalled();
    act(() => {
      body.focus({ relatedTarget: target.node });
    });
    expect(onBlur).toBeCalled();
  });

  test('hover interaction', () => {
    let container;
    const onHoverIn = jest.fn();
    const onHoverOut = jest.fn();
    const ref = React.createRef();
    act(() => {
      ({ container } = render(
        <Pressable
          children={({ hovered }) =>
            hovered ? <div data-testid="hover-content" /> : null
          }
          onHoverIn={onHoverIn}
          onHoverOut={onHoverOut}
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
    expect(onHoverIn).toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerout();
    });
    expect(onHoverOut).toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('press interaction (pointer)', () => {
    let container;
    const onContextMenu = jest.fn();
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const ref = React.createRef();
    act(() => {
      ({ container } = render(
        <Pressable
          children={({ pressed }) =>
            pressed ? <div data-testid="press-content" /> : null
          }
          onContextMenu={onContextMenu}
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
    act(() => {
      target.contextmenu({});
    });
    expect(onContextMenu).toBeCalled();
  });

  test('press interaction (keyboard)', () => {
    let container;
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const ref = React.createRef();

    function TestCase() {
      const [shown, setShown] = React.useState(true);
      return shown ? (
        <Pressable
          children={({ pressed }) =>
            pressed ? <div data-testid="press-content" /> : null
          }
          onPress={(e) => {
            onPress(e);
            setShown(false);
          }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          ref={ref}
          style={({ pressed }) => [pressed && { outline: 'press-ring' }]}
        />
      ) : null;
    }

    act(() => {
      ({ container } = render(<TestCase />));
    });
    const target = createEventTarget(ref.current);
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.keydown({ key: 'Enter' });
      jest.runAllTimers();
    });
    expect(onPressIn).toBeCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.keyup({ key: 'Enter' });
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
