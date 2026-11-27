/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { act, render } from '@testing-library/react';

import Image from '../';
import {
  registerAsset,
  type PackagerAsset
} from '../../../modules/AssetRegistry';
import ImageLoader, { ImageUriCache } from '../../../modules/ImageLoader';
import PixelRatio from '../../PixelRatio';

function mockLoad() {
  vi.spyOn(ImageLoader, 'load').mockImplementation(() =>
    Promise.resolve({} as { nativeEvent: Event })
  );
}

function mockPendingLoad() {
  const resolveLoad: Record<string, () => Promise<void>> = {};
  const abortedRequests = new Set();
  vi.spyOn(ImageLoader, 'abort').mockImplementation((requestId) => {
    abortedRequests.add(requestId);
  });
  vi.spyOn(ImageLoader, 'load').mockImplementation(
    (uri: string, requestId: number) =>
      new Promise<{ nativeEvent: Event }>((resolve) => {
        resolveLoad[uri] = () => {
          return act(async () => {
            // Same as ImageLoader: an aborted request never settles
            if (!abortedRequests.has(requestId)) {
              resolve({} as { nativeEvent: Event });
            }
          });
        };
      })
  );
  return resolveLoad;
}

function flushLoad() {
  return act(async () => {});
}

function createLoadHandlers() {
  return { onLoad: vi.fn(), onLoadEnd: vi.fn(), onLoadStart: vi.fn() };
}

