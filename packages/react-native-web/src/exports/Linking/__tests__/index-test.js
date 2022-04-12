/* eslint-env jasmine, jest */

import Linking from '..';

describe('apis/Linking', () => {
  describe('openURL', () => {
    test('calls open with a url and target', done => {
      jest.spyOn(window, 'open').mockImplementationOnce((url, target, opener) => {
        expect(url).toBe('http://foo.com/');
        expect(target).toBe('target_name');
        expect(opener).toBe('noopener');
        done();
      });
      Linking.openURL('http://foo.com', 'target_name');
    });

    test('defaults target to _blank if not provided', done => {
      jest.spyOn(window, 'open').mockImplementationOnce((url, target, opener) => {
        expect(url).toBe('http://foo.com/');
        expect(target).toBe('_blank');
        expect(opener).toBe('noopener');
        done();
      });
      Linking.openURL('http://foo.com');
    });

    test('accepts undefined as a target', done => {
      jest.spyOn(window, 'open').mockImplementationOnce((url, target, opener) => {
        expect(url).toBe('http://foo.com/');
        expect(target).toBe(undefined);
        expect(opener).toBe('noopener');
        done();
      });
      Linking.openURL('http://foo.com', undefined);
    });
  });
});
