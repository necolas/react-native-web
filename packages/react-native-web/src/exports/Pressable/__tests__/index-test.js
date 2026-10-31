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
    expect(onFocus).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      body.focus({ relatedTarget: target.node });
    });
    expect(onBlur).toHaveBeenCalled();
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
    expect(onFocus).toHaveBeenCalled();
    act(() => {
      body.focus({ relatedTarget: target.node });
    });
    expect(onBlur).toHaveBeenCalled();
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
    expect(onHoverIn).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerout();
    });
    expect(onHoverOut).toHaveBeenCalled();
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
    expect(onPressIn).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.pointerup({ button: 0 });
      jest.runAllTimers();
    });
    expect(onPressOut).toHaveBeenCalled();
    expect(onPress).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
    act(() => {
      target.contextmenu({});
    });
    expect(onContextMenu).toHaveBeenCalled();
  });

  describe('press interaction (cross-element pointer release)', () => {
    test('ignores a pointer click dispatched to an ancestor after a drag from a nested Pressable', () => {
      // Reproduces https://github.com/necolas/react-native-web/issues/2765:
      // a press that starts in a nested Pressable and is released over an
      // ancestor makes the browser dispatch 'click' to the nearest common
      // ancestor. That click must not fire the ancestor's onPress, because no
      // press ever started on the ancestor.
      const onParentPress = jest.fn();
      const onChildPress = jest.fn();
      const parentRef = React.createRef();
      const childRef = React.createRef();
      act(() => {
        render(
          <Pressable onPress={onParentPress} ref={parentRef}>
            <Pressable onPress={onChildPress} ref={childRef} />
          </Pressable>
        );
      });
      const parent = createEventTarget(parentRef.current);
      const child = createEventTarget(childRef.current);
      act(() => {
        child.pointerdown({ button: 0 });
        jest.runAllTimers();
      });
      act(() => {
        // The browser dispatches 'mouseup' to the element under the pointer,
        // then dispatches 'click' to the nearest common ancestor with
        // 'detail' > 0 for pointer-originated clicks.
        parent.click({ button: 0, detail: 1 });
        jest.runAllTimers();
      });
      expect(onChildPress).not.toHaveBeenCalled();
      expect(onParentPress).not.toHaveBeenCalled();
    });

    test('calls onPress for a pointer click on an element where the press started', () => {
      const onParentPress = jest.fn();
      const parentRef = React.createRef();
      const childRef = React.createRef();
      act(() => {
        render(
          <Pressable onPress={onParentPress} ref={parentRef}>
            <Pressable onPress={jest.fn()} ref={childRef} />
          </Pressable>
        );
      });
      const parent = createEventTarget(parentRef.current);
      act(() => {
        parent.pointerdown({ button: 0 });
        jest.runAllTimers();
      });
      act(() => {
        // Release still within the parent (e.g., over its child); the
        // resulting common-ancestor click may fire onPress because the press
        // did start on this element.
        parent.click({ button: 0, detail: 1 });
        jest.runAllTimers();
      });
      expect(onParentPress).toHaveBeenCalledTimes(1);
    });

    test('calls onPress for programmatic and virtual (assistive technology) clicks without a pointer gesture', () => {
      // 'element.click()', 'HTMLElement#click' from scripts, and clicks
      // dispatched by assistive technologies have no pointer gesture and a
      // 'detail' of 0; they must continue to fire onPress.
      const onPress = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Pressable onPress={onPress} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click({ button: 0, detail: 0 });
        jest.runAllTimers();
      });
      expect(onPress).toHaveBeenCalledTimes(1);
      act(() => {
        target.virtualclick();
        jest.runAllTimers();
      });
      expect(onPress).toHaveBeenCalledTimes(2);
    });
  });

  test('repeated pointer clicks each fire onPress once', () => {
    const onPress = jest.fn();
    const ref = React.createRef();
    act(() => {
      render(<Pressable onPress={onPress} ref={ref} />);
    });
    const target = createEventTarget(ref.current);
    for (let i = 0; i < 2; i++) {
      act(() => {
        target.pointerdown({ button: 0 });
        jest.runAllTimers();
      });
      act(() => {
        // The browser dispatches 'pointerup'/'mouseup', then 'click'.
        ref.current.dispatchEvent(
          new MouseEvent('pointerup', { bubbles: true, button: 0 })
        );
        ref.current.dispatchEvent(
          new MouseEvent('mouseup', { bubbles: true, button: 0 })
        );
        target.click({ button: 0, detail: i + 1 });
        jest.runAllTimers();
      });
    }
    expect(onPress).toHaveBeenCalledTimes(2);
  });

  test('ignores a pointer click arriving after a keyboard-initiated press', () => {
    // A keyboard press fires onPress from 'keyup'; it must not also arm the
    // pointer-click path for a click that arrives before 'keyup'.
    const onPress = jest.fn();
    const ref = React.createRef();
    act(() => {
      render(<Pressable onPress={onPress} ref={ref} />);
    });
    const target = createEventTarget(ref.current);
    act(() => {
      target.keydown({ key: 'Enter' });
      jest.runAllTimers();
    });
    act(() => {
      target.click({ button: 0, detail: 1 });
      jest.runAllTimers();
    });
    expect(onPress).not.toHaveBeenCalled();
    act(() => {
      target.keyup({ key: 'Enter' });
      jest.runAllTimers();
    });
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  describe('press interaction (keyboard)', () => {
    test('trigger press when keyup is on the same element', () => {
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
      expect(onPressIn).toHaveBeenCalled();
      expect(container.firstChild).toMatchSnapshot();
      act(() => {
        target.keyup({ key: 'Enter' });
        jest.runAllTimers();
      });
      expect(onPressOut).toHaveBeenCalled();
      expect(onPress).toHaveBeenCalled();
      expect(container.firstChild).toMatchSnapshot();
    });

    test('ignore press when keyup is on a different element', () => {
      const onPress = jest.fn();
      const firstRef = React.createRef();

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
        jest.runAllTimers();
      });
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  test('press interaction as button (keyboard)', () => {
    const onPress = jest.fn();
    const preventDefault = jest.fn();
    const ref = React.createRef();

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
      jest.runAllTimers();
    });
    // Calling preventDefault prevents native 'click' event dispatch
    expect(preventDefault).not.toHaveBeenCalled();
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = jest.fn();
      render(<Pressable ref={ref} />);
      expect(ref).toHaveBeenCalled();
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

  describe('prop "title"', () => {
    test('value is set', () => {
      const { container } = render(<Pressable title="123" />);
      expect(container.firstChild).toHaveProperty('title', '123');
    });
  });
});