describe('components/Image', () => {
  beforeEach(() => {
    ImageUriCache._entries = {};
    vi.stubGlobal(
      'Image',
      vi.fn(function () {
        return {} as HTMLImageElement;
      })
    );
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
    test.each([false, true])(
      'is called after image is loaded (cached: %s)',
      async (isCached) => {
        const uri = 'https://test.com/img.jpg';
        const handlers = createLoadHandlers();
        mockLoad();
        if (isCached) {
          ImageUriCache.add(uri);
        }
        render(<Image {...handlers} source={uri} />);
        await flushLoad();
        expect(handlers.onLoad).toHaveBeenCalledOnce();
        expect(handlers.onLoadEnd).toHaveBeenCalledOnce();
      }
    );

    test('is called on update if "uri" is different', async () => {
      const handlers = createLoadHandlers();
      mockLoad();
      const { rerender } = render(
        <Image {...handlers} source="https://test.com/img.jpg" />
      );
      await flushLoad();
      rerender(<Image {...handlers} source="https://blah.com/img.png" />);
      await flushLoad();
      expect(handlers.onLoad).toHaveBeenCalledTimes(2);
      expect(handlers.onLoadEnd).toHaveBeenCalledTimes(2);
    });

    test.each([
      'https://test.com/img.jpg',
      { uri: 'https://test.com/img.jpg', width: 1, height: 1 }
    ])('is not called on update if "uri" is the same (%o)', async (source) => {
      const handlers = createLoadHandlers();
      mockLoad();
      const { rerender } = render(<Image {...handlers} source={source} />);
      await flushLoad();
      rerender(
        <Image
          {...handlers}
          source={typeof source === 'object' ? { ...source } : source}
        />
      );
      await flushLoad();
      expect(handlers.onLoad).toHaveBeenCalledOnce();
      expect(handlers.onLoadEnd).toHaveBeenCalledOnce();
    });

    test('is not restarted on update if only the handler identities change', () => {
      const firstHandlers = createLoadHandlers();
      const secondHandlers = createLoadHandlers();
      vi.spyOn(ImageLoader, 'abort').mockImplementation(() => {});
      vi.spyOn(ImageLoader, 'load').mockImplementation(
        () => new Promise<never>(() => {})
      );
      const { rerender } = render(
        <Image {...firstHandlers} source="https://test.com/img.jpg" />
      );
      rerender(<Image {...secondHandlers} source="https://test.com/img.jpg" />);
      expect(ImageLoader.load).toHaveBeenCalledOnce();
      expect(ImageLoader.abort).not.toHaveBeenCalled();
      expect(firstHandlers.onLoadStart).toHaveBeenCalledOnce();
      expect(secondHandlers.onLoadStart).not.toHaveBeenCalled();
    });

    test('calls the most recent handlers when a load settles after an update', async () => {
      const uri = 'https://test.com/img.jpg';
      const firstHandlers = createLoadHandlers();
      const secondHandlers = createLoadHandlers();
      const resolveLoad = mockPendingLoad();
      const { rerender } = render(<Image {...firstHandlers} source={uri} />);
      rerender(<Image {...secondHandlers} source={uri} />);
      await resolveLoad[uri]();
      expect(firstHandlers.onLoad).not.toHaveBeenCalled();
      expect(secondHandlers.onLoad).toHaveBeenCalledOnce();
      expect(secondHandlers.onLoadEnd).toHaveBeenCalledOnce();
    });
  });

  describe('prop "resizeMode"', () => {
    (
      ['contain', 'cover', 'none', 'repeat', 'stretch', undefined] as const
    ).forEach((resizeMode) => {
      test(`value "${resizeMode}"`, () => {
        const { container } = render(<Image resizeMode={resizeMode} />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });
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
        expect(() =>
          // @ts-expect-error
          render(<Image source={source} />)
        ).not.toThrow();
      });
    });

    test('is shown only once loaded if defaultSource is provided', async () => {
      const defaultUri = 'https://testing.com/preview.jpg';
      const uri = 'https://testing.com/fullSize.jpg';
      const resolveLoad = mockPendingLoad();
      const { container } = render(
        <Image defaultSource={{ uri: defaultUri }} source={{ uri }} />
      );
      expect(container.querySelector('img')?.src).toBe(defaultUri);
      await resolveLoad[uri]();
      expect(container.querySelector('img')?.src).toBe(uri);
    });

    test('is shown immediately if the image was preloaded', () => {
      const defaultUri = 'https://testing.com/preview.jpg';
      const uri = 'https://testing.com/fullSize.jpg';
      mockLoad();
      return Image.prefetch(uri).then(() => {
        mockPendingLoad();
        const { container } = render(
          <Image defaultSource={{ uri: defaultUri }} source={{ uri }} />
        );
        expect(container.querySelector('img')?.src).toBe(uri);
      });
    });

    test('is shown immediately if another Image has already loaded it', async () => {
      const defaultUri = 'https://testing.com/preview.jpg';
      const uri = 'https://testing.com/fullSize.jpg';
      const resolveLoad = mockPendingLoad();
      render(<Image source={{ uri }} />);
      await resolveLoad[uri]();
      const { container } = render(
        <Image defaultSource={{ uri: defaultUri }} source={{ uri }} />
      );
      expect(container.querySelector('img')?.src).toBe(uri);
    });

    test('is shown immediately on update if the image has already been loaded', () => {
      const defaultUri = 'https://testing.com/preview.jpg';
      const uriOne = 'https://testing.com/one.jpg';
      const uriTwo = 'https://testing.com/two.jpg';
      ImageUriCache.add(uriOne);
      ImageUriCache.add(uriTwo);
      mockPendingLoad();
      const { container, rerender } = render(
        <Image defaultSource={{ uri: defaultUri }} source={{ uri: uriOne }} />
      );
      expect(container.querySelector('img')?.src).toBe(uriOne);
      rerender(
        <Image defaultSource={{ uri: defaultUri }} source={{ uri: uriTwo }} />
      );
      expect(container.querySelector('img')?.src).toBe(uriTwo);
    });

    test('is correctly updated when missing in initial render', () => {
      const uri = 'https://testing.com/img.jpg';
      const { container, rerender } = render(<Image />);
      rerender(<Image source={{ uri }} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('it correctly selects the source scale', () => {
      const assetId = registerAsset({
        httpServerLocation: 'static',
        name: 'img',
        scales: [1, 2, 3],
        type: 'png'
      } as PackagerAsset);

      vi.spyOn(PixelRatio, 'get').mockReturnValue(1.0);
      let { container } = render(<Image source={assetId} />);
      expect(container.querySelector('img')?.src).toBe(
        'http://localhost/static/img.png'
      );

      vi.spyOn(PixelRatio, 'get').mockReturnValue(2.2);
      ({ container } = render(<Image source={assetId} />));
      expect(container.querySelector('img')?.src).toBe(
        'http://localhost/static/img@2x.png'
      );
    });

    test('"src" takes precedence over "source"', () => {
      const src = 'https://example.com/src.png';
      const uri = 'https://example.com/source.png';
      const { container } = render(<Image source={{ uri }} src={src} />);
      expect(container.querySelector('img')?.src).toBe(src);
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
        // @ts-expect-error
        <Image style={{ overlayColor: 'red', tintColor: 'blue' }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('supports static and dynamic styles', () => {
      const { container } = render(
        <Image
          style={[
            // @ts-expect-error
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
        <Image defaultSource={defaultSource} tintColor="red" />
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

  describe('resolveAssetSource', () => {
    test('returns null and undefined as-is', () => {
      expect(Image.resolveAssetSource(null)).toBeNull();
      expect(Image.resolveAssetSource(undefined)).toBeUndefined();
    });

    test('returns object and array sources as-is', () => {
      const source = {
        headers: { Authorization: 'token' },
        uri: 'https://google.com/favicon.ico'
      };
      const sources = [source];
      expect(Image.resolveAssetSource(source)).toBe(source);
      expect(Image.resolveAssetSource(sources)).toBe(sources);
    });

    test('wraps string sources', () => {
      const uri = 'data:image/svg+xml;utf8,<svg></svg>';
      expect(Image.resolveAssetSource(uri)).toEqual({ uri });
    });

    test('resolves packager assets', () => {
      const assetId = registerAsset({
        height: 10,
        httpServerLocation: 'static',
        name: 'img',
        scales: [1, 2],
        type: 'png',
        width: 20
      } as PackagerAsset);

      vi.spyOn(PixelRatio, 'get').mockReturnValue(2);

      expect(Image.resolveAssetSource(assetId)).toEqual({
        height: 10,
        scale: 2,
        uri: 'static/img@2x.png',
        width: 20
      });
    });

    test('returns null for unknown packager assets', () => {
      expect(Image.resolveAssetSource(99999)).toBeNull();
    });
  });

  describe('cache', () => {
    test('releases its cache entry on unmount', async () => {
      const uri = 'https://testing.com/avatar.jpg';
      mockLoad();
      const { unmount } = render(<Image source={{ uri }} />);
      await flushLoad();
      expect(ImageUriCache._entries[uri].refCount).toBe(1);
      unmount();
      expect(ImageUriCache._entries[uri].refCount).toBe(0);
      expect(ImageUriCache.has(uri)).toBe(true);
    });

    test('ignores a load that resolves after unmount', async () => {
      const uri = 'https://testing.com/avatar.jpg';
      const resolveLoad = mockPendingLoad();
      const { unmount } = render(<Image source={{ uri }} />);
      unmount();
      await resolveLoad[uri]();
      expect(ImageUriCache.has(uri)).toBe(false);
    });

    test('ignores a load that resolves after the source changes', async () => {
      const defaultUri = 'https://testing.com/preview.jpg';
      const uriOne = 'https://testing.com/one.jpg';
      const uriTwo = 'https://testing.com/two.jpg';
      const resolveLoad = mockPendingLoad();
      const { container, rerender } = render(
        <Image defaultSource={{ uri: defaultUri }} source={{ uri: uriOne }} />
      );
      rerender(
        <Image defaultSource={{ uri: defaultUri }} source={{ uri: uriTwo }} />
      );
      await resolveLoad[uriOne]();
      expect(ImageUriCache.has(uriOne)).toBe(false);
      expect(container.querySelector('img')?.src).toBe(defaultUri);
    });

    test('holds a reference while showing a cached image', () => {
      const uri = 'https://testing.com/avatar.jpg';
      ImageUriCache.add(uri);
      ImageUriCache.remove(uri);
      mockPendingLoad();
      const { unmount } = render(<Image source={{ uri }} />);
      expect(ImageUriCache._entries[uri].refCount).toBe(1);
      unmount();
      expect(ImageUriCache._entries[uri].refCount).toBe(0);
    });

    test('does not evict another entry when a data URI unmounts', async () => {
      const uri = 'https://testing.com/avatar.jpg';
      const dataUri = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';
      ImageUriCache.add(uri);
      ImageUriCache.remove(uri);
      const maximumEntries = ImageUriCache._maximumEntries;
      ImageUriCache._maximumEntries = 1;
      mockLoad();
      const { unmount } = render(<Image source={{ uri: dataUri }} />);
      await flushLoad();
      unmount();
      ImageUriCache._maximumEntries = maximumEntries;
      expect(ImageUriCache._entries[uri]).toBeDefined();
    });
  });

  // Keep last: each render increments the tint filter id used in snapshots
  test('style "filter" array', () => {
    const { container } = render(
      <Image
        blurRadius={5}
        style={{ filter: [{ blur: 2 }, { brightness: 0.5 }] }}
      />
    );
    const root = container.firstChild as HTMLElement;
    const image = root.firstChild as HTMLElement;
    expect(root.style.filter).toBe('blur(2px) brightness(0.5)');
    expect(image.style.filter).toBe('blur(5px)');
  });
});
