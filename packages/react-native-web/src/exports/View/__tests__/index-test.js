/* eslint-env jasmine, jest */

import React from 'react';
import View from '../';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import { render } from '@testing-library/react';

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
      jest.spyOn(console, 'error');
      console.error.mockImplementation(() => {});
    });

    afterEach(() => {
      console.error.mockRestore();
    });

    test('error logged (single)', () => {
      render(<View>hello</View>);
      expect(console.error).toBeCalled();
    });

    test('error logged (array)', () => {
      render(
        <View>
          <View />
          hello
          <View />
        </View>
      );
      expect(console.error).toBeCalled();
    });
  });

  describe('prop "accessibilityLabel"', () => {
    test('value is set', () => {
      const { container } = render(<View accessibilityLabel="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityLiveRegion"', () => {
    test('value is set', () => {
      const { container } = render(<View accessibilityLiveRegion="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityRole"', () => {
    test('value is set', () => {
      const { container } = render(<View accessibilityRole="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = render(<View accessibilityRole="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = render(<View accessibilityRole="link" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('allows "dir" to be overridden', () => {
    const { container } = render(<View dir="rtl" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = render(<View nativeID="nativeID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<View onBlur={onBlur} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
        target.blur();
      });
      expect(onBlur).toBeCalled();
    });
  });

  describe('prop "onFocus"', () => {
    test('is called', () => {
      const onFocus = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<View onFocus={onFocus} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
        target.blur();
      });
      expect(onFocus).toBeCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = jest.fn();
      render(<View ref={ref} />);
      expect(ref).toBeCalled();
    });

    test('is memoized on ref changes', () => {
      const ref = jest.fn();
      let rerender;
      act(() => {
        ({ rerender } = render(<View ref={ref} testID="123" />));
      });
      expect(ref).toHaveBeenCalledTimes(1);
      act(() => {
        rerender(<View ref={ref} testID="1234" />);
      });
      expect(ref).toHaveBeenCalledTimes(1);
    });

    test('node has imperative methods', () => {
      const ref = React.createRef();
      act(() => {
        render(<View ref={ref} />);
      });
      const node = ref.current;
      expect(typeof node.measure === 'function');
      expect(typeof node.measureLayout === 'function');
      expect(typeof node.measureInWindow === 'function');
      expect(typeof node.setNativeProps === 'function');
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
});
