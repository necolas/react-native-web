/* eslint-env jest */

import CheckBox from '../';
import React from 'react';
import { shallow } from 'enzyme';

const checkboxSelector = 'input[type="checkbox"]';

describe('CheckBox', () => {
  describe('disabled', () => {
    test('when "false" a default checkbox is rendered', () => {
      const component = shallow(<CheckBox />);
      expect(component.find(checkboxSelector).prop('disabled')).toBe(undefined);
    });

    test('when "true" a disabled checkbox is rendered', () => {
      const component = shallow(<CheckBox disabled />);
      expect(component.find(checkboxSelector).prop('disabled')).toBe(true);
    });
  });

  describe('onChange', () => {
    test('is called with the event object', () => {
      const onChange = jest.fn();
      const component = shallow(<CheckBox onChange={onChange} value={false} />);
      component.find('input').simulate('change', { nativeEvent: { target: { checked: true } } });
      expect(onChange).toHaveBeenCalledWith({
        nativeEvent: { target: { checked: true }, value: true }
      });
    });
  });

  describe('onValueChange', () => {
    test('when value is "false" it receives "true"', () => {
      const onValueChange = jest.fn();
      const component = shallow(<CheckBox onValueChange={onValueChange} value={false} />);
      component.find('input').simulate('change', { nativeEvent: { target: { checked: true } } });
      expect(onValueChange).toHaveBeenCalledWith(true);
    });

    test('when value is "true" it receives "false"', () => {
      const onValueChange = jest.fn();
      const component = shallow(<CheckBox onValueChange={onValueChange} value />);
      component.find('input').simulate('change', { nativeEvent: { target: { checked: false } } });
      expect(onValueChange).toHaveBeenCalledWith(false);
    });
  });

  describe('value', () => {
    test('when "false" an unchecked checkbox is rendered', () => {
      const component = shallow(<CheckBox value={false} />);
      expect(component.find(checkboxSelector).prop('checked')).toBe(false);
    });

    test('when "true" a checked checkbox is rendered', () => {
      const component = shallow(<CheckBox value />);
      expect(component.find(checkboxSelector).prop('checked')).toBe(true);
    });
  });

  describe('name', () => {
    test('when value is set it exposes name', () => {
      const component = shallow(<CheckBox name="testName" />);
      expect(component.find(checkboxSelector).prop('name')).toBe('testName');
    });
  });
});
