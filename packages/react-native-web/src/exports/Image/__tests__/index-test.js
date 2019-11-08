/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import Image from '../';
import ImageLoader from '../../../modules/ImageLoader';
import ImageUriCache from '../ImageUriCache';
import React from 'react';
import { shallow } from 'enzyme';
import StyleSheet from '../../StyleSheet';

const OriginalImage = window.Image;

const findImageSurfaceStyle = wrapper => StyleSheet.flatten(wrapper.childAt(0).prop('style'));

describe('components/Image', () => {
  beforeEach(() => {
    ImageUriCache._entries = {};
    window.Image = jest.fn(() => ({}));
  });

  afterEach(() => {
    window.Image = OriginalImage;
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

  test('prop "blurRadius"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const component = shallow(<Image blurRadius={5} defaultSource={defaultSource} />);
    expect(findImageSurfaceStyle(component).filter).toMatchSnapshot();
  });

  describe('prop "defaultSource"', () => {
    test('sets background image when value is an object', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const component = shallow(<Image defaultSource={defaultSource} />);
      expect(findImageSurfaceStyle(component).backgroundImage).toMatchSnapshot();
    });

    test('sets background image when value is a string', () => {
      // emulate require-ed asset
      const defaultSource = 'https://google.com/favicon.ico';
      const component = shallow(<Image defaultSource={defaultSource} />);
      expect(findImageSurfaceStyle(component).backgroundImage).toMatchSnapshot();
    });

    test('sets "height" and "width" styles if missing', () => {
      const defaultSource = {
        uri: 'https://google.com/favicon.ico',
        height: 10,
        width: 20
      };
      const component = shallow(<Image defaultSource={defaultSource} />);
      const { height, width } = StyleSheet.flatten(component.prop('style'));
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
      const { height, width } = StyleSheet.flatten(component.prop('style'));
      expect(height).toBe(20);
      expect(width).toBe(40);
    });
  });

  test('prop "draggable"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const component = shallow(<Image defaultSource={defaultSource} />);
    expect(component.find('img').prop('draggable')).toBe(false);
    component.setProps({ defaultSource, draggable: true });
    expect(component.find('img').prop('draggable')).toBe(true);
  });

  describe('prop "onLoad"', () => {
    test('is called after image is loaded from network', () => {
      jest.useFakeTimers();
      const uri = 'https://test.com/img.jpg';
      ImageLoader.load = jest.fn().mockImplementation((_, onLoad, onError) => {
        onLoad(uri);
      });
      const onLoadStub = jest.fn();
      shallow(<Image onLoad={onLoadStub} source={uri} />);
      jest.runOnlyPendingTimers();
      expect(ImageLoader.load).toBeCalled();
      expect(onLoadStub).toBeCalled();
    });

    test('is called after image is loaded from cache', () => {
      jest.useFakeTimers();
      const uri = 'https://test.com/img.jpg';
      ImageLoader.load = jest.fn().mockImplementation((_, onLoad, onError) => {
        onLoad(uri);
      });
      const onLoadStub = jest.fn();
      ImageUriCache.add(uri);
      shallow(<Image onLoad={onLoadStub} source={uri} />);
      jest.runOnlyPendingTimers();
      expect(ImageLoader.load).not.toBeCalled();
      expect(onLoadStub).toBeCalled();
      ImageUriCache.remove(uri);
    });

    test('is called on update if "uri" is different', () => {
      const onLoadStub = jest.fn();
      const uri = 'https://test.com/img.jpg';
      const component = shallow(<Image onLoad={onLoadStub} source={uri} />);
      component.setProps({ source: 'https://blah.com/img.png' });
      expect(onLoadStub.mock.calls.length).toBe(2);
    });

    test('is not called on update if "uri" is the same', () => {
      const onLoadStub = jest.fn();
      const uri = 'https://test.com/img.jpg';
      const component = shallow(<Image onLoad={onLoadStub} source={uri} />);
      component.setProps({ resizeMode: 'stretch' });
      expect(onLoadStub.mock.calls.length).toBe(1);
    });
  });

  describe('prop "resizeMode"', () => {
    ['contain', 'cover', 'none', 'repeat', 'stretch', undefined].forEach(resizeMode => {
      test(`value "${resizeMode}"`, () => {
        const component = shallow(<Image resizeMode={resizeMode} />);
        expect(findImageSurfaceStyle(component).backgroundSize).toMatchSnapshot();
      });
    });
  });

  describe('prop "source"', () => {
    test('does not throw', () => {
      const sources = [null, '', {}, { uri: '' }, { uri: 'https://google.com' }];
      sources.forEach(source => {
        expect(() => shallow(<Image source={source} />)).not.toThrow();
      });
    });

    test('is not set immediately if the image has not already been loaded', () => {
      const uri = 'https://google.com/favicon.ico';
      const source = { uri };
      const component = shallow(<Image source={source} />);
      expect(component.find('img')).toBeUndefined;
    });

    test('is set immediately if the image was preloaded', () => {
      const uri = 'https://yahoo.com/favicon.ico';
      ImageLoader.load = jest.fn().mockImplementationOnce((_, onLoad, onError) => {
        onLoad(uri);
      });
      return Image.prefetch(uri).then(() => {
        const source = { uri };
        const component = shallow(<Image source={source} />, { disableLifecycleMethods: true });
        expect(component.find('img').prop('src')).toBe(uri);
        ImageUriCache.remove(uri);
      });
    });

    test('is set immediately if the image has already been loaded', () => {
      const uriOne = 'https://google.com/favicon.ico';
      const uriTwo = 'https://twitter.com/favicon.ico';
      ImageUriCache.add(uriOne);
      ImageUriCache.add(uriTwo);

      // initial render
      const component = shallow(<Image source={{ uri: uriOne }} />);
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

    test('is correctly updated when missing in initial render', () => {
      const uri = 'https://testing.com/img.jpg';
      const component = shallow(<Image />);
      component.setProps({ source: { uri } });
      expect(
        component
          .render()
          .find('img')
          .attr('src')
      ).toBe(uri);
    });

    test('is correctly updated only when loaded if defaultSource provided', () => {
      const defaultUri = 'https://testing.com/preview.jpg';
      const uri = 'https://testing.com/fullSize.jpg';
      let loadCallback;
      ImageLoader.load = jest.fn().mockImplementationOnce((_, onLoad, onError) => {
        loadCallback = onLoad;
      });
      const component = shallow(<Image defaultSource={{ uri: defaultUri }} source={{ uri }} />);
      expect(component.find('img').prop('src')).toBe(defaultUri);
      loadCallback(uri);
      expect(component.find('img').prop('src')).toBe(uri);
    });
  });

  describe('prop "style"', () => {
    test('supports "resizeMode" property', () => {
      const component = shallow(<Image style={{ resizeMode: 'contain' }} />);
      expect(findImageSurfaceStyle(component).backgroundSize).toMatchSnapshot();
    });

    test('supports "shadow" properties (convert to filter)', () => {
      const component = shallow(
        <Image style={{ shadowColor: 'red', shadowOffset: { width: 1, height: 1 } }} />
      );
      expect(findImageSurfaceStyle(component).filter).toMatchSnapshot();
    });

    test('supports "tintcolor" property (convert to filter)', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const component = shallow(
        <Image defaultSource={defaultSource} style={{ tintColor: 'red' }} />
      );
      // filter
      expect(findImageSurfaceStyle(component).filter).toContain('url(#tint-');
      // svg
      expect(component.childAt(2).type()).toBe('svg');
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

  test('queryCache', () => {
    const uriOne = 'https://google.com/favicon.ico';
    const uriTwo = 'https://twitter.com/favicon.ico';
    ImageUriCache.add(uriOne);
    ImageUriCache.add(uriTwo);
    return Image.queryCache([uriOne, uriTwo, 'oops']).then(res => {
      expect(res).toEqual({
        [uriOne]: 'disk/memory',
        [uriTwo]: 'disk/memory'
      });
    });
  });
});
