/* eslint-env jasmine, jest */

import React from 'react';
import View from '../';
import StyleSheet from '../../StyleSheet';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import renderRootView from '../../../exports/AppRegistry/renderRootView';

describe('components/View', () => {
  test('default', () => {
    const { container } = renderRootView(<View />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('non-text is rendered', () => {
    const children = <View testID="1" />;
    const { container } = renderRootView(<View>{children}</View>);
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
      renderRootView(<View>hello</View>);
      expect(console.error).toBeCalled();
    });

    test('error logged (array)', () => {
      renderRootView(
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
      const { container } = renderRootView(<View accessibilityLabel="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityLabelledBy"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<View accessibilityLabelledBy="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityLiveRegion"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<View accessibilityLiveRegion="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityRole"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<View accessibilityRole="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = renderRootView(<View accessibilityRole="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = renderRootView(<View accessibilityRole="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('allows "dir" to be overridden', () => {
    const { container } = renderRootView(<View dir="rtl" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "href"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<View href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('href with accessibilityRole', () => {
      const { container } = renderRootView(
        <View accessibilityRole="none" href="https://example.com" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hrefAttrs"', () => {
    test('requires "href"', () => {
      const { container } = renderRootView(<View hrefAttrs={{ download: 'filename.jpg' }} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is set', () => {
      const hrefAttrs = {
        download: 'filename.jpg',
        rel: 'nofollow',
        target: '_blank'
      };
      const { container } = renderRootView(
        <View href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('target variant is set', () => {
      const hrefAttrs = {
        target: 'blank'
      };
      const { container } = renderRootView(
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
      const { container } = renderRootView(
        <View href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<View nativeID="nativeID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = jest.fn();
      const ref = React.createRef();
      act(() => {
        renderRootView(<View onBlur={onBlur} ref={ref} />);
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
        renderRootView(<View onFocus={onFocus} ref={ref} />);
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
      renderRootView(<View ref={ref} />);
      expect(ref).toBeCalled();
    });

    test('is not called for prop changes', () => {
      const ref = jest.fn();
      let rerender;
      act(() => {
        ({ rerender } = renderRootView(
          <View nativeID="123" ref={ref} style={{ borderWidth: 5 }} />
        ));
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
        renderRootView(<View ref={ref} />);
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
        const { container } = renderRootView(<View ref={ref} />);
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
        const { container, rerender } = renderRootView(
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
    const { container } = renderRootView(<View pointerEvents="box-only" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<View style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<View testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
