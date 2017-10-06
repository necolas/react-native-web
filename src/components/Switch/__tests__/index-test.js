/* eslint-env jasmine, jest */

import React from 'react';
import { shallow } from 'enzyme';
import Switch from '..';

const checkboxSelector = 'input[type="checkbox"]';

describe('components/Switch', () => {
  describe('disabled', () => {
    test('when "false" a default checkbox is rendered', () => {
      const component = shallow(<Switch />);
      expect(component.find(checkboxSelector).prop('disabled')).toBe(false);
    });

    test('when "true" a disabled checkbox is rendered', () => {
      const component = shallow(<Switch disabled />);
      expect(component.find(checkboxSelector).prop('disabled')).toBe(true);
    });
  });

  describe('onValueChange', () => {
    test('when value is "false" it receives "true"', () => {
      const onValueChange = jest.fn();
      const component = shallow(<Switch onValueChange={onValueChange} value={false} />);
      component.find('input').simulate('change', { nativeEvent: { target: { checked: true } } });
      expect(onValueChange).toHaveBeenCalledWith(true);
    });

    test('when value is "true" it receives "false"', () => {
      const onValueChange = jest.fn();
      const component = shallow(<Switch onValueChange={onValueChange} value />);
      component.find('input').simulate('change', { nativeEvent: { target: { checked: false } } });
      expect(onValueChange).toHaveBeenCalledWith(false);
    });
  });

  describe('value', () => {
    test('when "false" an unchecked checkbox is rendered', () => {
      const component = shallow(<Switch value={false} />);
      expect(component.find(checkboxSelector).prop('checked')).toBe(false);
    });

    test('when "true" a checked checkbox is rendered', () => {
      const component = shallow(<Switch value />);
      expect(component.find(checkboxSelector).prop('checked')).toBe(true);
    });
  });
});
