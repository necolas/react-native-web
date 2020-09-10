/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import Text from '../';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import { render } from '@testing-library/react';

describe('components/Text', () => {
  test('default', () => {
    const { container } = render(<Text />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('nested', () => {
    const { container } = render(<Text children={<Text testID="child" />} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "accessibilityLabel"', () => {
    test('value is set', () => {
      const { container } = render(<Text accessibilityLabel="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityLiveRegion"', () => {
    test('value is set', () => {
      const { container } = render(<Text accessibilityLiveRegion="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityRole"', () => {
    test('value is set', () => {
      const { container } = render(<Text accessibilityRole="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = render(<Text accessibilityRole="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = render(<Text accessibilityRole="link" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('allows "dir" to be overridden', () => {
    const { container } = render(<Text dir="rtl" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = render(<Text nativeID="nativeID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "numberOfLines"', () => {
    test('value is set', () => {
      const { container } = render(<Text numberOfLines="3" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Text onBlur={onBlur} ref={ref} />);
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
        render(<Text onFocus={onFocus} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
        target.blur();
      });
      expect(onFocus).toBeCalled();
    });
  });

  describe('prop "onPress"', () => {
    test('is called', () => {
      const onPress = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<Text onPress={onPress} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ button: 0 });
        target.pointerup({ button: 0 });
      });
      expect(onPress).toBeCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = jest.fn();
      render(<Text ref={ref} />);
      expect(ref).toBeCalled();
    });

    test('node has imperative methods', () => {
      const ref = React.createRef();
      act(() => {
        render(<Text ref={ref} />);
      });
      const node = ref.current;
      expect(typeof node.measure === 'function');
      expect(typeof node.measureLayout === 'function');
      expect(typeof node.measureInWindow === 'function');
      expect(typeof node.setNativeProps === 'function');
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
});
