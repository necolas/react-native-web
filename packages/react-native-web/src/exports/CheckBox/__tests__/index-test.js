/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CheckBox from '../';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { createEventTarget } from 'dom-event-testing-library';
import { render } from '@testing-library/react';

function findCheckbox(container) {
  return container.firstChild.querySelector('input');
}

describe('CheckBox', () => {
  describe('prop "accessibilityLabel"', () => {
    test('value is set', () => {
      const { container } = render(<CheckBox accessibilityLabel="accessibility label" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "color"', () => {
    test('value is set', () => {
      const { container } = render(<CheckBox color="lightblue" value={true} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "dataSet"', () => {
    test('value is set', () => {
      const { container } = render(<CheckBox dataSet={{ one: 'one', two: 'two' }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "disabled"', () => {
    test('when "false" a default checkbox is rendered', () => {
      const { container } = render(<CheckBox />);
      expect(findCheckbox(container).disabled).toBe(false);
    });

    test('when "true" a disabled checkbox is rendered', () => {
      const { container } = render(<CheckBox disabled />);
      expect(findCheckbox(container).disabled).toBe(true);
    });
  });

  describe('prop "nativeID"', () => {
    test('value is set', () => {
      const { container } = render(<CheckBox nativeID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onBlur"', () => {
    test('is called', () => {
      const onBlur = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<CheckBox onBlur={onBlur} ref={ref} />);
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

  describe('prop "onChange"', () => {
    test('is called with the event object', () => {
      const onChange = jest.fn();
      const { container } = render(<CheckBox onChange={onChange} value={false} />);
      const checkbox = findCheckbox(container);
      checkbox.click(); // Needed to get ReactDOM to trigger 'change' event
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('prop "onFocus"', () => {
    test('is called', () => {
      const onFocus = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(<CheckBox onFocus={onFocus} ref={ref} />);
      });
      const target = createEventTarget(ref.current);
      act(() => {
        target.focus();
      });
      expect(onFocus).toBeCalled();
    });
  });

  describe('prop "onValueChange"', () => {
    test('when value is "false" it receives "true"', () => {
      const onValueChange = jest.fn();
      const { container } = render(<CheckBox onValueChange={onValueChange} value={false} />);
      const checkbox = findCheckbox(container);
      checkbox.click(); // Needed to get ReactDOM to trigger 'change' event
      expect(onValueChange).toHaveBeenCalledWith(true);
    });

    test('when value is "true" it receives "false"', () => {
      const onValueChange = jest.fn();
      const { container } = render(<CheckBox onValueChange={onValueChange} value />);
      const checkbox = findCheckbox(container);
      checkbox.click(); // Needed to get ReactDOM to trigger 'change' event
      expect(onValueChange).toHaveBeenCalledWith(false);
    });
  });

  describe('prop "ref"', () => {
    test('value is set', () => {
      const ref = jest.fn();
      render(<CheckBox ref={ref} />);
      expect(ref).toBeCalled();
    });
  });

  describe('prop "style"', () => {
    test('value is set', () => {
      const { container } = render(<CheckBox style={{ borderWidth: 5 }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "testID"', () => {
    test('value is set', () => {
      const { container } = render(<CheckBox testID="123" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "value"', () => {
    test('when "false" an unchecked checkbox is rendered', () => {
      const { container } = render(<CheckBox value={false} />);
      expect(findCheckbox(container).checked).toBe(false);
    });

    test('when "true" a checked checkbox is rendered', () => {
      const { container } = render(<CheckBox value />);
      expect(findCheckbox(container).checked).toBe(true);
    });
  });
});
