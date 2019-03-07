/* eslint-env jasmine, jest */

import React from 'react';
import { shallow } from 'enzyme';
import Picker from '..';

describe('components/Picker', () => {
  describe('prop "children"', () => {
    test('renders items', () => {
      const picker = (
        <Picker>
          <Picker.Item label="label-1" value="value-1" />
          <Picker.Item label="label-2" value="value-2" />
        </Picker>
      );
      const component = shallow(picker);
      expect(component.children()).toMatchSnapshot();
    });

    test('items', () => {
      const pickerItem = <Picker.Item label="label-1" value="value-1" />;
      const component = shallow(pickerItem);
      expect(component).toMatchSnapshot();
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
      const component = shallow(picker);
      expect(component.find('select').prop('disabled')).toBe(true);
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
      const component = shallow(picker);
      component.find('select').simulate('change', {
        target: { selectedIndex: '1', value: 'value-2' }
      });
      expect(onValueChange).toHaveBeenCalledWith('value-2', '1');
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
      const component = shallow(picker);
      expect(component.find('select').prop('value')).toBe('value-2');
    });

    test('selects the correct item (number)', () => {
      const picker = (
        <Picker selectedValue={22}>
          <Picker.Item label="label-1" value={11} />
          <Picker.Item label="label-2" value={22} />
        </Picker>
      );
      const component = shallow(picker);
      expect(component.find('select').prop('value')).toBe(22);
    });
  });
});
