/* eslint-env jasmine, jest */

import React from 'react';
import { shallow } from 'enzyme';
import ImageBackground from '../ImageBackground';
import Text from '../../Text';

describe('components/ImageBackground', () => {
  describe('style', () => {
    it('sets the style of the container View', () => {
      const style = { margin: 40 };
      const component = shallow(<ImageBackground style={style} />);
      expect(component.prop('style')).toEqual(style);
    });
  });
  describe('imageStyle', () => {
    it('sets the style of the underlying Image', () => {
      const imageStyle = { width: 40, height: 60 };
      const component = shallow(<ImageBackground imageStyle={imageStyle} />);
      expect(component.find('Image').prop('style')).toContain(imageStyle);
    });
  });
  describe('children', () => {
    it('contains children', () => {
      const component = shallow(
        <ImageBackground>
          <Text>Hello World!</Text>
        </ImageBackground>
      );
      expect(component.find('Text')).toBeDefined();
    });
  });
});
