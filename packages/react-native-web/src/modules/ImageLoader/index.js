/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { getAssetByID } from '../AssetRegistry';
import type { Source } from '../../exports/Image/types';
import PixelRatio from '../../exports/PixelRatio';
const dataUriPattern = /^data:/;
const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

export class ImageUriCache {
  static _maximumEntries: number = 256;
  static _entries = {};

  static createCacheId(source: Source): string {
    return JSON.stringify(ImageLoader.resolveSource(source));
  }

  static has(source: Source): boolean {
    const entries = ImageUriCache._entries;
    const cacheId = ImageUriCache.createCacheId(source);

    return Boolean(entries[cacheId]);
  }

  static get(source: Source): Object {
    const entries = ImageUriCache._entries;
    const cacheId = ImageUriCache.createCacheId(source);

    return entries[cacheId];
  }

  static add(source: Source, displayImageUri?: string): void {
    const entries = ImageUriCache._entries;
    const lastUsedTimestamp = Date.now();
    const cacheId = ImageUriCache.createCacheId(source);

    if (entries[cacheId]) {
      entries[cacheId].lastUsedTimestamp = lastUsedTimestamp;
      entries[cacheId].refCount += 1;
    } else {
      entries[cacheId] = {
        lastUsedTimestamp,
        refCount: 1,
        displayImageUri: displayImageUri || ImageLoader.resolveSource(source).uri
      };
    }
  }

  static remove(source: Source) {
    const entries = ImageUriCache._entries;
    const cacheId = ImageUriCache.createCacheId(source);

    if (entries[cacheId]) {
      entries[cacheId].refCount -= 1;
    }
    // Free up entries when the cache is "full"
    ImageUriCache._cleanUpIfNeeded();
  }

  static _cleanUpIfNeeded() {
    const entries = ImageUriCache._entries;
    const cacheIds = Object.keys(entries);

    if (cacheIds.length + 1 > ImageUriCache._maximumEntries) {
      let leastRecentlyUsedKey;
      let leastRecentlyUsedEntry;

      cacheIds.forEach(cacheId => {
        const entry = entries[cacheId];

        if (
          (!leastRecentlyUsedEntry ||
            entry.lastUsedTimestamp < leastRecentlyUsedEntry.lastUsedTimestamp) &&
          entry.refCount === 0
        ) {
          leastRecentlyUsedKey = cacheId;
          leastRecentlyUsedEntry = entry;
        }
      });

      if (leastRecentlyUsedKey) {
        delete entries[leastRecentlyUsedKey];
      }
    }
  }
}

let id = 0;
const requests = {};

const ImageLoader = {
  abort(requestId: number) {
    let image = requests[`${requestId}`];
    if (image) {
      image.onerror = null;
      image.onload = null;
      image = null;
      delete requests[`${requestId}`];
    }
  },
  getSize(source: Source, success: Function, failure: Function) {
    let complete = false;
    const interval = setInterval(callback, 16);
    const requestId = ImageLoader.load(source, callback, errorCallback);

    function callback() {
      const image = requests[`${requestId}`];

      if (image) {
        const { naturalHeight, naturalWidth } = image;

        if (naturalHeight && naturalWidth) {
          success(naturalWidth, naturalHeight);
          complete = true;
        }
      }
      if (complete) {
        ImageLoader.abort(requestId);
        clearInterval(interval);
      }
    }

    function errorCallback() {
      if (typeof failure === 'function') {
        failure();
      }
      ImageLoader.abort(requestId);
      clearInterval(interval);
    }
  },
  load(source: Source, onLoad: Function, onError: Function, onProgress: Function): number {
    const { uri, method, headers, body } = ImageLoader.resolveSource(source);
    const image = new window.Image();
    let shouldCache = false;
    id += 1;
    image.onerror = onError;
    image.onload = e => {
      // avoid blocking the main thread

      const onDecode = () => onLoad({ nativeEvent: e }, shouldCache ? image.src : null);
      if (typeof image.decode === 'function') {
        // Safari currently throws exceptions when decoding svgs.
        // We want to catch that error and allow the load handler
        // to be forwarded to the onLoad handler in this case
        image.decode().then(onDecode, onDecode);
      } else {
        setTimeout(onDecode, 0);
      }
    };

    requests[`${id}`] = image;

    // If the important source properties are empty, return the image directly
    if (!source || !uri) {
      return id;
    }

    // If the image is a dataUri, display it directly via image
    const isDataUri = dataUriPattern.test(uri);

    if (isDataUri) {
      image.src = uri;
      return id;
    }

    // If the image can be retrieved via GET, we can fallback to image loading method
    if (method === 'GET' && !Object.keys(headers).length) {
      image.src = uri;
      return id;
    }

    // Load image via XHR
    const request = new window.XMLHttpRequest();

    request.open(method, uri);
    request.responseType = 'blob';
    request.withCredentials = false;
    request.onerror = () => {
      // Fall back to image (e.g. for CORS issues)
      image.src = uri;
    };

    // Add request headers
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of Object.entries(headers)) {
      request.setRequestHeader(name, value);
    }

    // When the request finished loading, pass it on to the image
    request.onload = () => {
      shouldCache = true;
      image.src = window.URL.createObjectURL(request.response);
    };

    // Track progress
    request.onprogress = onProgress;

    // Send the request
    request.send(body);

    return id;
  },
  prefetch(source: Source): Promise<void> {
    return new Promise((resolve, reject) => {
      const resolvedSource = ImageLoader.resolveSource(source);
      ImageLoader.load(
        resolvedSource,
        () => {
          // Add the uri to the cache so it can be immediately displayed when used
          // but also immediately remove it to correctly reflect that it has no active references
          ImageUriCache.add(resolvedSource);
          ImageUriCache.remove(resolvedSource);
          resolve();
        },
        reject
      );
    });
  },
  resolveSource(source?: Source): Object {
    let resolvedSource = {
      method: 'GET',
      uri: '',
      headers: {},
      width: undefined,
      height: undefined
    };

    if (typeof source === 'number') {
      // get the URI from the packager
      const asset = getAssetByID(source);
      let scale = asset.scales[0];
      if (asset.scales.length > 1) {
        const preferredScale = PixelRatio.get();
        // Get the scale which is closest to the preferred scale
        scale = asset.scales.reduce((prev, curr) =>
          Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev
        );
      }
      const scaleSuffix = scale !== 1 ? `@${scale}x` : '';
      resolvedSource.uri = asset
        ? `${asset.httpServerLocation}/${asset.name}${scaleSuffix}.${asset.type}`
        : '';
    } else if (typeof source === 'string') {
      resolvedSource.uri = source;
    } else if (Array.isArray(source)) {
      resolvedSource = {
        ...resolvedSource,
        ...source[0]
      };
    } else if (typeof source === 'object') {
      resolvedSource = {
        ...resolvedSource,
        ...source
      };
    }

    if (resolvedSource.uri) {
      const match = resolvedSource.uri.match(svgDataUriPattern);
      // inline SVG markup may contain characters (e.g., #, ") that need to be escaped

      if (match) {
        const [, prefix, svg] = match;
        const encodedSvg = encodeURIComponent(svg);

        resolvedSource.uri = `${prefix}${encodedSvg}`;
      }
    }

    return resolvedSource;
  },
  queryCache(uris: Array<string>): Object {
    const result = {};
    uris.forEach(u => {
      if (ImageUriCache.has(u)) {
        result[u] = 'disk/memory';
      }
    });
    return Promise.resolve(result);
  }
};

export default ImageLoader;
