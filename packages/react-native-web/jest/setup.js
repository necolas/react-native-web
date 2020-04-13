/* eslint-env jasmine, jest */

'use strict';

global.__DEV__ = true;

const mockEmptyObject = {};

// Make sure snapshots contain the original style objects
jest.mock('../dist/cjs/modules/StyleSheet/ReactNativePropRegistry', () => ({
  register: id => id,
  getByID: () => mockEmptyObject
}));

jest.mock('../dist/modules/StyleSheet/ReactNativePropRegistry', () => ({
  register: id => id,
  getByID: () => mockEmptyObject
}));
