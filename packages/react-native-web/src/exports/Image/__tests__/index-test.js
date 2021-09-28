/* eslint-env jasmine, jest */
/* eslint-disable react/jsx-no-bind */

import { act } from 'react-dom/test-utils';
import * as AssetRegistry from '../../../modules/AssetRegistry';
import Image from '../';
import { ImageUriCache } from '../../../modules/ImageLoader';
import PixelRatio from '../../PixelRatio';
import React from 'react';
import { render } from '@testing-library/react';
import { createEventTarget } from 'dom-event-testing-library';

const originalImage = window.Image;

describe('components/Image', () => {
  beforeEach(() => {
    ImageUriCache._entries = {};
    window.Image = jest.fn(() => ({}));
  });

  afterEach(() => {
    window.Image = originalImage;
  });

  test('prop "accessibilityLabel"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const { container } = render(
      <Image accessibilityLabel="accessibilityLabel" defaultSource={defaultSource} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "alternativeText"', () => {
    test('set to empty string', () => {
      const { container } = render(<Image alternativeText="" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('set to value', () => {
      const { container } = render(
        <Image alternativeText="alternative text" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "blurRadius"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const { container } = render(<Image blurRadius={5} defaultSource={defaultSource} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "crossOrigin"', () => {
    test('sets value', () => {
      const { container } = render(<Image crossOrigin="use-credentials" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "decoding"', () => {
    test('sets value', () => {
      const { container } = render(<Image decoding="async" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "defaultSource"', () => {
    test('sets image when value is an object', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const { container } = render(<Image defaultSource={defaultSource} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('sets image when value is a string', () => {
      // emulate require-ed asset
      const defaultSource = 'https://google.com/favicon.ico';
      const { container } = render(<Image defaultSource={defaultSource} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('sets "height" and "width" styles if missing', () => {
      const defaultSource = {
        uri: 'https://google.com/favicon.ico',
        height: 10,
        width: 20
      };
      const { container } = render(<Image defaultSource={defaultSource} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('does not override "height" and "width" styles', () => {
      const defaultSource = {
        uri: 'https://google.com/favicon.ico',
        height: 10,
        width: 20
      };
      const { container } = render(
        <Image defaultSource={defaultSource} style={{ height: 20, width: 40 }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "draggable"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const { container } = render(<Image defaultSource={defaultSource} draggable={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "focusable"', () => {
    const { container } = render(<Image focusable={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "loading"', () => {
    test('sets value', () => {
      const { container } = render(<Image loading="lazy" />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "nativeID"', () => {
    const { container } = render(<Image nativeID="nativeID" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "onError"', () => {
    test('is called when image fails to load and replaces src with placeholder', () => {
      const onError = jest.fn();
      const ref = React.createRef();
      let container;
      act(() => {
        ({ container } = render(
          <Image onError={onError} ref={ref} source="" />
        ));
      });
      const image = createEventTarget(ref.current);
      act(() => {
        image.error();
      });
      expect(onError).toBeCalledTimes(1);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "onLoad"', () => {
    test('is called once when image loads', () => {
      const onLoad = jest.fn();
      const onLoadEnd = jest.fn();
      const onLoadStart = jest.fn();
      const ref = React.createRef();
      let container;
      act(() => {
        ({ container } = render(
          <Image
            onLoad={onLoad}
            onLoadEnd={onLoadEnd}
            onLoadStart={onLoadStart}
            ref={ref}
            source="https://google.com/favicon.ico"
          />
        ));
      });
      const image = createEventTarget(ref.current);
      act(() => {
        image.load({
          target: {
            width: 100,
            height: 100,
            naturalWidth: 200,
            naturalHeight: 200,
            currentSrc: 'https://google.com/favicon.ico',
            src: 'https://google.com/favicon.ico'
          }
        });
      });
      expect(onLoad).toBeCalledTimes(1);
      expect(onLoadEnd).toBeCalledTimes(1);
      expect(onLoadStart).toBeCalledTimes(1);
      expect(onLoad).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: expect.objectContaining({
            source: expect.objectContaining({
              width: expect.any(Number),
              height: expect.any(Number),
              url: 'https://google.com/favicon.ico'
            })
          })
        })
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is called on update if "uri" is different', () => {
      const onLoadStartStub = jest.fn();
      const onLoadStub = jest.fn();
      const onLoadEndStub = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(
          <Image
            onLoad={onLoadStub}
            onLoadEnd={onLoadEndStub}
            onLoadStart={onLoadStartStub}
            ref={ref}
            source={'https://test.com/img.jpg'}
          />
        );
      });
      const image = createEventTarget(ref.current);
      act(() => {
        image.load({
          target: {
            width: 100,
            height: 100,
            naturalWidth: 200,
            naturalHeight: 200,
            currentSrc: 'https://test.com/img.jpg',
            src: 'https://test.com/img.jpg'
          }
        });
      });

      expect(onLoadStub.mock.calls.length).toBe(1);
      expect(onLoadEndStub.mock.calls.length).toBe(1);
      expect(onLoadStartStub.mock.calls.length).toBe(1);

      act(() => {
        render(
          <Image
            onLoad={onLoadStub}
            onLoadEnd={onLoadEndStub}
            onLoadStart={onLoadStartStub}
            ref={ref}
            source={'https://blah.com/img.png'}
          />
        );
      });
      act(() => {
        image.load({
          target: {
            width: 100,
            height: 100,
            naturalWidth: 200,
            naturalHeight: 200,
            currentSrc: 'https://blah.com/img.png',
            src: 'https://blah.com/img.png'
          }
        });
      });

      expect(onLoadStub.mock.calls.length).toBe(2);
      expect(onLoadEndStub.mock.calls.length).toBe(2);
      expect(onLoadStartStub.mock.calls.length).toBe(2);
    });

    test('is not called when placeholder src is used after error', () => {
      const onError = jest.fn();
      const onLoad = jest.fn();
      const ref = React.createRef();
      act(() => {
        render(
          <Image
            onError={onError}
            onLoad={onLoad}
            ref={ref}
            source="https://google.com"
          />
        );
      });
      const image = createEventTarget(ref.current);
      act(() => {
        // Results in placeholder being "loaded"
        image.error();
      });
      expect(onError).toBeCalledTimes(1);
      act(() => {
        // Emulate the native "load" event for the placeholder
        image.load();
      });
      expect(onLoad).toBeCalledTimes(0);
    });
  });

  describe('prop "resizeMode"', () => {
    ['contain', 'cover', 'none', 'repeat', 'stretch', undefined].forEach((resizeMode) => {
      test(`value "${resizeMode}"`, () => {
        const { container } = render(<Image resizeMode={resizeMode} />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('prop "source"', () => {
    test('does not throw', () => {
      const sources = [null, '', {}, { uri: '' }, { uri: 'https://google.com' }];
      sources.forEach((source) => {
        expect(() => render(<Image source={source} />)).not.toThrow();
      });
    });

    test('is not set immediately if the image has not already been loaded', () => {
      const uri = 'https://google.com/favicon.ico';
      const source = { uri };
      const { container } = render(<Image source={source} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is set immediately if the image was preloaded', () => {
      const uri = 'https://yahoo.com/favicon.ico';
      //ImageLoader.load = jest.fn().mockImplementationOnce((_, onLoad, onError) => {
       // onLoad();
      //});
      return Image.prefetch(uri).then(() => {
        const source = { uri };
        const { container } = render(<Image source={source} />, { disableLifecycleMethods: true });
        expect(container.firstChild).toMatchSnapshot();
        ImageUriCache.remove(uri);
      });
    });

    test('is set immediately if the image has already been loaded', () => {
      const uriOne = 'https://google.com/favicon.ico';
      const uriTwo = 'https://twitter.com/favicon.ico';
      ImageUriCache.add(uriOne);
      ImageUriCache.add(uriTwo);

      // initial render
      const { container, rerender } = render(<Image source={{ uri: uriOne }} />);
      ImageUriCache.remove(uriOne);
      expect(container.firstChild).toMatchSnapshot();
      // props update
      act(() => {
        rerender(<Image source={{ uri: uriTwo }} />);
        ImageUriCache.remove(uriTwo);
      });
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is correctly updated when missing in initial render', () => {
      const uri = 'https://testing.com/img.jpg';
      const { container, rerender } = render(<Image />);
      act(() => {
        rerender(<Image source={{ uri }} />);
      });
      expect(container.firstChild).toMatchSnapshot();
    });

    test('is correctly updated only when loaded if defaultSource provided', () => {
      const defaultUri = 'https://testing.com/preview.jpg';
      const uri = 'https://testing.com/fullSize.jpg';
      const { container } = render(<Image defaultSource={{ uri: defaultUri }} source={{ uri }} />);
      expect(container.firstChild).toMatchSnapshot();
      act(() => {
      //  loadCallback();
      });
      expect(container.firstChild).toMatchSnapshot();
    });

    test('it correctly selects the source scale', () => {
      AssetRegistry.getAssetByID = () => ({
        httpServerLocation: 'static',
        name: 'img',
        scales: [1, 2, 3],
        type: 'png'
      });

      PixelRatio.get = jest.fn(() => 1.0);
      let { container } = render(<Image source={1} />);
      expect(container.querySelector('img').src).toBe('http://localhost/static/img.png');

      act(() => {
        PixelRatio.get = jest.fn(() => 2.2);
        ({ container } = render(<Image source={1} />));
      });
      expect(container.querySelector('img').src).toBe('http://localhost/static/img@2x.png');
    });
  });

  describe('prop "style"', () => {
    test('supports "resizeMode" property', () => {
      const { container } = render(<Image style={{ resizeMode: 'contain' }} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('supports "shadow" properties (convert to filter)', () => {
      const { container } = render(
        <Image style={{ shadowColor: 'red', shadowOffset: { width: 1, height: 1 } }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('supports "tintcolor" property (convert to filter)', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const { container } = render(
        <Image defaultSource={defaultSource} style={{ tintColor: 'red' }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('removes other unsupported View styles', () => {
      const { container } = render(<Image style={{ overlayColor: 'red', tintColor: 'blue' }} />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "testID"', () => {
    const { container } = render(<Image testID="testID" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('queryCache', () => {
    const uriOne = 'https://google.com/favicon.ico';
    const uriTwo = 'https://twitter.com/favicon.ico';
    ImageUriCache.add(uriOne);
    ImageUriCache.add(uriTwo);
    return Image.queryCache([uriOne, uriTwo, 'oops']).then((res) => {
      expect(res).toEqual({
        [uriOne]: 'disk/memory',
        [uriTwo]: 'disk/memory'
      });
    });
  });
});
