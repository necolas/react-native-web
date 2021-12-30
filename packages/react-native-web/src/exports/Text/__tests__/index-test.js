/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import Text from '../';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import renderRootView from '../../../exports/AppRegistry/renderRootView';

describe('components/Text', () => {
  test('default', () => {
    const { container } = renderRootView(<Text />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('nested', () => {
    const { container } = renderRootView(<Text children={<Text testID="child" />} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "accessibilityLabel"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<Text accessibilityLabel="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityLabelledBy"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<Text accessibilityLabelledBy="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityLiveRegion"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<Text accessibilityLiveRegion="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityRole"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<Text accessibilityRole="none" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is "button"', () => {
      const { container } = renderRootView(<Text accessibilityRole="button" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value alters HTML element', () => {
      const { container } = renderRootView(<Text accessibilityRole="article" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('allows "dir" to be overridden', () => {
    const { container } = renderRootView(<Text dir="rtl" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "href"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<Text href="https://example.com" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('href with accessibilityRole', () => {
      const { container } = renderRootView(
        <Text accessibilityRole="none" href="https://example.com" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hrefAttrs"', () => {
    test('requires "href"', () => {
      const { container } = renderRootView(<Text hrefAttrs={{ download: 'filename.jpg' }} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value is set', () => {
      const hrefAttrs = {
        download: 'filename.jpg',
        rel: 'nofollow',
        target: '_blank'
      };
      const { container } = renderRootView(
        <Text href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('target variant is set', () => {
      const hrefAttrs = {
        target: 'blank'
      };
      const { container } = renderRootView(
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
      const { container } = renderRootView(
        <Text href="https://example.com" hrefAttrs={hrefAttrs} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "lang"', () => {
    test('undefined', () => {
      const { container } = renderRootView(<Text />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('fr', () => {
      const { container } = renderRootView(<Text lang="fr" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<Text nativeID="nativeID" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "numberOfLines"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<Text numberOfLines={3} />);
      expect(container.firstChild).toMatchSnapshot();
    });
    test('value is set to one', () => {
      const { container } = renderRootView(<Text numberOfLines={1} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = jest.fn();
      const ref = React.createRef();
      act(() => {
        renderRootView(<Text onBlur={onBlur} ref={ref} />);
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

  describe('prop "onClick"', () => {
    test('is called', () => {
      const onClick = jest.fn();
      const ref = React.createRef();
      act(() => {
        renderRootView(<Text onClick={onClick} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onClick).toBeCalled();
    });

    test('is still called if "onPress" is provided', () => {
      const onClick = jest.fn();
      const ref = React.createRef();
      act(() => {
        renderRootView(<Text onClick={onClick} onPress={() => {}} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onClick).toBeCalled();
    });
  });

  describe('prop "onFocus"', () => {
    test('is called', () => {
      const onFocus = jest.fn();
      const ref = React.createRef();
      act(() => {
        renderRootView(<Text onFocus={onFocus} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
      });
      expect(onFocus).toBeCalled();
    });
  });

  describe('prop "onPress"', () => {
    test('is called', () => {
      const onPress = jest.fn();
      const ref = React.createRef();
      act(() => {
        renderRootView(<Text onPress={onPress} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.pointerdown({ button: 0 });
        target.pointerup({ button: 0 });
      });
      expect(onPress).toBeCalled();
    });

    test('is not called if "onClick" is provided', () => {
      const onPress = jest.fn();
      const ref = React.createRef();
      act(() => {
        renderRootView(<Text onClick={() => {}} onPress={onPress} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.click();
      });
      expect(onPress).not.toBeCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = jest.fn();
      renderRootView(<Text ref={ref} />);
      expect(ref).toBeCalled();
    });

    test('is not called for prop changes', () => {
      const ref = jest.fn();
      let rerender;
      act(() => {
        ({ rerender } = renderRootView(
          <Text nativeID="123" ref={ref} style={{ borderWidth: 5 }} />
        ));
      });
      expect(ref).toHaveBeenCalledTimes(1);
      act(() => {
        rerender(<Text nativeID="1234" ref={ref} style={{ borderWidth: 6 }} />);
      });
      expect(ref).toHaveBeenCalledTimes(1);
    });

    test('node has imperative methods', () => {
      const ref = React.createRef();
      act(() => {
        renderRootView(<Text ref={ref} />);
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
      const { container } = renderRootView(<Text selectable={false} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('value of true', () => {
      const { container } = renderRootView(<Text selectable={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<Text style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = renderRootView(<Text testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
