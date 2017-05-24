/* eslint-env jasmine, jest */

import React from 'react';
import { render, shallow } from 'enzyme';
import Switch from '..';

describe('components/Switch', () => {
  describe('disabled', () => {
    test('when "false" a default checkbox is rendered', () => {
      const component = render(<Switch />);
      expect(component).toMatchSnapshot();
    });

    test('when "true" a disabled checkbox is rendered', () => {
      const component = render(<Switch disabled />);
      expect(component).toMatchSnapshot();
    });
  });

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

  describe('value', () => {
    test('when "false" an unchecked checkbox is rendered', () => {
      const component = render(<Switch value={false} />);
      expect(component).toMatchSnapshot();
    });

    test('when "true" a checked checkbox is rendered', () => {
      const component = render(<Switch value />);
      expect(component).toMatchSnapshot();
    });
  });

  // TODO: testing the grey circle
  // describe('grey circle', () => {
  //   const thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';
  //   const thumbFocusedBoxShadow = `${thumbDefaultBoxShadow}, 0 0 0 10px rgba(0,0,0,0.1)`;

  //   test('it should show grey circle when user touch / clicks', () => {
  //     const component = shallow(<Switch value={false} />);
  //     component.find('input').simulate('click');

  //     const style = component.props().children[1];
  //     console.log(style);
  //   });

  //   test('it should dismiss grey circle immediately', () => {

  //   });
  // });
});
