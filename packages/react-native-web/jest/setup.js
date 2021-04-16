/* eslint-env jasmine, jest */

'use strict';

global.__DEV__ = true;

const mockEmptyObject = {};

// Make sure snapshots contain the original style objects
jest.mock('../dist/cjs/exports/StyleSheet/ReactNativePropRegistry', () => ({
  register: (id) => id,
  getByID: () => mockEmptyObject
}));

jest.mock('../dist/exports/StyleSheet/ReactNativePropRegistry', () => ({
  register: (id) => id,
  getByID: () => mockEmptyObject
}));
