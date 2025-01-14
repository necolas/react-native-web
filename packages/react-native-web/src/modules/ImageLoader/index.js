/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const dataUriPattern = /^data:/;

export class ImageUriCache {
  static _maximumEntries: number = 256;
  static _entries = new Map();

  static has(uri: string): boolean {
    const entries = ImageUriCache._entries;
    const isDataUri = dataUriPattern.test(uri);
    return isDataUri || entries.has(uri);
  }

  static add(uri: string) {
    const entries = ImageUriCache._entries;
    const lastUsedTimestamp = Date.now();
    const entry = entries.get(uri);
    if (entry) {
      entry.lastUsedTimestamp = lastUsedTimestamp;
      entry.refCount += 1;
    } else {
      entries.set(uri, {
        lastUsedTimestamp,
        refCount: 1
      });
    }
  }

  static remove(uri: string) {
    const entries = ImageUriCache._entries;
    const entry = entries.get(uri);
    if (entry?.refCount > 0) {
      entry.refCount -= 1;
      // Free up entries when the cache is "full"
      ImageUriCache._cleanUpIfNeeded();
    }
  }

  static _cleanUpIfNeeded() {
    const entries = ImageUriCache._entries;

    if (entries.size + 1 > ImageUriCache._maximumEntries) {
      let leastRecentlyUsedKey;
      let leastRecentlyUsedEntry;

      entries.forEach((entry, uri) => {
        if (
          (!leastRecentlyUsedEntry ||
            entry.lastUsedTimestamp <
              leastRecentlyUsedEntry.lastUsedTimestamp) &&
          entry.refCount === 0
        ) {
          leastRecentlyUsedKey = uri;
          leastRecentlyUsedEntry = entry;
        }
      });

      if (leastRecentlyUsedKey) {
        entries.delete(leastRecentlyUsedKey);
      }
    }
  }
}

let id = 0;
const requests = new Map();

const ImageLoader = {
  abort(requestId: number) {
    const image = requests.get(requestId);
    if (image) {
      image.onerror = null;
      image.onload = null;
      requests.delete(requestId);
    }
  },
  getSize(
    uri: string,
    success: (width: number, height: number) => void,
    failure: () => void
  ) {
    const requestId = ImageLoader.load(uri, callback, errorCallback);
    function callback() {
      const image = requests.get(requestId);
      if (image) {
        const { naturalHeight, naturalWidth } = image;
        if (naturalHeight && naturalWidth) {
          success(naturalWidth, naturalHeight);
        }
      }
    }
    function errorCallback() {
      if (typeof failure === 'function') {
        failure();
      }
      ImageLoader.abort(requestId);
    }
  },
  has(uri: string): boolean {
    return ImageUriCache.has(uri);
  },
  load(uri: string, onLoad: Function, onError: Function): number {
    id += 1;
    const image = new window.Image();
    image.onerror = onError;
    image.onload = (e) => {
      // avoid blocking the main thread
      const onDecode = () => onLoad({ nativeEvent: e });
      if (typeof image.decode === 'function') {
        // Safari currently throws exceptions when decoding svgs.
        // We want to catch that error and allow the load handler
        // to be forwarded to the onLoad handler in this case
        image.decode().then(onDecode, onDecode);
      } else {
        setTimeout(onDecode, 0);
      }
    };
    image.src = uri;
    requests.set(id, image);
    return id;
  },
  prefetch(uri: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ImageLoader.load(
        uri,
        () => {
          // Add the uri to the cache so it can be immediately displayed when used
          // but also immediately remove it to correctly reflect that it has no active references
          ImageUriCache.add(uri);
          ImageUriCache.remove(uri);
          resolve();
        },
        reject
      );
    });
  },
  queryCache(uris: Array<string>): Promise<{| [uri: string]: 'disk/memory' |}> {
    const result = {};
    uris.forEach((u) => {
      if (ImageUriCache.has(u)) {
        result[u] = 'disk/memory';
      }
    });
    return Promise.resolve(result);
  }
};

export default ImageLoader;
