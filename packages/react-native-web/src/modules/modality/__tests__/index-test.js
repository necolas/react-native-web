/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getModality, getActiveModality, testOnly_resetActiveModality } from '..';
import {
  describeWithPointerEvent,
  testWithPointerType,
  clearPointers,
  createEventTarget,
  setPointerEvent,
} from 'dom-event-testing-library';

describeWithPointerEvent('modules/modality', (hasPointerEvent) => {
  let rootNode;

  beforeEach(() => {
    setPointerEvent(hasPointerEvent);
    rootNode = document.createElement('div');
    document.body.appendChild(rootNode);
  });

  afterEach(() => {
    document.body.removeChild(rootNode);
    rootNode = null;
    clearPointers();
    testOnly_resetActiveModality();
  });

  describe('getModality', () => {
    testWithPointerType('reflects currently-in-use modality', (pointerType) => {
      const target = createEventTarget(rootNode);
      expect(getModality()).toBe('keyboard');
      target.pointerdown({ pointerType });
      expect(getModality()).toBe(pointerType);
      target.pointerup({ pointerType });
      target.keydown();
      expect(getModality()).toBe('keyboard');
      if (pointerType !== 'touch') {
        target.pointermove({ pointerType });
        expect(getModality()).toBe(pointerType);
        target.keydown();
        expect(getModality()).toBe('keyboard');
      }
    });
  });

  describe('getActiveModality', () => {
    testWithPointerType('reflects last actively used modality', (pointerType) => {
      const target = createEventTarget(rootNode);
      expect(getActiveModality()).toBe('keyboard');
      target.pointerdown({ pointerType });
      expect(getActiveModality()).toBe(pointerType);
      target.pointerup({ pointerType });
      target.keydown();
      if (pointerType !== 'touch') {
        target.pointermove({ pointerType });
        expect(getActiveModality()).toBe('keyboard');
      }
    });
  });
});
