/* eslint-env mocha */

import assert from 'assert';
import React from 'react';
import { shallow } from 'enzyme';
import Switch from '..';

suite('components/Switch', () => {
  suite('disabled', () => {
    test('when "false" a default checkbox is rendered', () => {
      const component = shallow(<Switch />);
      assert(component.find('input').length === 1);
    });

    test('when "true" a disabled checkbox is rendered', () => {
      const component = shallow(<Switch disabled />);
      assert(component.find('input').prop('disabled') === true);
    });
  });

  suite('onValueChange', () => {
    test('when value is "false" it receives "true"', () => {
      const handleValueChange = (value) => assert(value === true);
      const component = shallow(<Switch onValueChange={handleValueChange} value={false} />);
      component.find('input').simulate('click');
    });

    test('when value is "true" it receives "false"', () => {
      const handleValueChange = (value) => assert(value === false);
      const component = shallow(<Switch onValueChange={handleValueChange} value />);
      component.find('input').simulate('click');
    });
  });

  suite('value', () => {
    test('when "false" an unchecked checkbox is rendered', () => {
      const component = shallow(<Switch value={false} />);
      assert(component.find('input').prop('checked') === false);
    });

    test('when "true" a checked checkbox is rendered', () => {
      const component = shallow(<Switch value />);
      assert(component.find('input').prop('checked') === true);
    });
  });
});
