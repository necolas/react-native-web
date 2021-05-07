/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var dataUriPattern = /^data:/;
export var ImageUriCache = /*#__PURE__*/function () {
  function ImageUriCache() {}

  ImageUriCache.has = function has(uri) {
    var entries = ImageUriCache._entries;
    var isDataUri = dataUriPattern.test(uri);
    return isDataUri || Boolean(entries[uri]);
  };

  ImageUriCache.add = function add(uri) {
    var entries = ImageUriCache._entries;
    var lastUsedTimestamp = Date.now();

    if (entries[uri]) {
      entries[uri].lastUsedTimestamp = lastUsedTimestamp;
      entries[uri].refCount += 1;
    } else {
      entries[uri] = {
        lastUsedTimestamp: lastUsedTimestamp,
        refCount: 1
      };
    }
  };

  ImageUriCache.remove = function remove(uri) {
    var entries = ImageUriCache._entries;

    if (entries[uri]) {
      entries[uri].refCount -= 1;
    } // Free up entries when the cache is "full"


    ImageUriCache._cleanUpIfNeeded();
  };

  ImageUriCache._cleanUpIfNeeded = function _cleanUpIfNeeded() {
    var entries = ImageUriCache._entries;
    var imageUris = Object.keys(entries);

    if (imageUris.length + 1 > ImageUriCache._maximumEntries) {
      var leastRecentlyUsedKey;
      var leastRecentlyUsedEntry;
      imageUris.forEach(function (uri) {
        var entry = entries[uri];

        if ((!leastRecentlyUsedEntry || entry.lastUsedTimestamp < leastRecentlyUsedEntry.lastUsedTimestamp) && entry.refCount === 0) {
          leastRecentlyUsedKey = uri;
          leastRecentlyUsedEntry = entry;
        }
      });

      if (leastRecentlyUsedKey) {
        delete entries[leastRecentlyUsedKey];
      }
    }
  };

  return ImageUriCache;
}();
ImageUriCache._maximumEntries = 256;
ImageUriCache._entries = {};
var id = 0;
var requests = {};
var ImageLoader = {
  abort: function abort(requestId) {
    var image = requests["" + requestId];

    if (image) {
      image.onerror = null;
      image.onload = null;
      image = null;
      delete requests["" + requestId];
    }
  },
  getSize: function getSize(uri, success, failure) {
    var complete = false;
    var interval = setInterval(callback, 16);
    var requestId = ImageLoader.load(uri, callback, errorCallback);

    function callback() {
      var image = requests["" + requestId];

      if (image) {
        var naturalHeight = image.naturalHeight,
            naturalWidth = image.naturalWidth;

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
  has: function has(uri) {
    return ImageUriCache.has(uri);
  },
  load: function load(uri, onLoad, onError) {
    id += 1;
    var image = new window.Image();
    image.onerror = onError;

    image.onload = function (e) {
      // avoid blocking the main thread
      var onDecode = function onDecode() {
        return onLoad({
          nativeEvent: e
        });
      };

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
    requests["" + id] = image;
    return id;
  },
  prefetch: function prefetch(uri) {
    return new Promise(function (resolve, reject) {
      ImageLoader.load(uri, function () {
        // Add the uri to the cache so it can be immediately displayed when used
        // but also immediately remove it to correctly reflect that it has no active references
        ImageUriCache.add(uri);
        ImageUriCache.remove(uri);
        resolve();
      }, reject);
    });
  },
  queryCache: function queryCache(uris) {
    var result = {};
    uris.forEach(function (u) {
      if (ImageUriCache.has(u)) {
        result[u] = 'disk/memory';
      }
    });
    return Promise.resolve(result);
  }
};
export default ImageLoader;