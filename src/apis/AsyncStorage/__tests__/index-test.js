/* eslint-env jasmine, jest */
import AsyncStorage from '..';

const originalLocalStorage = window.localStorage;

let obj = {};
const mockLocalStorage = {
  length: 0,
  clear() {
    obj = {};
    mockLocalStorage.length = 0;
  },
  getItem(key) {
    return obj[key];
  },
  key(index) {
    return Object.keys(obj)[index];
  },
  removeItem(key) {
    delete obj[key];
    mockLocalStorage.length -= 1;
  },
  setItem(key, value) {
    obj[key] = value;
    mockLocalStorage.length += 1;
  }
};

const uid123Object = {
  name: 'Chris',
  age: 30,
  traits: { hair: 'brown', eyes: 'green' }
};
const uid123Delta = {
  age: 31,
  traits: { eyes: 'blue', shoe_size: 10 }
};
const uid124Object = {
  name: 'Amy',
  age: 28,
  traits: { hair: 'black', eyes: 'brown' }
};

describe('apis/AsyncStorage', () => {
  beforeEach(() => {
    mockLocalStorage.setItem('UID123', JSON.stringify(uid123Object));
    mockLocalStorage.setItem('UID124', JSON.stringify(uid124Object));
    window.localStorage = mockLocalStorage;
  });

  afterEach(() => {
    mockLocalStorage.clear();
    window.localStorage = originalLocalStorage;
  });

  describe('clear', () => {
    const assertResult = () => {
      expect(mockLocalStorage.length).toEqual(0);
    };

    test('promise of erased keys', () => {
      expect(mockLocalStorage.length).toEqual(2);
      return AsyncStorage.clear().then(() => {
        assertResult();
      });
    });

    test('calls callback after erasing keys', done => {
      expect(mockLocalStorage.length).toEqual(2);
      AsyncStorage.clear(err => {
        expect(err).toEqual(null);
        assertResult();
        done();
      });
    });
  });

  describe('getAllKeys', () => {
    const assertResult = result => {
      expect(result).toEqual(['UID123', 'UID124']);
    };

    test('promise of keys', () => {
      return AsyncStorage.getAllKeys().then(result => {
        assertResult(result);
      });
    });

    test('calls callback with keys', done => {
      AsyncStorage.getAllKeys((err, result) => {
        expect(err).toEqual(null);
        assertResult(result);
        done();
      });
    });
  });

  describe('getItem', () => {
    const assertResult = result => {
      expect(result).toEqual(JSON.stringify(uid123Object));
    };

    test('promise of item', () => {
      return AsyncStorage.getItem('UID123').then(result => {
        assertResult(result);
      });
    });

    test('calls callback with item', done => {
      AsyncStorage.getItem('UID123', (err, result) => {
        expect(err).toEqual(null);
        assertResult(result);
        done();
      });
    });
  });

  describe('multiGet', () => {
    const assertResult = result => {
      expect(result).toEqual([
        ['UID123', JSON.stringify(uid123Object)],
        ['UID124', JSON.stringify(uid124Object)]
      ]);
    };

    test('promise of items', () => {
      return AsyncStorage.multiGet(['UID123', 'UID124']).then(result => {
        assertResult(result);
      });
    });

    test('calls callback with items', done => {
      AsyncStorage.multiGet(['UID123', 'UID124'], (err, result) => {
        expect(err).toEqual(null);
        assertResult(result);
        done();
      });
    });
  });

  describe('setItem', () => {
    const assertResult = () => {
      expect(mockLocalStorage.getItem('UID123')).toEqual(JSON.stringify(uid123Object));
    };

    test('promise after setting item', () => {
      return AsyncStorage.setItem('UID123', JSON.stringify(uid123Object)).then(() => {
        assertResult();
      });
    });

    test('calls callback after setting item', done => {
      AsyncStorage.setItem('UID123', JSON.stringify(uid123Object), (err, result) => {
        expect(err).toEqual(null);
        assertResult();
        done();
      });
    });
  });

  describe('multiSet', () => {
    const assertResult = result => {
      expect(mockLocalStorage.getItem('UID123')).toEqual(JSON.stringify(uid123Object));
      expect(mockLocalStorage.getItem('UID124')).toEqual(JSON.stringify(uid124Object));
    };

    test('promise after setting items', () => {
      return AsyncStorage.multiSet([
        ['UID123', JSON.stringify(uid123Object)],
        ['UID124', JSON.stringify(uid124Object)]
      ]).then(() => {
        assertResult();
      });
    });

    test('calls callback after setting items', done => {
      AsyncStorage.multiSet(
        [['UID123', JSON.stringify(uid123Object)], ['UID124', JSON.stringify(uid124Object)]],
        (err, result) => {
          expect(err).toEqual(null);
          assertResult();
          done();
        }
      );
    });
  });

  describe('mergeItem', () => {
    const assertResult = () => {
      expect(JSON.parse(mockLocalStorage.getItem('UID123'))).toMatchSnapshot();
    };

    test('promise after setting item', () => {
      return AsyncStorage.mergeItem('UID123', JSON.stringify(uid123Delta)).then(() => {
        assertResult();
      });
    });

    test('calls callback after setting item', done => {
      AsyncStorage.mergeItem('UID123', JSON.stringify(uid123Delta), (err, result) => {
        expect(err).toEqual(null);
        assertResult();
        done();
      });
    });
  });

  describe('multiMerge', () => {
    const assertResult = result => {
      expect(JSON.parse(mockLocalStorage.getItem('UID123'))).toMatchSnapshot();
      expect(JSON.parse(mockLocalStorage.getItem('UID124'))).toMatchSnapshot();
    };

    test('promise after setting items', () => {
      return AsyncStorage.multiMerge([
        ['UID123', JSON.stringify(uid123Delta)],
        ['UID124', JSON.stringify(uid123Delta)]
      ]).then(() => {
        assertResult();
      });
    });

    test('calls callback after setting items', done => {
      AsyncStorage.multiMerge(
        [['UID123', JSON.stringify(uid123Delta)], ['UID124', JSON.stringify(uid123Delta)]],
        (err, result) => {
          expect(err).toEqual(null);
          assertResult();
          done();
        }
      );
    });
  });

  describe('removeItem', () => {
    const assertResult = () => {
      expect(mockLocalStorage.getItem('UID123')).toBeUndefined();
    };

    test('promise after setting item', () => {
      return AsyncStorage.removeItem('UID123').then(() => {
        assertResult();
      });
    });

    test('calls callback after setting item', done => {
      AsyncStorage.removeItem('UID123', (err, result) => {
        expect(err).toEqual(null);
        assertResult();
        done();
      });
    });
  });

  describe('multiRemove', () => {
    const assertResult = result => {
      expect(mockLocalStorage.getItem('UID123')).toBeUndefined();
      expect(mockLocalStorage.getItem('UID124')).toBeUndefined();
    };

    test('promise after setting items', () => {
      return AsyncStorage.multiRemove(['UID123', 'UID124']).then(() => {
        assertResult();
      });
    });

    test('calls callback after setting items', done => {
      AsyncStorage.multiRemove(['UID123', 'UID124'], (err, result) => {
        expect(err).toEqual(null);
        assertResult();
        done();
      });
    });
  });
});
