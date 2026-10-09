/* eslint-env jasmine, jest */

import Linking from '..';

describe('apis/Linking', () => {
  describe('openURL', () => {
    test('calls open with a url and target', (done) => {
      jest
        .spyOn(window, 'open')
        .mockImplementationOnce((url, target, opener) => {
          expect(url).toBe('http://foo.com/');
          expect(target).toBe('target_name');
          expect(opener).toBe('noopener');
          done();
        });
      Linking.openURL('http://foo.com', 'target_name');
    });

    test('defaults target to _blank if not provided', (done) => {
      jest
        .spyOn(window, 'open')
        .mockImplementationOnce((url, target, opener) => {
          expect(url).toBe('http://foo.com/');
          expect(target).toBe('_blank');
          expect(opener).toBe('noopener');
          done();
        });
      Linking.openURL('http://foo.com');
    });

    test('accepts undefined as a target', (done) => {
      jest
        .spyOn(window, 'open')
        .mockImplementationOnce((url, target, opener) => {
          expect(url).toBe('http://foo.com/');
          expect(target).toBe(undefined);
          expect(opener).toBe('noopener');
          done();
        });
      Linking.openURL('http://foo.com', undefined);
    });
  });
});

describe('apis/Linking event listeners', () => {
  let subscriptions;

  beforeEach(() => {
    subscriptions = [];
    jest.spyOn(window, 'open').mockImplementation(() => {});
  });

  afterEach(() => {
    subscriptions.forEach((subscription) => subscription.remove());
    jest.restoreAllMocks();
  });

  function subscribe(callback) {
    const subscription = Linking.addEventListener('onOpen', callback);
    subscriptions.push(subscription);
    return subscription;
  }

  test('calls each listener once per event', async () => {
    const first = jest.fn();
    const second = jest.fn();
    subscribe(first);
    subscribe(second);

    await Linking.openURL('https://example.com');

    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);
    expect(first).toHaveBeenCalledWith('https://example.com');
  });

  test('removing a listener preserves other callbacks with identical source', async () => {
    const first = jest.fn();
    const second = jest.fn();
    expect(first.toString()).toBe(second.toString());
    const subscription = subscribe(first);
    subscribe(second);

    subscription.remove();
    subscription.remove();
    await Linking.openURL('https://example.com');

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  test('deprecated removal also compares callback identity', async () => {
    const warning = jest.spyOn(console, 'error').mockImplementation(() => {});
    const first = jest.fn();
    const second = jest.fn();
    subscribe(first);
    subscribe(second);

    Linking.removeEventListener('onOpen', first);
    await Linking.openURL('https://example.com');

    expect(warning).toHaveBeenCalledTimes(1);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });
});
