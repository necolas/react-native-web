/* eslint-env jasmine, jest */

import React from 'react';
import ScrollView from '..';
import StyleSheet from '../../StyleSheet';
import View from '../../View';
import { mount, shallow } from 'enzyme';

describe('components/ScrollView', () => {
  test('instance method setNativeProps', () => {
    const instance = mount(<ScrollView />).instance();
    expect(() => {
      instance.setNativeProps();
    }).not.toThrow();
  });

  test('"children" prop', () => {
    const component = shallow(
      <ScrollView>
        <View testID="child" />
      </ScrollView>
    );
    expect(component.find({ testID: 'child' }).length).toBe(1);

    component.setProps({ stickyHeaderIndices: [4] });
    expect(component.find({ testID: 'child' }).length).toBe(1);

    component.setProps({ pagingEnabled: true });
    expect(component.find({ testID: 'child' }).length).toBe(1);
  });

  test('"pagingEnabled" prop', () => {
    const getStyleProp = (component, prop) => StyleSheet.flatten(component.prop('style'))[prop];

    // false
    const component = shallow(<ScrollView children={'Child'} />);
    expect(getStyleProp(component, 'scrollSnapType')).toMatchSnapshot();

    // true
    component.setProps({ pagingEnabled: true });
    expect(getStyleProp(component, 'scrollSnapType')).toMatchSnapshot();
    expect(getStyleProp(component.children().childAt(0), 'scrollSnapAlign')).toMatchSnapshot();
  });
});
