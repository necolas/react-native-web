/* eslint-env jasmine, jest */

import React from 'react';
import Text from '../';
import { mount, shallow } from 'enzyme';

describe('components/Text', () => {
  it('prop "children"', () => {
    const children = 'children';
    const text = shallow(<Text>{children}</Text>);
    expect(text.prop('children')).toEqual(children);
  });

  it('prop "numberOfLines"');

  it('prop "onLayout"', (done) => {
    mount(<Text onLayout={onLayout} />);
    function onLayout(e) {
      const { layout } = e.nativeEvent;
      expect(layout).toEqual({ x: 0, y: 0, width: 0, height: 0 });
      done();
    }
  });

  it('prop "onPress"', (done) => {
    const text = mount(<Text onPress={onPress} />);
    text.simulate('click');
    function onPress(e) {
      expect(e.nativeEvent).toBeTruthy();
      done();
    }
  });

  it('prop "selectable"', () => {
    let text = shallow(<Text />);
    expect(text.prop('style').userSelect).toEqual(undefined);
    text = shallow(<Text selectable={false} />);
    expect(text.prop('style').userSelect).toEqual('none');
  });
});
