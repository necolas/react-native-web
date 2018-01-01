/* eslint-env jasmine, jest */

import ActivityIndicator from '..';
import React from 'react';
import { shallow } from 'enzyme';

describe('components/ActivityIndicator', () => {
  describe('prop "animating"', () => {
    test('is "true"', () => {
      const component = shallow(<ActivityIndicator animating={true} />);
      expect(component).toMatchSnapshot();
    });

    test('is "false"', () => {
      const component = shallow(<ActivityIndicator animating={false} />);
      expect(component).toMatchSnapshot();
    });
  });

  test('prop "color"', () => {
    const component = shallow(<ActivityIndicator color="red" />).find('svg');
    expect(component).toMatchSnapshot();
  });

  describe('prop "hidesWhenStopped"', () => {
    test('is "true"', () => {
      const component = shallow(<ActivityIndicator animating={false} hidesWhenStopped={true} />);
      expect(component).toMatchSnapshot();
    });

    test('is "false"', () => {
      const component = shallow(<ActivityIndicator animating={false} hidesWhenStopped={false} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('prop "size"', () => {
    test('is "large"', () => {
      const component = shallow(<ActivityIndicator size="large" />);
      expect(component).toMatchSnapshot();
    });

    test('is a number', () => {
      const component = shallow(<ActivityIndicator size={30} />);
      expect(component).toMatchSnapshot();
    });
  });
});
