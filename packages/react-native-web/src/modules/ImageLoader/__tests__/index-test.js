import ImageLoader from '../index';

const testImage =
  'data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAADwAgCdASoXABMAPi0QhkKhoQ36AAwBYllAHYAAajokAAD+/SFF//G83mta3//9QZ/5Bn/kGfp4AAAA';
const testImageWidth = 23;
const testImageHeight = 19;

const DefaultImage = window.Image;

describe('ImageLoader', () => {
  afterEach(() => {
    window.Image = DefaultImage;
  });

  test('Success callback is called when image loads', async () => {
    window.Image = MockImage;
    const successCallback = jest.fn();
    const failureCallback = jest.fn();
    ImageLoader.getSize(testImage, successCallback, failureCallback);
    await jest.runAllTimers();
    expect(failureCallback).toHaveBeenCalledTimes(0);
    expect(successCallback).toHaveBeenCalledTimes(1);
    expect(successCallback).toHaveBeenCalledWith(
      testImageWidth,
      testImageHeight
    );
  });

  test('Failure callback is called when image fails to load', async () => {
    window.Image = NotLoadingMockImage;
    const successCallback = jest.fn();
    const failureCallback = jest.fn();
    ImageLoader.getSize(testImage, successCallback, failureCallback);
    await jest.runAllTimers();
    expect(failureCallback).toHaveBeenCalledTimes(1);
    expect(successCallback).toHaveBeenCalledTimes(0);
  });

  test('Failure callback is called when image fails to decode', async () => {
    window.Image = NotDecodingMockImage;
    const successCallback = jest.fn();
    const failureCallback = jest.fn();
    ImageLoader.getSize(testImage, successCallback, failureCallback);
    await jest.runAllTimers();
    expect(failureCallback).toHaveBeenCalledTimes(1);
    expect(successCallback).toHaveBeenCalledTimes(0);
  });
});

class MockImage {
  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
    this._src = '';
  }
  get src() {
    return this._src;
  }
  set src(uri) {
    this._src = uri;
    window.setTimeout(this.onload, 0);
  }
  decode() {
    this.naturalWidth = testImageWidth;
    this.naturalHeight = testImageHeight;
    return Promise.resolve();
  }
  onerror() {}
  onload() {}
}

class NotLoadingMockImage extends MockImage {
  set src(uri) {
    this._src = uri;
    window.setTimeout(this.onerror, 0);
  }
}

class NotDecodingMockImage extends MockImage {
  decode() {
    return Promise.reject();
  }
}
