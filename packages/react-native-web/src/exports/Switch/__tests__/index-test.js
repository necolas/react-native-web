/* eslint-env jasmine, jest */

import React from 'react';
import renderRootContext from '../../../vendor/renderRootContext';
import Switch from '..';

function findCheckbox(container) {
  return container.firstChild.querySelector('input');
}

describe('components/Switch', () => {
  test('accessibilityLabel is applied to native checkbox', () => {
    const { container } = renderRootContext(<Switch accessibilityLabel="switch" />);
    expect(findCheckbox(container).getAttribute('aria-label')).toBe('switch');
  });

  describe('disabled', () => {
    test('when "false" a default checkbox is rendered', () => {
      const { container } = renderRootContext(<Switch />);
      expect(findCheckbox(container).disabled).toBe(false);
    });

    test('when "true" a disabled checkbox is rendered', () => {
      const { container } = renderRootContext(<Switch disabled />);
      expect(findCheckbox(container).disabled).toBe(true);
    });
  });

  describe('onValueChange', () => {
    test('when value is "false" it receives "true"', () => {
      const onValueChange = jest.fn();
      const { container } = renderRootContext(
        <Switch onValueChange={onValueChange} value={false} />
      );
      const checkbox = findCheckbox(container);
      checkbox.click(); // Needed to get ReactDOM to trigger 'change' event
      expect(onValueChange).toHaveBeenCalledWith(true);
    });

    test('when value is "true" it receives "false"', () => {
      const onValueChange = jest.fn();
      const { container } = renderRootContext(<Switch onValueChange={onValueChange} value />);
      const checkbox = findCheckbox(container);
      checkbox.click(); // Needed to get ReactDOM to trigger 'change' event
      expect(onValueChange).toHaveBeenCalledWith(false);
    });
  });

  describe('value', () => {
    test('when "false" an unchecked checkbox is rendered', () => {
      const { container } = renderRootContext(<Switch value={false} />);
      expect(findCheckbox(container).checked).toBe(false);
    });

    test('when "true" a checked checkbox is rendered', () => {
      const { container } = renderRootContext(<Switch value />);
      expect(findCheckbox(container).checked).toBe(true);
    });
  });
});
