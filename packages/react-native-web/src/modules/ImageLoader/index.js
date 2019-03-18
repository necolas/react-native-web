/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

let id = 0;
const requests = {};

const ImageLoader = {
  abort(requestId: number) {
    let image = requests[`${requestId}`];
    if (image) {
      image.onerror = image.onload = image = null;
      delete requests[`${requestId}`];
    }
  },
  getSize(uri, success, failure) {
    let complete = false;
    const interval = setInterval(callback, 16);
    const requestId = ImageLoader.load(uri, callback, errorCallback);

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
  load(uri, onLoad, onError): number {
    id += 1;
    const image = new window.Image();
    image.onerror = onError;
    image.onload = e => {
      // avoid blocking the main thread
      const onDecode = () => onLoad(e);
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
    requests[`${id}`] = image;
    return id;
  },
  prefetch(uri): Promise {
    return new Promise((resolve, reject) => {
      ImageLoader.load(uri, resolve, reject);
    });
  }
};

export default ImageLoader;
