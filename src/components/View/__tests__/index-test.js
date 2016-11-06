/* eslint-env jasmine, jest */

import includes from 'lodash/includes';
import React from 'react';
import View from '../';
import { mount, shallow } from 'enzyme';

describe('components/View', () => {
  describe('rendered element', () => {
    it('is a "div" by default', () => {
      const view = shallow(<View />);
      expect(view.is('div')).toEqual(true);
    });

    it('is a "span" when inside <View accessibilityRole="button" />', () => {
      const view = mount(<View accessibilityRole='button'><View /></View>);
      expect(view.find('span').length).toEqual(1);
    });
  });

  it('prop "children"', () => {
    const children = <View testID='1' />;
    const view = shallow(<View>{children}</View>);
    expect(view.prop('children')).toEqual(children);
  });

  it('prop "onLayout"', (done) => {
    mount(<View onLayout={onLayout} />);
    function onLayout(e) {
      const { layout } = e.nativeEvent;
      expect(layout).toEqual({ x: 0, y: 0, width: 0, height: 0 });
      done();
    }
  });

  it('prop "pointerEvents"', () => {
    const view = shallow(<View pointerEvents='box-only' />);
    expect(includes(view.prop('className'), '__style_pebo') === true).toBeTruthy();
  });

  it('prop "style"', () => {
    const view = shallow(<View />);
    expect(view.prop('style').flexShrink).toEqual(0);

    const flexView = shallow(<View style={{ flex: 1 }} />);
    expect(flexView.prop('style').flexShrink).toEqual(1);

    const flexShrinkView = shallow(<View style={{ flexShrink: 1 }} />);
    expect(flexShrinkView.prop('style').flexShrink).toEqual(1);

    const flexAndShrinkView = shallow(<View style={{ flex: 1, flexShrink: 2 }} />);
    expect(flexAndShrinkView.prop('style').flexShrink).toEqual(2);
  });
});
