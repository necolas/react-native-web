/* eslint-env jasmine, jest */

import React from 'react';
import { shallow } from 'enzyme';
import Slider from '..';

describe('components/Slider', () => {
  describe('value', () => {
    test('default value', () => {
      const component = shallow(<Slider />);
      expect(component.state().value.__getValue()).toBe(0);
    });

    test('value from component props', () => {
      const component = shallow(<Slider value={0.5} />);
      expect(component.state().value.__getValue()).toBe(0.5);
    })
  });

  describe('trackTintColor', () => {
    test('maximumTrackTintColor', () => {
      const component = shallow(<Slider maximumTrackTintColor={'#F45D22'}/>);
      expect(component).toMatchSnapshot();
    });

    test('minimumTrackTintColor', () => {
      const component = shallow(<Slider maximumTrackTintColor={'#794BC4'}/>);
      expect(component).toMatchSnapshot();
    })
  });

  describe('step', () => {
    test('maximumValue: "10", step: "2", value: "4"', () => {
      const component = shallow(<Slider maximumValue={10} step={2} value={4} />);
      expect(component).toMatchSnapshot();
    })
  })
});
