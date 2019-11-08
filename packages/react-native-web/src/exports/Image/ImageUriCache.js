/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ImageLoader from '../../modules/ImageLoader';

type ImageSource =
  | string
  | number
  | {
      method: ?string,
      uri: ?string,
      headers: ?Object,
      body: ?string
    };

export default class ImageUriCache {
  static _maximumEntries: number = 256;
  static _entries = {};

  static createCacheId(source: ImageSource) {
    return JSON.stringify(ImageLoader.resolveSource(source));
  }

  static has(source: ImageSource) {
    const entries = ImageUriCache._entries;
    const cacheId = ImageUriCache.createCacheId(source);
    return Boolean(entries[cacheId]);
  }

  static get(source: ImageSource) {
    const entries = ImageUriCache._entries;
    const cacheId = ImageUriCache.createCacheId(source);
    return entries[cacheId];
  }

  static add(source: ImageSource, displayImageUri: ?string) {
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

  static remove(source: ImageSource) {
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
