/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render } from '@testing-library/react';
import { createEventTarget } from 'dom-event-testing-library';
import React from 'react';

import Pressable from '../';
import type { HostNode } from '../../../types';
import TextInput from '../../TextInput';

describe('components/Pressable', () => {
  test('default', () => {
    const { container } = render(<Pressable />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "aria-label"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable aria-label="label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-live"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable aria-live="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "role"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable role="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = render(<Pressable role="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = render(<Pressable role="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "disabled"', () => {
    const { container } = render(<Pressable disabled={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "disabled" takes precedence over "aria-disabled"', () => {
    const { container } = render(
      <Pressable aria-disabled={true} disabled={false} />
    );
    expect(
      (container.firstChild as HTMLElement).getAttribute('aria-disabled')
    ).toBeNull();
  });

  test('prop "disabled" disables native button', () => {
    const { container } = render(<Pressable disabled={true} role="button" />);
    expect((container.firstChild as HTMLElement).tagName).toBe('BUTTON');
    expect((container.firstChild as HTMLButtonElement).disabled).toBe(true);
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
    let container!: HTMLElement;
    const onBlur = vi.fn();
    const onFocus = vi.fn();
    const ref = React.createRef<HostNode>();
    act(() => {
      ({ container } = render(
        <Pressable
          children={({ focused }) =>
            focused ? <div data-testid="focus-content" /> : null
          }
          onBlur={onBlur}
          onFocus={onFocus}
          ref={ref}
          style={({ focused }) => [focused && { outlineColor: 'red' }]}
        />
      ));
    });
    const target = createEventTarget(ref.current);
    const body = createEventTarget(document.body);
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.focus();
    });
    expect(onFocus).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      body.focus({ relatedTarget: target.node });
    });
    expect(onBlur).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('focus interaction (disabled)', () => {
    const onBlur = vi.fn();
    const onFocus = vi.fn();
    const ref = React.createRef<HostNode>();
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
    expect(onFocus).toHaveBeenCalled();
    act(() => {
      body.focus({ relatedTarget: target.node });
    });
    expect(onBlur).toHaveBeenCalled();
  });

  test('hover interaction', () => {
    let container!: HTMLElement;
    const onHoverIn = vi.fn();
    const onHoverOut = vi.fn();
    const ref = React.createRef<HostNode>();
    act(() => {
      ({ container } = render(
        <Pressable
          children={({ hovered }) =>
            hovered ? <div data-testid="hover-content" /> : null
          }
          onHoverIn={onHoverIn}
          onHoverOut={onHoverOut}
          ref={ref}
          style={({ hovered }) => [hovered && { outlineColor: 'green' }]}
        />
      ));
    });
    const target = createEventTarget(ref.current);
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerover();
    });
    expect(onHoverIn).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerout();
    });
    expect(onHoverOut).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('hover interaction (no state callback)', () => {
    const onHoverIn = vi.fn();
    const onHoverOut = vi.fn();
    const onRender = vi.fn();
    const ref = React.createRef<HostNode>();

    act(() => {
      render(
        <React.Profiler id="pressable" onRender={onRender}>
          <Pressable onHoverIn={onHoverIn} onHoverOut={onHoverOut} ref={ref} />
        </React.Profiler>
      );
    });

    const target = createEventTarget(ref.current);
    onRender.mockClear();

    act(() => {
      target.pointerover();
    });
    act(() => {
      target.pointerout();
    });

    expect(onHoverIn).toHaveBeenCalled();
    expect(onHoverOut).toHaveBeenCalled();
    expect(onRender).not.toHaveBeenCalled();
  });

  test('press interaction (pointer)', () => {
    let container!: HTMLElement;
    const onContextMenu = vi.fn();
    const onPress = vi.fn();
    const onPressIn = vi.fn();
    const onPressOut = vi.fn();
    const ref = React.createRef<HostNode>();
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
          style={({ pressed }) => [pressed && { outlineColor: 'blue' }]}
        />
      ));
    });
    const target = createEventTarget(ref.current);
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerdown({ button: 0 });
      vi.runAllTimers();
    });
    expect(onPressIn).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerup({ button: 0 });
      vi.runAllTimers();
    });
    expect(onPressOut).toHaveBeenCalled();
    expect(onPress).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.contextmenu({});
    });
    expect(onContextMenu).toHaveBeenCalled();
  });

  describe('press interaction (keyboard)', () => {
    test('trigger press when keyup is on the same element', () => {
      let container!: HTMLElement;
      const onPress = vi.fn();
      const onPressIn = vi.fn();
      const onPressOut = vi.fn();
      const ref = React.createRef<HostNode>();

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
            style={({ pressed }) => [pressed && { outlineColor: 'blue' }]}
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
        vi.runAllTimers();
      });
      expect(onPressIn).toHaveBeenCalled();
      expect(container.firstChild).toMatchSnapshot();
      act(() => {
        target.keyup({ key: 'Enter' });
        vi.runAllTimers();
      });
      expect(onPressOut).toHaveBeenCalled();
      expect(onPress).toHaveBeenCalled();
      expect(container.firstChild).toMatchSnapshot();
    });

    test('ignore press when keyup is on a different element', () => {
      const onPress = vi.fn();
      const firstRef = React.createRef<HostNode>();

      function TestCase() {
        return (
          <Pressable
            onPress={(e) => {
              onPress(e);
            }}
            ref={firstRef}
          />
        );
      }

      act(() => {
        render(<TestCase />);
      });
      const target = createEventTarget(firstRef.current);
      const body = createEventTarget(document.body);
      act(() => {
        target.keydown({ key: 'Enter' });
        body.keyup({ key: 'Enter' });
        vi.runAllTimers();
      });
      expect(onPress).not.toHaveBeenCalled();
    });

    test('trigger press when role is "link"', () => {
      const onPress = vi.fn();
      const ref = React.createRef<HostNode>();

      act(() => {
        render(<Pressable onPress={onPress} ref={ref} role="link" />);
      });

      const target = createEventTarget(ref.current);

      act(() => {
        target.keydown({ key: 'Enter' });
        target.keyup({ key: 'Enter' });
        vi.runAllTimers();
      });

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    test('ignore press when role is "link" and href is set', () => {
      // The browser dispatches a native 'click' for anchors
      const onPress = vi.fn();
      const ref = React.createRef<HostNode>();

      act(() => {
        render(
          <Pressable
            href="https://example.com"
            onPress={onPress}
            ref={ref}
            role="link"
          />
        );
      });

      expect(ref.current?.tagName).toBe('A');
      const target = createEventTarget(ref.current);

      act(() => {
        target.keydown({ key: 'Enter' });
        target.keyup({ key: 'Enter' });
        vi.runAllTimers();
      });

      expect(onPress).not.toHaveBeenCalled();
    });
  });

  test('press interaction as button (keyboard)', () => {
    const onPress = vi.fn();
    const preventDefault = vi.fn();
    const ref = React.createRef<HostNode>();

    function TestCase() {
      return (
        <Pressable
          onPress={(e) => {
            onPress(e);
          }}
          ref={ref}
          role="button"
        />
      );
    }

    act(() => {
      render(<TestCase />);
    });
    const target = createEventTarget(ref.current);
    act(() => {
      target.keydown({ key: ' ', preventDefault });
      vi.runAllTimers();
    });
    // Calling preventDefault prevents native 'click' event dispatch
    expect(preventDefault).not.toHaveBeenCalled();
  });

  test('ignore keyboard press from a nested text input', () => {
    const onKeyDown = vi.fn();
    const onPress = vi.fn();
    const onPressIn = vi.fn();
    const inputRef = React.createRef<HostNode>();
    const textAreaRef = React.createRef<HostNode>();

    function TestCase() {
      return (
        <Pressable
          onKeyDown={onKeyDown}
          onPress={onPress}
          onPressIn={onPressIn}
        >
          <TextInput ref={inputRef} />
          <TextInput multiline={true} ref={textAreaRef} />
        </Pressable>
      );
    }

    act(() => {
      render(<TestCase />);
    });

    const input = createEventTarget(inputRef.current);
    const textArea = createEventTarget(textAreaRef.current);

    act(() => {
      input.keydown({ key: 'Enter' });
      input.keyup({ key: 'Enter' });
      input.keydown({ key: ' ' });
      input.keyup({ key: ' ' });
      textArea.keydown({ key: 'Enter' });
      textArea.keyup({ key: 'Enter' });
      vi.runAllTimers();
    });

    expect(onKeyDown).toHaveBeenCalledTimes(3);
    expect(onPressIn).not.toHaveBeenCalled();
    expect(onPress).not.toHaveBeenCalled();
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = vi.fn();
      render(<Pressable ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    test('node has imperative methods', () => {
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<Pressable ref={ref} />);
      });
      const node = ref.current;
      expect(node?.measure).toBeTypeOf('function');
      expect(node?.measureLayout).toBeTypeOf('function');
      expect(node?.measureInWindow).toBeTypeOf('function');
      expect(node?.setNativeProps).toBeTypeOf('function');
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

  describe('prop "title"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable title="123" />);
      expect(container.firstChild).toHaveProperty('title', '123');
    });
  });

  describe('prop "type"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable type="submit" />);
      const element = container.firstChild as HTMLElement;
      expect(element.getAttribute('type')).toBe('submit');
    });
  });
});
