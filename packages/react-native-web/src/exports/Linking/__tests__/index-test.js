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

  describe('listeners', () => {
    afterEach(() => {
      Linking.removeAllListeners('onOpen');
      Linking.removeAllListeners('other');
      jest.restoreAllMocks();
    });

    test('registers each subscription once and removes only itself', async () => {
      jest.spyOn(window, 'open').mockImplementation(() => {});
      // jest.fn() instances have identical source
      const first = jest.fn();
      const second = jest.fn();
      const subscription = Linking.addEventListener('onOpen', first);
      Linking.addEventListener('onOpen', first);
      Linking.addEventListener('onOpen', second);
      expect(Linking.listenerCount('onOpen')).toBe(3);

      subscription.remove();
      subscription.remove();
      expect(Linking.listenerCount('onOpen')).toBe(2);

      await Linking.openURL('https://example.com');
      expect(first).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledWith('https://example.com');
    });

    test('emit calls only the listeners present when it starts', () => {
      let isAdded = false;
      const first = jest.fn(() => {
        secondSubscription.remove();
        if (!isAdded) {
          isAdded = true;
          Linking.addListener('onOpen', first);
        }
      });
      const second = jest.fn();
      Linking.addListener('onOpen', first);
      const secondSubscription = Linking.addListener('onOpen', second);

      Linking.emit('onOpen');
      expect(first).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledTimes(1);

      Linking.emit('onOpen');
      expect(first).toHaveBeenCalledTimes(3);
      expect(second).toHaveBeenCalledTimes(1);
    });

    test('removeAllListeners clears one event type and requires a type', () => {
      const first = jest.fn();
      const other = jest.fn();
      Linking.addListener('onOpen', first);
      Linking.addListener('other', other);

      Linking.removeAllListeners('onOpen');
      Linking.emit('onOpen');
      Linking.emit('other');

      expect(first).not.toHaveBeenCalled();
      expect(other).toHaveBeenCalledTimes(1);
      expect(() => Linking.removeAllListeners()).toThrow();
    });
  });

  test('sendIntent rejects as unsupported', async () => {
    await expect(Linking.sendIntent('action')).rejects.toThrow('Unsupported');
  });
});
