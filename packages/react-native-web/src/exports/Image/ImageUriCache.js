/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export default class ImageUriCache {
  static _maximumEntries: number = 256;
  static _entries = {};

  static has(cacheId: string) {
    const entries = ImageUriCache._entries;
    return Boolean(entries[cacheId]);
  }

  static get(cacheId: string) {
    const entries = ImageUriCache._entries;
    return entries[cacheId];
  }

  static add(cacheId: string, displayImageUri: string) {
    const entries = ImageUriCache._entries;
    const lastUsedTimestamp = Date.now();
    if (entries[cacheId]) {
      entries[cacheId].lastUsedTimestamp = lastUsedTimestamp;
      entries[cacheId].refCount += 1;
    } else {
      entries[cacheId] = {
        lastUsedTimestamp,
        refCount: 1,
        displayImageUri
      };
    }
  }

  static remove(cacheId: string) {
    const entries = ImageUriCache._entries;
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
