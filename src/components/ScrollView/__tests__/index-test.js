/* eslint-env jasmine, jest */

import React from 'react';
import ScrollView from '..';
import { mount } from 'enzyme';

describe('components/ScrollView', () => {
  test('instance method setNativeProps', () => {
    const instance = mount(<ScrollView />).instance();
    expect(() => {
      instance.setNativeProps();
    }).not.toThrow();
  });
});
