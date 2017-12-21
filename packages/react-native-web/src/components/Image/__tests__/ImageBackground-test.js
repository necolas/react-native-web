/* eslint-env jasmine, jest */

import Image from '..';
import ImageBackground from '../ImageBackground';
import React from 'react';
import { shallow } from 'enzyme';
import Text from '../../Text';

describe('components/ImageBackground', () => {
  describe('prop "children"', () => {
    it('render child content', () => {
      const component = shallow(
        <ImageBackground>
          <Text>Hello World!</Text>
        </ImageBackground>
      );
      expect(component.find(Text)).toBeDefined();
    });
  });

  describe('prop "imageStyle"', () => {
    it('sets the style of the underlying Image', () => {
      const imageStyle = { width: 40, height: 60 };
      const component = shallow(<ImageBackground imageStyle={imageStyle} />);
      expect(component.find(Image).prop('style')).toContain(imageStyle);
    });
  });

  describe('prop "style"', () => {
    it('sets the style of the container View', () => {
      const style = { margin: 40 };
      const component = shallow(<ImageBackground style={style} />);
      expect(component.prop('style')).toEqual(style);
    });
  });
});
