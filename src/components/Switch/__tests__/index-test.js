/* eslint-env jasmine, jest */

import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import Switch from '..';

jest.mock('react-dom');

describe('components/Switch', () => {
  describe('disabled', () => {
    test('when "false" a default checkbox is rendered', () => {
      const component = renderer.create(<Switch />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    test('when "true" a disabled checkbox is rendered', () => {
      const component = renderer.create(<Switch disabled />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  /*
  describe('onValueChange', () => {
    test('when value is "false" it receives "true"', () => {
      const handleValueChange = (value) => expect(value === true).toBeTruthy();
      const component = shallow(<Switch onValueChange={handleValueChange} value={false} />);
      component.find('input').simulate('click');
    });

    test('when value is "true" it receives "false"', () => {
      const handleValueChange = (value) => expect(value === false).toBeTruthy();
      const component = shallow(<Switch onValueChange={handleValueChange} value />);
      component.find('input').simulate('click');
    });
  });
  */

  describe('value', () => {
    test('when "false" an unchecked checkbox is rendered', () => {
      const component = renderer.create(<Switch value={false} />);
      expect(component.toJSON()).toMatchSnapshot();
    });

    test('when "true" a checked checkbox is rendered', () => {
      const component = renderer.create(<Switch value />);
      expect(component.toJSON()).toMatchSnapshot();
    });
  });
});
