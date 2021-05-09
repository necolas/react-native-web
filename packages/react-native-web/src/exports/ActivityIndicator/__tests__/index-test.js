/* eslint-env jasmine, jest */

import ActivityIndicator from '..';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import { render } from '@testing-library/react';

describe('components/ActivityIndicator', () => {
  describe('prop "accessibilityLabel"', () => {
    test('value is set', () => {
      const { container } = render(<ActivityIndicator accessibilityLabel="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "accessibilityLiveRegion"', () => {
    test('value is set', () => {
      const { container } = render(<ActivityIndicator accessibilityLiveRegion="polite" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "animating"', () => {
    test('is "true"', () => {
      const { container } = render(<ActivityIndicator animating={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is "false"', () => {
      const { container } = render(<ActivityIndicator animating={false} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "color"', () => {
    const { container } = render(<ActivityIndicator color="red" />);
    const svg = container.firstChild.querySelector('svg');
    expect(svg).toMatchSnapshot();
  });

  describe('prop "dataSet"', () => {
    test('value is set', () => {
      const { container } = render(<ActivityIndicator dataSet={{ one: 'one', two: 'two' }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "hidesWhenStopped"', () => {
    test('is "true"', () => {
      const { container } = render(<ActivityIndicator animating={false} hidesWhenStopped={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is "false"', () => {
      const { container } = render(
        <ActivityIndicator animating={false} hidesWhenStopped={false} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = render(<ActivityIndicator nativeID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<ActivityIndicator onBlur={onBlur} ref={ref} />);
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
        render(<ActivityIndicator onFocus={onFocus} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
      });
      expect(onFocus).toBeCalled();
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = jest.fn();
      render(<ActivityIndicator ref={ref} />);
      expect(ref).toBeCalled();
    });
  });

  describe('prop "size"', () => {
    test('is "large"', () => {
      const { container } = render(<ActivityIndicator size="large" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is a number', () => {
      const { container } = render(<ActivityIndicator size={30} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = render(<ActivityIndicator style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = render(<ActivityIndicator testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
