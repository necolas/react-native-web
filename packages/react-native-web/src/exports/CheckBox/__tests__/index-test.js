/* eslint-env jest */

import CheckBox from '../';
import React from 'react';
import { render } from '@testing-library/react';

function findCheckbox(container) {
  return container.firstChild.querySelector('input');
}

describe('CheckBox', () => {
  describe('disabled', () => {
    test('when "false" a default checkbox is rendered', () => {
      const { container } = render(<CheckBox />);
      expect(findCheckbox(container).disabled).toBe(false);
    });

    test('when "true" a disabled checkbox is rendered', () => {
      const { container } = render(<CheckBox disabled />);
      expect(findCheckbox(container).disabled).toBe(true);
    });
  });

  describe('onChange', () => {
    test('is called with the event object', () => {
      const onChange = jest.fn();
      const { container } = render(<CheckBox onChange={onChange} value={false} />);
      const checkbox = findCheckbox(container);
      checkbox.click(); // Needed to get ReactDOM to trigger 'change' event
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('onValueChange', () => {
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

  describe('value', () => {
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
