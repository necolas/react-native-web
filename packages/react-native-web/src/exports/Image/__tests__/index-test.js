/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/jsx-no-bind */

import * as AssetRegistry from '@react-native/assets-registry/registry';
import Image from '../';
import ImageLoader, { ImageUriCache } from '../../../modules/ImageLoader';
import PixelRatio from '../../PixelRatio';
import React from 'react';
import { act, render } from '@testing-library/react';

const originalImage = window.Image;

describe('components/Image', () => {
  beforeEach(() => {
    ImageUriCache._entries = {};
    window.Image = jest.fn(() => ({}));
  });

  afterEach(() => {
    window.Image = originalImage;
  });

  test('prop "aria-label"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const { container } = render(
      <Image aria-label="accessibilityLabel" defaultSource={defaultSource} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "blurRadius"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const { container } = render(
      <Image blurRadius={5} defaultSource={defaultSource} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "defaultSource"', () => {
    test('sets background image when value is an object', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const { container } = render(<Image defaultSource={defaultSource} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('sets background image when value is a string', () => {
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
        <Image
          defaultSource={defaultSource}
          style={{ height: 20, width: 40 }}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('prop "draggable"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' };
    const { container } = render(
      <Image defaultSource={defaultSource} draggable={true} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "focusable"', () => {
    const { container } = render(<Image focusable={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prop "nativeID"', () => {
    const { container } = render(<Image nativeID="nativeID" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('prop "onLoad"', () => {
    test('is called after image is loaded from network', () => {
      jest.useFakeTimers();
      ImageLoader.load = jest.fn().mockImplementation((_, onLoad, onError) => {
        onLoad();
      });
      const onLoadStartStub = jest.fn();
      const onLoadStub = jest.fn();
      const onLoadEndStub = jest.fn();
      render(
        <Image
          onLoad={onLoadStub}
          onLoadEnd={onLoadEndStub}
          onLoadStart={onLoadStartStub}
          source="https://test.com/img.jpg"
        />
      );
      jest.runOnlyPendingTimers();
      expect(onLoadStub).toBeCalled();
    });

    test('is called after image is loaded from cache', () => {
      jest.useFakeTimers();
      ImageLoader.load = jest.fn().mockImplementation((_, onLoad, onError) => {
        onLoad();
      });
      const onLoadStartStub = jest.fn();
      const onLoadStub = jest.fn();
      const onLoadEndStub = jest.fn();
      const uri = 'https://test.com/img.jpg';
      ImageUriCache.add(uri);
      render(
        <Image
          onLoad={onLoadStub}
          onLoadEnd={onLoadEndStub}
          onLoadStart={onLoadStartStub}
          source={uri}
        />
      );
      jest.runOnlyPendingTimers();
      expect(onLoadStub).toBeCalled();
      ImageUriCache.remove(uri);
    });

    test('is called on update if "uri" is different', () => {
      const onLoadStartStub = jest.fn();
      const onLoadStub = jest.fn();
      const onLoadEndStub = jest.fn();
      const { rerender } = render(
        <Image
          onLoad={onLoadStub}
          onLoadEnd={onLoadEndStub}
          onLoadStart={onLoadStartStub}
          source={'https://test.com/img.jpg'}
        />
      );
      act(() => {
        rerender(
          <Image
            onLoad={onLoadStub}
            onLoadEnd={onLoadEndStub}
            onLoadStart={onLoadStartStub}
            source={'https://blah.com/img.png'}
          />
        );
      });
      expect(onLoadStub.mock.calls.length).toBe(2);
      expect(onLoadEndStub.mock.calls.length).toBe(2);
    });

    test('is not called on update if "uri" is the same', () => {
      const onLoadStartStub = jest.fn();
      const onLoadStub = jest.fn();
      const onLoadEndStub = jest.fn();
      const { rerender } = render(
        <Image
          onLoad={onLoadStub}
          onLoadEnd={onLoadEndStub}
          onLoadStart={onLoadStartStub}
          source={'https://test.com/img.jpg'}
        />
      );
      act(() => {
        rerender(
          <Image
            onLoad={onLoadStub}
            onLoadEnd={onLoadEndStub}
            onLoadStart={onLoadStartStub}
            source={'https://test.com/img.jpg'}
          />
        );
      });
      expect(onLoadStub.mock.calls.length).toBe(1);
      expect(onLoadEndStub.mock.calls.length).toBe(1);
    });

    test('is not called on update if "uri" is the same and given as an object', () => {
      const onLoadStartStub = jest.fn();
      const onLoadStub = jest.fn();
      const onLoadEndStub = jest.fn();
      const { rerender } = render(
        <Image
          onLoad={onLoadStub}
          onLoadEnd={onLoadEndStub}
          onLoadStart={onLoadStartStub}
          source={{ uri: 'https://test.com/img.jpg', width: 1, height: 1 }}
        />
      );
      act(() => {
        rerender(
          <Image
            onLoad={onLoadStub}
            onLoadEnd={onLoadEndStub}
            onLoadStart={onLoadStartStub}
            source={{ uri: 'https://test.com/img.jpg', width: 1, height: 1 }}
          />
        );
      });
      expect(onLoadStub.mock.calls.length).toBe(1);
      expect(onLoadEndStub.mock.calls.length).toBe(1);
    });
  });

  describe('prop "resizeMode"', () => {
    ['contain', 'cover', 'none', 'repeat', 'stretch', undefined].forEach(
      (resizeMode) => {
        test(`value "${resizeMode}"`, () => {
          const { container } = render(<Image resizeMode={resizeMode} />);
          expect(container.firstChild).toMatchSnapshot();
        });
      }
    );
  });

  describe('prop "source"', () => {
    test('does not throw', () => {
      const sources = [
        null,
        '',
        {},
        { uri: '' },
        { uri: 'https://google.com' }
      ];
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
      ImageLoader.load = jest
        .fn()
        .mockImplementationOnce((_, onLoad, onError) => {
          onLoad();
        });
      return Image.prefetch(uri).then(() => {
        const source = { uri };
        const { container } = render(<Image source={source} />, {
          disableLifecycleMethods: true
        });
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
      const { container, rerender } = render(
        <Image source={{ uri: uriOne }} />
      );
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
      let loadCallback;
      ImageLoader.load = jest
        .fn()
        .mockImplementationOnce((_, onLoad, onError) => {
          loadCallback = onLoad;
        });
      const { container } = render(
        <Image defaultSource={{ uri: defaultUri }} source={{ uri }} />
      );
      expect(container.firstChild).toMatchSnapshot();
      act(() => {
        loadCallback();
      });
      expect(container.firstChild).toMatchSnapshot();
    });

    test('it correctly selects the source scale', () => {
      AssetRegistry.getAssetByID = jest.fn(() => ({
        httpServerLocation: 'static',
        name: 'img',
        scales: [1, 2, 3],
        type: 'png'
      }));

      PixelRatio.get = jest.fn(() => 1.0);
      let { container } = render(<Image source={1} />);
      expect(container.querySelector('img').src).toBe(
        'http://localhost/static/img.png'
      );

      act(() => {
        PixelRatio.get = jest.fn(() => 2.2);
        ({ container } = render(<Image source={1} />));
      });
      expect(container.querySelector('img').src).toBe(
        'http://localhost/static/img@2x.png'
      );
    });
  });

  describe('prop "style"', () => {
    test('supports "shadow" properties (converts to filter)', () => {
      const { container } = render(
        <Image
          style={{ shadowColor: 'red', shadowOffset: { width: 1, height: 1 } }}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('removes other unsupported View styles', () => {
      const { container } = render(
        <Image style={{ overlayColor: 'red', tintColor: 'blue' }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('supports static and dynamic styles', () => {
      const { container } = render(
        <Image
          style={[
            { $$css: true, position: 'pos-abs' },
            { transitionTimingFunction: 'ease-in' }
          ]}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('prop "tintColor"', () => {
    test('convert to filter', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' };
      const { container } = render(
        <Image defaultSource={defaultSource} tintColor={'red'} />
      );
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
