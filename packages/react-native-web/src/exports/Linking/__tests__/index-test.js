import Linking from '..';

describe('apis/Linking', () => {
  describe('openURL', () => {
    test('calls open with a url and target', (done) => {
      jest
        .spyOn(window, 'open')
        .mockImplementationOnce((url, target, opener) => {
          expect(url).toBe('http://foo.com/');
          expect(target).toBe('_self');
          expect(opener).toBe('noopener');
          done();
        });
      Linking.openURL('http://foo.com', '_self');
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
    expect(first).toHaveBeenCalledWith('https://example.com');
    expect(second).toHaveBeenCalledTimes(1);
  });

  test('removing a listener keeps other callbacks with identical source', async () => {
    const first = jest.fn();
    const second = jest.fn();
    expect(first.toString()).toBe(second.toString());
    const subscription = subscribe(first);
    subscribe(second);

    subscription.remove();
    await Linking.openURL('https://example.com');

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  test('removing one subscription keeps other registrations of the same callback', async () => {
    const callback = jest.fn();
    const subscription = subscribe(callback);
    subscribe(callback);

    subscription.remove();
    subscription.remove();
    await Linking.openURL('https://example.com');

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('listenerCount counts each subscription', () => {
    const callback = jest.fn();
    expect(Linking.listenerCount('onOpen')).toBe(0);

    const subscription = subscribe(callback);
    subscribe(callback);
    expect(Linking.listenerCount('onOpen')).toBe(2);

    subscription.remove();
    expect(Linking.listenerCount('onOpen')).toBe(1);
  });

  test('removeAllListeners removes the listeners of one event', () => {
    const first = jest.fn();
    const second = jest.fn();
    subscribe(first);
    const other = Linking.addEventListener('other', second);
    subscriptions.push(other);

    Linking.removeAllListeners('onOpen');
    Linking.emit('onOpen', 'a');
    Linking.emit('other', 'b');

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith('b');
  });
});
