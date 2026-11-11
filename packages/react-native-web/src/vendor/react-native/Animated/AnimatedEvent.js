/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

import type {EventMapping} from './NativeAnimatedModule';

import AnimatedValue from './nodes/AnimatedValue';
import NativeAnimatedHelper from './NativeAnimatedHelper';

import invariant from 'invariant';

import {shouldUseNativeDriver}from  './NativeAnimatedHelper';

export type Mapping = {[key: string]: Mapping, ...} | AnimatedValue;
// Listeners are user callbacks with typed event params, so the args stay `any`.
export type AnimatedEventListener = (...args: ReadonlyArray<any>) => unknown;
export type AnimatedEventHandler = (...args: ReadonlyArray<unknown>) => void;
export type EventConfig = {
  listener?: ?AnimatedEventListener,
  useNativeDriver: boolean,
};

const __DEV__ = process.env.NODE_ENV !== 'production';

export function attachNativeEvent(
  viewRef: ?number,
  eventName: string,
  argMapping: ReadonlyArray<?Mapping>,
): {detach: () => void} {
  // Find animated values in `argMapping` and create an array representing their
  // key path inside the `nativeEvent` object. Ex.: ['contentOffset', 'x'].
  const eventMappings: Array<EventMapping> = [];

  const traverse = (value: unknown, path: Array<string>) => {
    if (value instanceof AnimatedValue) {
      value.__makeNative();

      eventMappings.push({
        nativeEventPath: path,
        animatedValueTag: value.__getNativeTag(),
      });
    } else if (typeof value === 'object') {
      for (const key in value) {
        traverse(value[key], path.concat(key));
      }
    }
  };

  invariant(
    argMapping[0] && argMapping[0].nativeEvent,
    'Native driven events only support animated values contained inside `nativeEvent`.',
  );

  // Assume that the event containing `nativeEvent` is always the first argument.
  traverse(argMapping[0].nativeEvent, []);

  if (viewRef != null) {
    eventMappings.forEach(mapping => {
      NativeAnimatedHelper.API.addAnimatedEventToView(
        viewRef,
        eventName,
        mapping,
      );
    });
  }

  return {
    detach() {
      if (viewRef != null) {
        eventMappings.forEach(mapping => {
          NativeAnimatedHelper.API.removeAnimatedEventFromView(
            viewRef,
            eventName,
            mapping.animatedValueTag,
          );
        });
      }
    },
  };
}

function validateMapping(
  argMapping: ReadonlyArray<?Mapping>,
  args: ReadonlyArray<unknown>,
) {
  const validate = (recMapping: ?Mapping, recEvt: unknown, key: string) => {
    if (recMapping instanceof AnimatedValue) {
      invariant(
        typeof recEvt === 'number',
        'Bad mapping of event key ' +
          key +
          ', should be number but got ' +
          typeof recEvt,
      );
      return;
    }
    if (typeof recEvt === 'number') {
      invariant(
        recMapping instanceof AnimatedValue,
        'Bad mapping of type ' +
          typeof recMapping +
          ' for key ' +
          key +
          ', event value must map to AnimatedValue',
      );
      return;
    }
    invariant(
      typeof recMapping === 'object',
      'Bad mapping of type ' + typeof recMapping + ' for key ' + key,
    );
    invariant(
      typeof recEvt === 'object',
      'Bad event of type ' + typeof recEvt + ' for key ' + key,
    );
    for (const mappingKey in recMapping) {
      // $FlowFixMe[incompatible-use] recEvt is checked to be an object above
      validate(recMapping[mappingKey], recEvt[mappingKey], mappingKey);
    }
  };

  invariant(
    args.length >= argMapping.length,
    'Event has less arguments than mapping',
  );
  argMapping.forEach((mapping, idx) => {
    validate(mapping, args[idx], 'arg' + idx);
  });
}

export class AnimatedEvent {
  _argMapping: ReadonlyArray<?Mapping>;
  _listeners: Array<AnimatedEventListener> = [];
  _attachedEvent: ?{detach: () => void};
  __isNative: boolean;

  constructor(argMapping: ReadonlyArray<?Mapping>, config: EventConfig) {
    this._argMapping = argMapping;

    if (config == null) {
      console.warn('Animated.event now requires a second argument for options');
      config = {useNativeDriver: false};
    }

    if (config.listener) {
      this.__addListener(config.listener);
    }
    this._attachedEvent = null;
    this.__isNative = shouldUseNativeDriver(config);
  }

  __addListener(callback: AnimatedEventListener): void {
    this._listeners.push(callback);
  }

  __removeListener(callback: AnimatedEventListener): void {
    this._listeners = this._listeners.filter(listener => listener !== callback);
  }

  __attach(viewRef: ?number, eventName: string) {
    invariant(
      this.__isNative,
      'Only native driven events need to be attached.',
    );

    this._attachedEvent = attachNativeEvent(
      viewRef,
      eventName,
      this._argMapping,
    );
  }

  __detach(viewTag: ?number, eventName: string) {
    invariant(
      this.__isNative,
      'Only native driven events need to be detached.',
    );

    this._attachedEvent && this._attachedEvent.detach();
  }

  __getHandler(): AnimatedEventHandler {
    if (this.__isNative) {
      if (__DEV__) {
        let validatedMapping = false;
        return (...args) => {
          if (!validatedMapping) {
            validateMapping(this._argMapping, args);
            validatedMapping = true;
          }
          this._callListeners(...args);
        };
      } else {
        return this._callListeners;
      }
    }

    let validatedMapping = false;
    return (...args) => {
      if (__DEV__ && !validatedMapping) {
        validateMapping(this._argMapping, args);
        validatedMapping = true;
      }

      const traverse = (recMapping: ?Mapping, recEvt: unknown, key: string) => {
        if (recMapping instanceof AnimatedValue) {
          if (typeof recEvt === 'number') {
            recMapping.setValue(recEvt);
          }
        } else if (typeof recMapping === 'object') {
          for (const mappingKey in recMapping) {
            // $FlowFixMe[incompatible-use] the event matches the mapping shape
            traverse(recMapping[mappingKey], recEvt[mappingKey], mappingKey);
          }
        }
      };
      this._argMapping.forEach((mapping, idx) => {
        traverse(mapping, args[idx], 'arg' + idx);
      });

      this._callListeners(...args);
    };
  }

  _callListeners = (...args: ReadonlyArray<unknown>) => {
    this._listeners.forEach(listener => listener(...args));
  };
}
