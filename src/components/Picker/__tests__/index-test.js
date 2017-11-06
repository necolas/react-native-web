/* eslint-env jasmine, jest */

import React from 'react';
import { shallow } from 'enzyme';
import Picker from '..';

describe('components/Picker', () => {
  describe('children', () => {
    test('when contains options, renders a select element with options', () => {
      const pickerWithItems = (
        <Picker>
          <Picker.Item label="Superman" value="1" />
          <Picker.Item label="Wonder Woman" value="2" />
        </Picker>
      );
      const component = shallow(pickerWithItems);
      expect(component).toMatchSnapshot();
    });
  });

  describe('onValueChange', () => {
    test('when changed, event is fired with (value, index)', () => {
      const onValueChange = jest.fn();
      const picker = (
        <Picker onValueChange={onValueChange} selectedValue="1">
          <Picker.Item label="Superman" value="1" />
          <Picker.Item label="Wonder Woman" value="2" />
        </Picker>
      );
      const component = shallow(picker);
      component.find('select').simulate('change', {
        target: { selectedIndex: '1', value: '2' }
      });
      expect(onValueChange).toHaveBeenCalledWith('2', '1');
    });
  });

  describe('selectedValue', () => {
    test('when "2":string, item is selected', () => {
      const pickerWithSelection = (
        <Picker selectedValue="2">
          <Picker.Item label="Superman" value="1" />
          <Picker.Item label="Wonder Woman" value="2" />
        </Picker>
      );
      const component = shallow(pickerWithSelection);
      expect(component.find('select').prop('value')).toBe('2');
    });
    test('when 2:number, item is selected', () => {
      const pickerWithNumberSelection = (
        <Picker selectedValue={2}>
          <Picker.Item label="Superman" value={1} />
          <Picker.Item label="Wonder Woman" value={2} />
        </Picker>
      );
      const component = shallow(pickerWithNumberSelection);
      expect(component.find('select').prop('value')).toBe(2);
    });
  });

  describe('onValueChange', () => {
    test('when changed, event is fired with (value, index)', () => {
      const onValueChange = jest.fn();
      const picker = (
        <Picker onValueChange={onValueChange} selectedValue="1">
          <Picker.Item label="Superman" value="1" />
          <Picker.Item label="Wonder Woman" value="2" />
        </Picker>
      );
      const component = shallow(picker);
      component.find('select').simulate('change', {
        target: { selectedIndex: '1', value: '2' }
      });
      expect(onValueChange).toHaveBeenCalledWith('2', '1');
    });
  });
});
