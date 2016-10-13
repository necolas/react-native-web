/* eslint-env mocha */
import assert from 'assert';
import AsyncStorage from '..';

const waterfall = (fns, cb) => {
  const _waterfall = (...args) => {
    const fn = (fns || []).shift();
    if (typeof fn === 'function') {
      fn(...args, (err, ...nextArgs) => {
        if (err) {
          return cb(err);
        } else {
          return _waterfall(...nextArgs);
        }
      });
    } else {
      cb(null, ...args);
    }
  };
  _waterfall();
};

suite('apis/AsyncStorage', () => {
  suite('mergeLocalStorageItem', () => {
    test('should have same behavior as react-native', (done) => {
      // https://facebook.github.io/react-native/docs/asyncstorage.html
      const UID123_object = {
        name: 'Chris',
        age: 30,
        traits: { hair: 'brown', eyes: 'brown' }
      };
      const UID123_delta = {
        age: 31,
        traits: { eyes: 'blue', shoe_size: 10 }
      };
      waterfall([
        (cb) => {
          AsyncStorage.setItem('UID123', JSON.stringify(UID123_object))
            .then(() => cb(null))
            .catch(cb);
        },
        (cb) => {
          AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta))
            .then(() => cb(null))
            .catch(cb);
        },
        (cb) => {
          AsyncStorage.getItem('UID123')
            .then((result) => {
              cb(null, JSON.parse(result));
            })
            .catch(cb);
        }
      ], (err, result) => {
        assert.equal(err, null);
        assert.deepEqual(result, {
          'name': 'Chris', 'age': 31, 'traits': {
            'shoe_size': 10, 'hair': 'brown', 'eyes': 'blue'
          }
        });
        done();
      });
    });
  });
});
