/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render, type RenderResult } from '@testing-library/react';
import { createEventTarget } from 'dom-event-testing-library';
import React from 'react';

import View from '../';
import type { HostNode } from '../../../types';

describe('components/View', () => {
  test('default', () => {
    const { container } = render(<View />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('non-text is rendered', () => {
    const children = <View testID="1" />;
    const { container } = render(<View>{children}</View>);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('raw text nodes as children', () => {
    beforeEach(() => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    test('error logged (single)', () => {
      render(<View>hello</View>);
      expect(console.error).toHaveBeenCalled();
    });

    test('error logged (array)', () => {
      render(
        <View>
          <View />
          hello
          <View />
        </View>
      );
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('prop "aria-label"', () => {
    test('value is set', () => {
      const { container } = render(<View aria-label="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-labelledby"', () => {
    test('value is set', () => {
      const { container } = render(<View aria-labelledby="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "aria-live"', () => {
    test('value is set', () => {
      const { container } = render(<View aria-live="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "role"', () => {
    test('value is set', () => {
      const { container } = render(<View role="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = render(<View role="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = render(<View role="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "href"', () => {
    test('value is set', () => {
      const { container } = render(<View href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('href with role', () => {
      const { container } = render(
        <View href="https://example.com" role="none" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hrefAttrs"', () => {
    test('requires "href"', () => {
      const { container } = render(
        <View hrefAttrs={{ download: 'filename.jpg' }} />
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
        <View href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('target variant is set', () => {
      const hrefAttrs = {
        target: 'blank'
      };
      const { container } = render(
        <View href="https://example.com" hrefAttrs={hrefAttrs} />
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
        <View href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = render(<View nativeID="nativeID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = vi.fn();
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<View onBlur={onBlur} ref={ref} />);
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
        render(<View onClick={onClick} ref={ref} />);
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
        render(<View onFocus={onFocus} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
        target.blur();
      });
      expect(onFocus).toHaveBeenCalled();
    });
  });

  describe('prop "onPointerDown"', () => {
    test('is called', () => {
      const onPointerDown = vi.fn();
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<View onPointerDown={onPointerDown} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ pointerType: 'touch' });
      });
      expect(onPointerDown).toHaveBeenCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = vi.fn();
      render(<View ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    test('is not called for prop changes', () => {
      const ref = vi.fn();
      let rerender: RenderResult['rerender'];
      act(() => {
        ({ rerender } = render(
          <View nativeID="123" ref={ref} style={{ borderWidth: 5 }} />
        ));
      });
      expect(ref).toHaveBeenCalledOnce();
      act(() => {
        rerender(<View nativeID="1234" ref={ref} style={{ borderWidth: 6 }} />);
      });
      expect(ref).toHaveBeenCalledOnce();
    });

    test('node has imperative methods', () => {
      const ref = React.createRef<HostNode>();
      act(() => {
        render(<View ref={ref} />);
      });
      const node = ref.current;
      expect(node?.measure).toBeTypeOf('function');
      expect(node?.measureLayout).toBeTypeOf('function');
      expect(node?.measureInWindow).toBeTypeOf('function');
      expect(node?.setNativeProps).toBeTypeOf('function');
    });
  });

  test('prop "pointerEvents"', () => {
    const { container } = render(<View pointerEvents="box-only" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = render(<View style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = render(<View testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "title"', () => {
    test('value is set', () => {
      const { container } = render(<View title="Hello" />);
      expect((container.firstChild as HTMLElement).getAttribute('title')).toBe(
        'Hello'
      );
    });
  });

  describe('prop "type"', () => {
    test('default is "button" when role is "button"', () => {
      const { container } = render(<View role="button" />);
      expect((container.firstChild as HTMLElement).getAttribute('type')).toBe(
        'button'
      );
    });
  });

  describe('prop "unstable_type"', () => {
    test('value is set', () => {
      const { container } = render(<View unstable_type="submit" />);
      const element = container.firstChild as HTMLElement;
      expect(element.getAttribute('type')).toBe('submit');
    });

    test('invalid value is ignored', () => {
      // @ts-expect-error: "text" is not a valid value
      const { container } = render(<View unstable_type="text" />);
      const element = container.firstChild as HTMLElement;
      expect(element.getAttribute('type')).toBeNull();
    });
  });
});
