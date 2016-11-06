/* eslint-env jasmine, jest */

import React from 'react';
import { shallow } from 'enzyme';
import Switch from '..';

describe('components/Switch', () => {
  describe('disabled', () => {
    it('when "false" a default checkbox is rendered', () => {
      const component = shallow(<Switch />);
      expect(component.find('input').length === 1).toBeTruthy();
    });

    it('when "true" a disabled checkbox is rendered', () => {
      const component = shallow(<Switch disabled />);
      expect(component.find('input').prop('disabled') === true).toBeTruthy();
    });
  });

  describe('onValueChange', () => {
    it('when value is "false" it receives "true"', () => {
      const handleValueChange = (value) => expect(value === true).toBeTruthy();
      const component = shallow(<Switch onValueChange={handleValueChange} value={false} />);
      component.find('input').simulate('click');
    });

    it('when value is "true" it receives "false"', () => {
      const handleValueChange = (value) => expect(value === false).toBeTruthy();
      const component = shallow(<Switch onValueChange={handleValueChange} value />);
      component.find('input').simulate('click');
    });
  });

  describe('value', () => {
    it('when "false" an unchecked checkbox is rendered', () => {
      const component = shallow(<Switch value={false} />);
      expect(component.find('input').prop('checked') === false).toBeTruthy();
    });

    it('when "true" a checked checkbox is rendered', () => {
      const component = shallow(<Switch value />);
      expect(component.find('input').prop('checked') === true).toBeTruthy();
    });
  });
});
