/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { Touch, TouchEvent } from './ResponderEventTypes';
import { isStartish, isMoveish, isEndish } from './ResponderEventTypes';

type TouchRecord = {|
  touchActive: boolean,
  startPageX: number,
  startPageY: number,
  startTimeStamp: number,
  currentPageX: number,
  currentPageY: number,
  currentTimeStamp: number,
  previousPageX: number,
  previousPageY: number,
  previousTimeStamp: number
|};

/**
 * Tracks the position and time of each active touch by `touch.identifier`. We
 * should typically only see IDs in the range of 1-20 because IDs get recycled
 * when touches end and start again.
 */

const __DEV__ = process.env.NODE_ENV !== 'production';
const MAX_TOUCH_BANK = 20;

function timestampForTouch(touch: Touch): number {
  // The legacy internal implementation provides "timeStamp", which has been
  // renamed to "timestamp".
  return (touch: any).timeStamp || touch.timestamp;
}

/**
 * TODO: Instead of making gestures recompute filtered velocity, we could
 * include a built in velocity computation that can be reused globally.
 */
function createTouchRecord(touch: Touch): TouchRecord {
  return {
    touchActive: true,
    startPageX: touch.pageX,
    startPageY: touch.pageY,
    startTimeStamp: timestampForTouch(touch),
    currentPageX: touch.pageX,
    currentPageY: touch.pageY,
    currentTimeStamp: timestampForTouch(touch),
    previousPageX: touch.pageX,
    previousPageY: touch.pageY,
    previousTimeStamp: timestampForTouch(touch)
  };
}

function resetTouchRecord(touchRecord: TouchRecord, touch: Touch): void {
  touchRecord.touchActive = true;
  touchRecord.startPageX = touch.pageX;
  touchRecord.startPageY = touch.pageY;
  touchRecord.startTimeStamp = timestampForTouch(touch);
  touchRecord.currentPageX = touch.pageX;
  touchRecord.currentPageY = touch.pageY;
  touchRecord.currentTimeStamp = timestampForTouch(touch);
  touchRecord.previousPageX = touch.pageX;
  touchRecord.previousPageY = touch.pageY;
  touchRecord.previousTimeStamp = timestampForTouch(touch);
}

function getTouchIdentifier({ identifier }: Touch): number {
  if (identifier == null) {
    console.error('Touch object is missing identifier.');
  }
  if (__DEV__) {
    if (identifier > MAX_TOUCH_BANK) {
      console.error(
        'Touch identifier %s is greater than maximum supported %s which causes ' +
          'performance issues backfilling array locations for all of the indices.',
        identifier,
        MAX_TOUCH_BANK
      );
    }
  }
  return identifier;
}

function printTouch(touch: Touch): string {
  return JSON.stringify({
    identifier: touch.identifier,
    pageX: touch.pageX,
    pageY: touch.pageY,
    timestamp: timestampForTouch(touch)
  });
}

export default class ResponderTouchHistoryStore {
  _touchBank: Array<TouchRecord> = [];
  _touchHistory = {
    touchBank: this._touchBank,
    numberActiveTouches: 0,
    // If there is only one active touch, we remember its location. This prevents
    // us having to loop through all of the touches all the time in the most
    // common case.
    indexOfSingleActiveTouch: -1,
    mostRecentTimeStamp: 0
  };

  recordTouchTrack(topLevelType: string, nativeEvent: TouchEvent): void {
    if (isMoveish(topLevelType)) {
      nativeEvent.changedTouches.forEach(this._recordTouchMove);
    } else if (isStartish(topLevelType)) {
      nativeEvent.changedTouches.forEach(this._recordTouchStart);
      this._touchHistory.numberActiveTouches = nativeEvent.touches.length;
      if (this._touchHistory.numberActiveTouches === 1) {
        this._touchHistory.indexOfSingleActiveTouch = nativeEvent.touches[0].identifier;
      }
    } else if (isEndish(topLevelType)) {
      nativeEvent.changedTouches.forEach(this._recordTouchEnd);
      this._touchHistory.numberActiveTouches = nativeEvent.touches.length;
      if (this._touchHistory.numberActiveTouches === 1) {
        for (let i = 0; i < this._touchBank.length; i++) {
          const touchTrackToCheck = this._touchBank[i];
          if (touchTrackToCheck != null && touchTrackToCheck.touchActive) {
            this._touchHistory.indexOfSingleActiveTouch = i;
            break;
          }
        }
        if (__DEV__) {
          const activeRecord = this._touchBank[this._touchHistory.indexOfSingleActiveTouch];
          if (!(activeRecord != null && activeRecord.touchActive)) {
            console.error('Cannot find single active touch.');
          }
        }
      }
    }
  }

  _printTouchBank(): string {
    let printed = JSON.stringify(this._touchBank.slice(0, MAX_TOUCH_BANK));
    if (this._touchBank.length > MAX_TOUCH_BANK) {
      printed += ' (original size: ' + this._touchBank.length + ')';
    }
    return printed;
  }

  _recordTouchStart = (touch: Touch): void => {
    const identifier = getTouchIdentifier(touch);
    const touchRecord = this._touchBank[identifier];
    if (touchRecord) {
      resetTouchRecord(touchRecord, touch);
    } else {
      this._touchBank[identifier] = createTouchRecord(touch);
    }
    this._touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
  };

  _recordTouchMove = (touch: Touch): void => {
    const touchRecord = this._touchBank[getTouchIdentifier(touch)];
    if (touchRecord) {
      touchRecord.touchActive = true;
      touchRecord.previousPageX = touchRecord.currentPageX;
      touchRecord.previousPageY = touchRecord.currentPageY;
      touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
      touchRecord.currentPageX = touch.pageX;
      touchRecord.currentPageY = touch.pageY;
      touchRecord.currentTimeStamp = timestampForTouch(touch);
      this._touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
    } else {
      console.warn(
        'Cannot record touch move without a touch start.\n',
        `Touch Move: ${printTouch(touch)}\n`,
        `Touch Bank: ${this._printTouchBank()}`
      );
    }
  };

  _recordTouchEnd = (touch: Touch): void => {
    const touchRecord = this._touchBank[getTouchIdentifier(touch)];
    if (touchRecord) {
      touchRecord.touchActive = false;
      touchRecord.previousPageX = touchRecord.currentPageX;
      touchRecord.previousPageY = touchRecord.currentPageY;
      touchRecord.previousTimeStamp = touchRecord.currentTimeStamp;
      touchRecord.currentPageX = touch.pageX;
      touchRecord.currentPageY = touch.pageY;
      touchRecord.currentTimeStamp = timestampForTouch(touch);
      this._touchHistory.mostRecentTimeStamp = timestampForTouch(touch);
    } else {
      console.warn(
        'Cannot record touch end without a touch start.\n',
        `Touch End: ${printTouch(touch)}\n`,
        `Touch Bank: ${this._printTouchBank()}`
      );
    }
  };
}
