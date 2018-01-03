/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import Image from '../';
import ImageLoader from '../../../modules/ImageLoader';
import ImageUriCache from '../ImageUriCache';
import React from 'react';
import { mount, shallow } from 'enzyme';

const originalImage = window.Image;

describe('components/Image', () => {
  beforeEach(() => {
    window.Image = jest.fn(() => ({}));
  });

  afterEach(() => {
    window.Image = originalImage;
  });

  test('prop "accessibilityLabel"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const component = shallow(
      <Image accessibilityLabel="accessibilityLabel" defaultSource={defaultSource} />
    );
    const img = component.find('img');
    expect(component.prop('accessibilityLabel')).toBe('accessibilityLabel');
    expect(img.prop('alt')).toBe('accessibilityLabel');
  });

  test('prop "accessible"', () => {
    const component = shallow(<Image accessible={false} />);
    expect(component.prop('accessible')).toBe(false);
  });

  describe('prop "defaultSource"', () => {
    test('sets background image when value is an object', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const component = shallow(<Image defaultSource={defaultSource} />);
      expect(component.prop('style').backgroundImage).toMatchSnapshot();
    });

    test('sets background image when value is a string', () => {
      // emulate require-ed asset
      const defaultSource = 'https://google.com/favicon.ico';
      const component = shallow(<Image defaultSource={defaultSource} />);
      expect(component.prop('style').backgroundImage).toMatchSnapshot();
    });

    test('sets "height" and "width" styles if missing', () => {
      const defaultSource = {
        uri: 'https://google.com/favicon.ico',
        height: 10,
        width: 20
      };
      const component = shallow(<Image defaultSource={defaultSource} />);
      const { height, width } = component.prop('style');
      expect(height).toBe(10);
      expect(width).toBe(20);
    });

    test('does not override "height" and "width" styles', () => {
      const defaultSource = {
        uri: 'https://google.com/favicon.ico',
        height: 10,
        width: 20
      };
      const component = shallow(
        <Image defaultSource={defaultSource} style={{ height: 20, width: 40 }} />
      );
      const { height, width } = component.prop('style');
      expect(height).toBe(20);
      expect(width).toBe(40);
    });
  });

  test('prop "draggable"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const component = shallow(<Image defaultSource={defaultSource} />);
    expect(component.find('img').prop('draggable')).toBeUndefined();
    component.setProps({ defaultSource, draggable: false });
    expect(component.find('img').prop('draggable')).toBe(false);
  });

  describe('prop "onLoad"', () => {
    test('is called after image is loaded from network', () => {
      jest.useFakeTimers();
      ImageLoader.load = jest.fn().mockImplementation((_, onLoad, onError) => {
        onLoad();
      });
      const onLoadStub = jest.fn();
      shallow(<Image onLoad={onLoadStub} source="https://test.com/img.jpg" />);
      jest.runOnlyPendingTimers();
      expect(ImageLoader.load).toBeCalled();
      expect(onLoadStub).toBeCalled();
    });

    test('is called after image is loaded from cache', () => {
      jest.useFakeTimers();
      ImageLoader.load = jest.fn().mockImplementation((_, onLoad, onError) => {
        onLoad();
      });
      const onLoadStub = jest.fn();
      const uri = 'https://test.com/img.jpg';
      shallow(<Image onLoad={onLoadStub} source={uri} />);
      ImageUriCache.add(uri);
      jest.runOnlyPendingTimers();
      expect(ImageLoader.load).not.toBeCalled();
      expect(onLoadStub).toBeCalled();
      ImageUriCache.remove(uri);
    });

    test('is called on update if "uri" is different', () => {
      jest.useFakeTimers();
      const onLoadStub = jest.fn();
      const uri = 'https://test.com/img.jpg';
      const component = mount(<Image onLoad={onLoadStub} source={uri} />);
      component.setProps({ source: 'https://blah.com/img.png' });
      jest.runOnlyPendingTimers();
      expect(onLoadStub.mock.calls.length).toBe(2);
    });

    test('is not called on update if "uri" is the same', () => {
      jest.useFakeTimers();
      const onLoadStub = jest.fn();
      const uri = 'https://test.com/img.jpg';
      const component = mount(<Image onLoad={onLoadStub} source={uri} />);
      component.setProps({ resizeMode: 'stretch' });
      jest.runOnlyPendingTimers();
      expect(onLoadStub.mock.calls.length).toBe(1);
    });
  });

  describe('prop "resizeMode"', () => {
    [
      Image.resizeMode.contain,
      Image.resizeMode.cover,
      Image.resizeMode.none,
      Image.resizeMode.stretch,
      undefined
    ].forEach(resizeMode => {
      test(`value "${resizeMode}"`, () => {
        const component = shallow(<Image resizeMode={resizeMode} />);
        expect(component.prop('style').backgroundSize).toMatchSnapshot();
      });
    });
  });

  describe('prop "source"', () => {
    test('is not set immediately if the image has not already been loaded', () => {
      const uri = 'https://google.com/favicon.ico';
      const source = { uri };
      const component = shallow(<Image source={source} />);
      expect(component.find('img')).toBeUndefined;
    });

    test('is set immediately if the image has already been loaded', () => {
      const uriOne = 'https://google.com/favicon.ico';
      const uriTwo = 'https://twitter.com/favicon.ico';
      ImageUriCache.add(uriOne);
      ImageUriCache.add(uriTwo);

      // initial render
      const component = mount(<Image source={{ uri: uriOne }} />);
      ImageUriCache.remove(uriOne);
      expect(
        component
          .render()
          .find('img')
          .attr('src')
      ).toBe(uriOne);

      // props update
      component.setProps({ source: { uri: uriTwo } });
      ImageUriCache.remove(uriTwo);
      expect(
        component
          .render()
          .find('img')
          .attr('src')
      ).toBe(uriTwo);
    });
  });

  describe('prop "style"', () => {
    test('correctly supports "resizeMode" property', () => {
      const component = shallow(<Image style={{ resizeMode: Image.resizeMode.contain }} />);
      expect(component.prop('style').backgroundSize).toMatchSnapshot();
    });

    test('removes other unsupported View styles', () => {
      const component = shallow(<Image style={{ overlayColor: 'red', tintColor: 'blue' }} />);
      expect(component.props().style.overlayColor).toBeUndefined();
      expect(component.props().style.tintColor).toBeUndefined();
    });
  });

  test('prop "testID"', () => {
    const component = shallow(<Image testID="testID" />);
    expect(component.prop('testID')).toBe('testID');
  });

  test('passes other props through to underlying View', () => {
    const fn = () => {};
    const component = shallow(<Image onResponderGrant={fn} />);
    expect(component.prop('onResponderGrant')).toBe(fn);
  });
});
