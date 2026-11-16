/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ImageLoader from '..';

const originalImage = window.Image;
const uri = 'https://test.com/img.jpg';

const flushPromises = () =>
  new Promise((resolve) => jest.requireActual('timers').setImmediate(resolve));

describe('modules/ImageLoader', () => {
  let images;

  function loadImage({ width = 0, height = 0 } = {}) {
    const image = images[0];
    image.naturalWidth = width;
    image.naturalHeight = height;
    image.onload({});
    return image;
  }

  beforeEach(() => {
    images = [];
    window.Image = jest.fn(() => {
      const image = { decode: () => Promise.resolve() };
      images.push(image);
      return image;
    });
  });

  afterEach(() => {
    window.Image = originalImage;
  });

  test('load resolves and releases the image', async () => {
    const promise = ImageLoader.load(uri, ImageLoader.generateRequestId());
    const image = loadImage();
    await expect(promise).resolves.toEqual({ nativeEvent: {} });
    expect(image.onload).toBeNull();
    expect(image.onerror).toBeNull();
  });

  test('load rejects and releases the image on error', async () => {
    const promise = ImageLoader.load(uri, ImageLoader.generateRequestId());
    const image = images[0];
    image.onerror();
    await expect(promise).rejects.toThrow(`Failed to load image: ${uri}`);
    expect(image.onload).toBeNull();
    expect(image.onerror).toBeNull();
  });

  test('load does not settle if aborted while the image decodes', async () => {
    const requestId = ImageLoader.generateRequestId();
    const onSettle = jest.fn();
    ImageLoader.load(uri, requestId).then(onSettle, onSettle);
    loadImage();
    ImageLoader.abort(requestId);
    await flushPromises();
    expect(onSettle).not.toHaveBeenCalled();
  });

  test('getSize resolves with the image size', async () => {
    const promise = ImageLoader.getSize(uri);
    loadImage({ width: 100, height: 50 });
    await expect(promise).resolves.toEqual({ width: 100, height: 50 });
  });

  test('getSize rejects when the image has no size', async () => {
    const promise = ImageLoader.getSize(uri);
    loadImage();
    await expect(promise).rejects.toThrow(
      `Failed to get size for image: ${uri}`
    );
  });

  test('getSize passes the error thrown by success to failure', async () => {
    const error = new Error('success failed');
    const success = jest.fn(() => {
      throw error;
    });
    const failure = jest.fn();
    ImageLoader.getSize(uri, success, failure);
    loadImage({ width: 100, height: 50 });
    await flushPromises();
    expect(success).toHaveBeenCalledWith(100, 50);
    expect(failure).toHaveBeenCalledWith(error);
  });
});
