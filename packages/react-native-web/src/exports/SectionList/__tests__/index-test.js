/* eslint-env jasmine, jest */

import React from 'react';
import SectionList from '..';
import { mount } from 'enzyme';

describe('components/SectionList', () => {
  test('instance method setNativeProps', () => {
    const instance = mount(<SectionList sections={[]} />).instance();
    expect(() => {
      instance.setNativeProps();
    }).not.toThrow();
  });
});
