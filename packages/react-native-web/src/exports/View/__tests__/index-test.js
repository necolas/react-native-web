/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import View from '../';
import StyleSheet from '../../StyleSheet';
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

  describe('prop "accessibilityLabelledBy"', () => {
    test('value is set', () => {
      const { container } = render(<View accessibilityLabelledBy="123" />);
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
      const { container } = render(<View accessibilityRole="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('allows "dir" to be overridden', () => {
    const { container } = render(<View dir="rtl" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "href"', () => {
    test('value is set', () => {
      const { container } = render(<View href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('href with accessibilityRole', () => {
      const { container } = render(<View accessibilityRole="none" href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hrefAttrs"', () => {
    test('requires "href"', () => {
      const { container } = render(<View hrefAttrs={{ download: 'filename.jpg' }} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is set', () => {
      const hrefAttrs = {
        download: 'filename.jpg',
        rel: 'nofollow',
        target: '_blank'
      };
      const { container } = render(<View href="https://example.com" hrefAttrs={hrefAttrs} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('target variant is set', () => {
      const hrefAttrs = {
        target: 'blank'
      };
      const { container } = render(<View href="https://example.com" hrefAttrs={hrefAttrs} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('null values are excluded', () => {
      const hrefAttrs = {
        download: null,
        rel: null,
        target: null
      };
      const { container } = render(<View href="https://example.com" hrefAttrs={hrefAttrs} />);
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
      const onBlur = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<View onBlur={onBlur} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      const body = createEventTarget(document.body);
      act(() => {
        target.focus();
        body.focus({ relatedTarget: target.node });
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

    test('is not called for prop changes', () => {
      const ref = jest.fn();
      let rerender;
      act(() => {
        ({ rerender } = render(<View nativeID="123" ref={ref} style={{ borderWidth: 5 }} />));
      });
      expect(ref).toHaveBeenCalledTimes(1);
      act(() => {
        rerender(<View nativeID="1234" ref={ref} style={{ borderWidth: 6 }} />);
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

    describe('setNativeProps method', () => {
      test('works with react-native props', () => {
        const ref = React.createRef();
        const { container } = render(<View ref={ref} />);
        const node = ref.current;
        node.setNativeProps({
          accessibilityLabel: 'label',
          pointerEvents: 'box-only',
          style: {
            marginHorizontal: 10,
            shadowColor: 'black',
            shadowWidth: 2,
            textAlignVertical: 'top'
          }
        });
        expect(container.firstChild).toMatchSnapshot();
      });

      test('style updates as expected', () => {
        const ref = React.createRef();
        const styles = StyleSheet.create({ root: { color: 'red' } });
        // initial render
        const { container, rerender } = render(
          <View ref={ref} style={[styles.root, { width: 10 }]} />
        );
        const node = ref.current;
        expect(container.firstChild).toMatchSnapshot();
        // set native props
        node.setNativeProps({ style: { color: 'orange', height: 20, width: 20 } });
        expect(container.firstChild).toMatchSnapshot();
        // set native props again
        node.setNativeProps({ style: { width: 30 } });
        expect(container.firstChild).toMatchSnapshot();
        node.setNativeProps({ style: { width: 30 } });
        node.setNativeProps({ style: { width: 30 } });
        node.setNativeProps({ style: { width: 30 } });
        expect(container.firstChild).toMatchSnapshot();
        // update render
        rerender(<View ref={ref} style={[styles.root, { width: 40 }]} />);
        expect(container.firstChild).toMatchSnapshot();
      });
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
