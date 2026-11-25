/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render, type RenderResult } from '@testing-library/react';
import { createEventTarget } from 'dom-event-testing-library';
import React from 'react';

import Text from '../';
import type { HostNode } from '../../../types';

describe('components/Text', () => {
  test('default', () => {
    const { container } = render(<Text />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('nested', () => {
    const { container } = render(<Text children={<Text testID="child" />} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "aria-label"', () => {
    test('value is set', () => {
      const { container } = render(<Text aria-label="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-labelledby"', () => {
    test('value is set', () => {
      const { container } = render(<Text aria-labelledby="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-live"', () => {
    test('value is set', () => {
      const { container } = render(<Text aria-live="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "role"', () => {
    test('value is set', () => {
      const { container } = render(<Text role="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = render(<Text role="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      // @ts-expect-error
      const { container } = render(<Text role="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "href"', () => {
    test('value is set', () => {
      const { container } = render(<Text href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('href with role', () => {
      const { container } = render(
        <Text href="https://example.com" role="none" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hrefAttrs"', () => {
    test('requires "href"', () => {
      const { container } = render(
        <Text hrefAttrs={{ download: 'filename.jpg' }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is set', () => {
      const hrefAttrs = {
        download: 'filename.jpg',
        rel: 'nofollow',
        target: '_blank'
      };
      const { container } = render(
        <Text href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('target variant is set', () => {
      const hrefAttrs = {
        target: 'blank'
      };
      const { container } = render(
        <Text href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('null values are excluded', () => {
      const hrefAttrs = {
        download: null,
        rel: null,
        target: null
      };
      const { container } = render(
        <Text href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = render(<Text nativeID="nativeID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "numberOfLines"', () => {
    test('value is set', () => {
      const { container } = render(<Text numberOfLines={3} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is set to one', () => {
      const { container } = render(<Text numberOfLines={1} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is set to one with "clip" ellipsizeMode', () => {
      const { container } = render(
        <Text ellipsizeMode="clip" numberOfLines={1} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = vi.fn();
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<Text onBlur={onBlur} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      const body = createEventTarget(document.body);
      act(() => {
        target.focus();
        body.focus({ relatedTarget: target.node });
      });
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('prop "onClick"', () => {
    test('is called', () => {
      const onClick = vi.fn();
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<Text onClick={onClick} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onClick).toHaveBeenCalled();
    });

    test('is still called if "onPress" is provided', () => {
      const onClick = vi.fn();
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<Text onClick={onClick} onPress={() => {}} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('prop "onFocus"', () => {
    test('is called', () => {
      const onFocus = vi.fn();
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<Text onFocus={onFocus} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
      });
      expect(onFocus).toHaveBeenCalled();
    });
  });

  describe('prop "onPointerDown"', () => {
    test('is called', () => {
      const onPointerDown = vi.fn();
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<Text onPointerDown={onPointerDown} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ pointerType: 'touch' });
      });
      expect(onPointerDown).toHaveBeenCalled();
    });
  });

  describe('prop "onPress"', () => {
    test('is called', () => {
      const onPress = vi.fn();
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<Text onPress={onPress} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ button: 0 });
        target.pointerup({ button: 0 });
      });
      expect(onPress).toHaveBeenCalled();
    });

    test('is not called if "onClick" is provided', () => {
      const onPress = vi.fn();
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<Text onClick={() => {}} onPress={onPress} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = vi.fn();
      render(<Text ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    test('is not called for prop changes', () => {
      const ref = vi.fn();
      let rerender: RenderResult['rerender'];
      act(() => {
        ({ rerender } = render(
          <Text nativeID="123" ref={ref} style={{ borderWidth: 5 }} />
        ));
      });
      expect(ref).toHaveBeenCalledOnce();
      act(() => {
        rerender(<Text nativeID="1234" ref={ref} style={{ borderWidth: 6 }} />);
      });
      expect(ref).toHaveBeenCalledOnce();
    });

    test('node has imperative methods', () => {
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<Text ref={ref} />);
      });
      const node = ref.current;
      expect(node?.measure).toBeTypeOf('function');
      expect(node?.measureLayout).toBeTypeOf('function');
      expect(node?.measureInWindow).toBeTypeOf('function');
      expect(node?.setNativeProps).toBeTypeOf('function');
    });
  });

  describe('prop "selectable"', () => {
    test('value of false', () => {
      const { container } = render(<Text selectable={false} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value of true', () => {
      const { container } = render(<Text selectable={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = render(<Text style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = render(<Text testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "title"', () => {
    test('value is set', () => {
      const { container } = render(<Text title="Hello" />);
      expect((container.firstChild as HTMLElement).getAttribute('title')).toBe(
        'Hello'
      );
    });
  });

  describe('prop "unstable_type"', () => {
    test('value is set', () => {
      const { container } = render(<Text unstable_type="submit" />);
      const element = container.firstChild as HTMLElement;
      expect(element.getAttribute('type')).toBe('submit');
    });

    test('invalid value is ignored', () => {
      // @ts-expect-error: "text" is not a valid value
      const { container } = render(<Text unstable_type="text" />);
      const element = container.firstChild as HTMLElement;
      expect(element.getAttribute('type')).toBeNull();
    });
  });
});
