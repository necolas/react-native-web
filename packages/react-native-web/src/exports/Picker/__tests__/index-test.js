/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import Picker from '..';

function findSelect(container) {
  return container.querySelector('select');
}

describe('components/Picker', () => {
  describe('prop "children"', () => {
    test('renders items', () => {
      const picker = (
        <Picker>
          <Picker.Item label="label-1" value="value-1" />
          <Picker.Item label="label-2" value="value-2" />
        </Picker>
      );
      const { container } = render(picker);
      expect(container.firstChild.firstChild).toMatchSnapshot();
    });

    test('items', () => {
      const pickerItem = <Picker.Item label="label-1" value="value-1" />;
      const { container } = render(pickerItem);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "enabled"', () => {
    test('picker is disabled if false', () => {
      const picker = (
        <Picker enabled={false}>
          <Picker.Item label="label-1" value="value-1" />
          <Picker.Item label="label-2" value="value-2" />
        </Picker>
      );
      const { container } = render(picker);
      expect(findSelect(container).disabled).toBe(true);
    });
  });

  describe('prop "onValueChange"', () => {
    test('is called with (value, index)', () => {
      const onValueChange = jest.fn();
      const picker = (
        <Picker onValueChange={onValueChange} selectedValue="value-1">
          <Picker.Item label="label-1" value="value-1" />
          <Picker.Item label="label-2" value="value-2" />
        </Picker>
      );
      const { container } = render(picker);
      const select = findSelect(container);
      // mock change event
      select.selectedIndex = '1';
      select.value = 'value-2';
      select.dispatchEvent(new window.Event('change', { bubbles: true }));

      expect(onValueChange).toHaveBeenCalledWith('value-2', 1);
    });
  });

  describe('prop "selectedValue"', () => {
    test('selects the correct item (string)', () => {
      const picker = (
        <Picker selectedValue="value-2">
          <Picker.Item label="label-1" value="value-1" />
          <Picker.Item label="label-2" value="value-2" />
        </Picker>
      );
      const { container } = render(picker);
      expect(findSelect(container).value).toBe('value-2');
    });

    test('selects the correct item (number)', () => {
      const picker = (
        <Picker selectedValue={22}>
          <Picker.Item label="label-1" value={11} />
          <Picker.Item label="label-2" value={22} />
        </Picker>
      );
      const { container } = render(picker);
      expect(findSelect(container).value).toBe('22');
    });
  });
});
