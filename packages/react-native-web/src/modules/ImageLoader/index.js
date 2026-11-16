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
  static _entries: Record<
    string,
    { lastUsedTimestamp: number, refCount: number }
  > = {};

  static has(uri: string): boolean {
    const entries = ImageUriCache._entries;
    const isDataUri = dataUriPattern.test(uri);
    return isDataUri || Boolean(entries[uri]);
  }

  static add(uri: string): boolean {
    // "has" is always true for data URIs, so don't keep them in memory
    if (dataUriPattern.test(uri)) {
      return false;
    }
    const entries = ImageUriCache._entries;
    const lastUsedTimestamp = Date.now();
    if (entries[uri]) {
      entries[uri].lastUsedTimestamp = lastUsedTimestamp;
      entries[uri].refCount += 1;
    } else {
      entries[uri] = {
        lastUsedTimestamp,
        refCount: 1
      };
    }
    return true;
  }

  static remove(uri: string) {
    const entries = ImageUriCache._entries;
    if (!entries[uri]) {
      return;
    }
    entries[uri].refCount -= 1;
    // Free up entries when the cache is "full"
    ImageUriCache._cleanUpIfNeeded();
  }

  static _cleanUpIfNeeded() {
    const entries = ImageUriCache._entries;
    const imageUris = Object.keys(entries);

    if (imageUris.length + 1 > ImageUriCache._maximumEntries) {
      let leastRecentlyUsedKey;
      let leastRecentlyUsedEntry;

      imageUris.forEach((uri) => {
        const entry = entries[uri];
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
        delete entries[leastRecentlyUsedKey];
      }
    }
  }
}

export type ImageSize = {
  width: number,
  height: number
};

let id = 0;
const requests: Record<string, HTMLImageElement> = {};

const ImageLoader = {
  abort(requestId: number) {
    let image: ?HTMLImageElement = requests[`${requestId}`];

    if (image) {
      image.onerror = null;
      image.onload = null;
      image = null;
      delete requests[`${requestId}`];
    }
  },
  generateRequestId(): number {
    id += 1;
    return id;
  },
  getSize(
    uri: string,
    success?: (width: number, height: number) => void,
    failure?: (error: unknown) => void
  ): void | Promise<ImageSize> {
    const requestId = ImageLoader.generateRequestId();
    const request = ImageLoader.load(uri, requestId);
    const image = requests[`${requestId}`];

    const promise = request.then(() => {
      if (image.naturalHeight && image.naturalWidth) {
        return {
          width: image.naturalWidth,
          height: image.naturalHeight
        };
      }

      throw new Error(`Failed to get size for image: ${uri}`);
    });

    if (typeof success !== 'function') {
      return promise;
    }

    promise
      .then((size) => success(size.width, size.height))
      .catch((error) => {
        if (failure != null) {
          failure(error);
        } else {
          console.warn('Failed to get size for image: ' + uri);
        }
      });
  },
  has(uri: string): boolean {
    return ImageUriCache.has(uri);
  },
  load(uri: string, requestId: number): Promise<{ nativeEvent: Event }> {
    return new Promise((resolve, reject) => {
      const image = new window.Image();

      image.onerror = () => {
        ImageLoader.abort(requestId);
        reject(new Error(`Failed to load image: ${uri}`));
      };

      image.onload = (e) => {
        // avoid blocking the main thread
        const onDecode = () => {
          if (requests[`${requestId}`] === image) {
            ImageLoader.abort(requestId);
            resolve({ nativeEvent: e });
          }
        };

        // Safari currently throws exceptions when decoding svgs.
        // We want to catch that error and allow the load handler
        // to be forwarded to the onLoad handler in this case
        image.decode().then(onDecode, onDecode);
      };

      image.src = uri;
      requests[`${requestId}`] = image;
    });
  },
  prefetch(uri: string): Promise<void> {
    return ImageLoader.load(uri, ImageLoader.generateRequestId()).then(() => {
      // Add the uri to the cache so it can be immediately displayed when used
      // but also immediately remove it to correctly reflect that it has no active references
      ImageUriCache.add(uri);
      ImageUriCache.remove(uri);
    });
  },
  queryCache(uris: Array<string>): Promise<Record<string, 'disk/memory'>> {
    const result: Record<string, 'disk/memory'> = {};

    uris.forEach((u) => {
      if (ImageUriCache.has(u)) {
        result[u] = 'disk/memory';
      }
    });

    return Promise.resolve(result);
  }
};

export default ImageLoader;
