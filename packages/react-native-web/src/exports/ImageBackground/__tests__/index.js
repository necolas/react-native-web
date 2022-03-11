/* eslint-env jasmine, jest */

import ImageBackground from '..';
import React from 'react';
import renderRootView from '../../../exports/AppRegistry/renderRootView';
import Text from '../../Text';

function findImage(container) {
  return container.firstChild.firstChild;
}

describe('components/ImageBackground', () => {
  describe('prop "children"', () => {
    test('render child content', () => {
      const { getByText } = renderRootView(
        <ImageBackground>
          <Text>Hello World!</Text>
        </ImageBackground>
      );
      expect(getByText('Hello World!')).toBeDefined();
    });
  });

  describe('prop "imageStyle"', () => {
    test('sets the style of the underlying Image', () => {
      const imageStyle = { width: 40, height: 60 };
      const { container } = renderRootView(<ImageBackground imageStyle={imageStyle} />);
      expect(findImage(container).getAttribute('style')).toBe('height: 60px; width: 40px;');
    });
  });

  describe('prop "style"', () => {
    test('sets the style of the container View', () => {
      const style = { margin: 40 };
      const { container } = renderRootView(<ImageBackground style={style} />);
      expect(container.firstChild.getAttribute('style')).toEqual('margin: 40px 40px 40px 40px;');
    });
  });
});
