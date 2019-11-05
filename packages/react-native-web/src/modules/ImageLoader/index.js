/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { getAssetByID } from '../AssetRegistry';

let id = 0;
const requests = {};
const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;
const dataUriPattern = /^data:/;

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
    const requestId = ImageLoader.load({ uri }, callback, errorCallback);

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
  load(source, onLoad, onError): number {
    const { uri, method, headers, body } = { uri: '', method: 'GET', headers: {}, ...source };
    id += 1;

    // Create image
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
    if (method === 'GET') {
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
    for (const [name, value] of Object.entries(headers)) {
      request.setRequestHeader(name, value);
    }

    // When the request finished loading, pass it on to the image
    request.onload = () => {
      image.src = window.URL.createObjectURL(request.response);
    };

    // Send the request
    request.send(body);

    return id;
  },
  prefetch(uri): Promise {
    return new Promise((resolve, reject) => {
      ImageLoader.load({ uri }, resolve, reject);
    });
  },
  resolveSource(source) {
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
      const scale = asset.scales[0];
      const scaleSuffix = scale !== 1 ? `@${scale}x` : '';
      resolvedSource.uri = asset
        ? `${asset.httpServerLocation}/${asset.name}${scaleSuffix}.${asset.type}`
        : '';
      resolvedSource.width = asset.width;
      resolvedSource.height = asset.height;
    } else if (typeof source === 'string') {
      resolvedSource.uri = source;
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
  }
};

export default ImageLoader;
