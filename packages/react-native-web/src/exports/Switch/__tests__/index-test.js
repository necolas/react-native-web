/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import Switch from '..';

function findCheckbox(container) {
  return container.firstChild.querySelector('input');
}

function findSwitchTrack(container) {
  return container.firstChild.querySelector('div');
}

function findSwitchThumb(container) {
  return container.firstChild.childNodes[1];
}

describe('components/Switch', () => {
  test('accessibilityLabel is applied to native checkbox', () => {
    const { container } = render(<Switch aria-label="switch" />);
    expect(findCheckbox(container).getAttribute('aria-label')).toBe('switch');
  });

  describe('disabled', () => {
    test('when "false" a default checkbox is rendered', () => {
      const { container } = render(<Switch />);
      expect(findCheckbox(container).disabled).toBe(false);
    });

    test('when "true" a disabled checkbox is rendered', () => {
      const { container } = render(<Switch disabled />);
      expect(findCheckbox(container).disabled).toBe(true);
    });

    test('when "true" and value="true", a disabled checkbox is rendered with provided activeTrackColor', () => {
      const { container } = render(
        <Switch activeTrackColor="#E0245E" disabled value={true} />
      );
      expect(findSwitchTrack(container)).toMatchSnapshot();
    });

    test('when "true" and value="true", a disabled checkbox is rendered with provided activeThumbColor', () => {
      const { container } = render(
        <Switch activeThumbColor="#fff" disabled value={true} />
      );
      expect(findSwitchThumb(container)).toMatchSnapshot();
    });

    test('when "true" and value="false", a disabled checkbox is rendered with provided trackColor', () => {
      const { container } = render(
        <Switch disabled trackColor="#E0245E" value={false} />
      );
      expect(findSwitchTrack(container)).toMatchSnapshot();
    });

    test('when "true" and value="false", a disabled checkbox is rendered with provided thumbColor', () => {
      const { container } = render(
        <Switch disabled thumbColor="#fff" value={false} />
      );
      expect(findSwitchThumb(container)).toMatchSnapshot();
    });

    test('when "true" and value="true", a disabled checkbox is rendered with provided true value of trackColor', () => {
      const { container } = render(
        <Switch
          disabled={true}
          trackColor={{ true: '#E0245E', false: '#1DA1F2' }}
          value={true}
        />
      );
      expect(findSwitchTrack(container)).toMatchSnapshot();
    });

    test('when "true" and value="false", a disabled checkbox is rendered with provided false value of trackColor', () => {
      const { container } = render(
        <Switch
          disabled={true}
          trackColor={{ true: '#E0245E', false: '#1DA1F2' }}
          value={false}
        />
      );
      expect(findSwitchTrack(container)).toMatchSnapshot();
    });
  });

  describe('onValueChange', () => {
    test('when value is "false" it receives "true"', () => {
      const onValueChange = jest.fn();
      const { container } = render(
        <Switch onValueChange={onValueChange} value={false} />
      );
      const checkbox = findCheckbox(container);
      checkbox.click(); // Needed to get ReactDOM to trigger 'change' event
      expect(onValueChange).toHaveBeenCalledWith(true);
    });

    test('when value is "true" it receives "false"', () => {
      const onValueChange = jest.fn();
      const { container } = render(
        <Switch onValueChange={onValueChange} value />
      );
      const checkbox = findCheckbox(container);
      checkbox.click(); // Needed to get ReactDOM to trigger 'change' event
      expect(onValueChange).toHaveBeenCalledWith(false);
    });
  });

  describe('value', () => {
    test('when "false" an unchecked checkbox is rendered', () => {
      const { container } = render(<Switch value={false} />);
      expect(findCheckbox(container).checked).toBe(false);
    });

    test('when "true" a checked checkbox is rendered', () => {
      const { container } = render(<Switch value />);
      expect(findCheckbox(container).checked).toBe(true);
    });
  });
});
