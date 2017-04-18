class ImageUriCache {
  static _maximumItems: number = 256;
  static _entries = {};

  static has(uri: string) {
    const entries = ImageUriCache._entries;
    const isDataUri = /^data:/.test(uri);
    return isDataUri || Boolean(entries[uri]);
  }

  static add(uri: string) {
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
  }

  static remove(uri: string) {
    const entries = ImageUriCache._entries;
    if (entries[uri]) {
      entries[uri].refCount -= 1;
    }
    ImageUriCache._cleanUpIfNeeded();
  }

  // If the cache is "full", remove the oldest unused entry (if any)
  static _cleanUpIfNeeded() {
    const entries = ImageUriCache._entries;
    const entriesArray = Object.keys(entries);

    if (entriesArray.length + 1 > ImageUriCache._maximumItems) {
      let oldestUnusedKey;
      let oldestUnusedEntry;

      entriesArray.forEach(key => {
        const entry = entries[key];
        if (
          (!oldestUnusedEntry || entry.lastUsedTimestamp < oldestUnusedEntry.lastUsedTimestamp) &&
          entry.refCount === 0
        ) {
          oldestUnusedKey = key;
          oldestUnusedEntry = entry;
        }
      });

      if (oldestUnusedKey) {
        delete entries[oldestUnusedKey];
      }
    }
  }
}

module.exports = ImageUriCache;
