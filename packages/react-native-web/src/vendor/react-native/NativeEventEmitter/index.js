/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

import EventEmitter from '../emitter/EventEmitter';
import type EmitterSubscription from '../emitter/_EmitterSubscription';
import RCTDeviceEventEmitter from './RCTDeviceEventEmitter';
import invariant from 'fbjs/lib/invariant';

type NativeModule = {
  +addListener: (eventType: string) => void,
  +removeListeners: (count: number) => void,
  ...
};

/**
 * Abstract base class for implementing event-emitting modules. This implements
 * a subset of the standard EventEmitter node module API.
 */
export default class NativeEventEmitter<
  EventDefinitions: {...},
> extends EventEmitter<EventDefinitions> {
  _nativeModule: ?NativeModule;

  constructor(nativeModule: ?NativeModule) {
    super(RCTDeviceEventEmitter.sharedSubscriber);
  }

  addListener<K: $Keys<EventDefinitions>>(
    eventType: K,
    listener: (...$ElementType<EventDefinitions, K>) => mixed,
    context: $FlowFixMe,
  ): EmitterSubscription<EventDefinitions, K> {
    if (this._nativeModule != null) {
      this._nativeModule.addListener(eventType);
    }
    return super.addListener(eventType, listener, context);
  }

  removeAllListeners<K: $Keys<EventDefinitions>>(eventType: ?K): void {
    invariant(eventType, 'eventType argument is required.');
    const count = this.listenerCount(eventType);
    if (this._nativeModule != null) {
      this._nativeModule.removeListeners(count);
    }
    super.removeAllListeners(eventType);
  }

  removeSubscription<K: $Keys<EventDefinitions>>(
    subscription: EmitterSubscription<EventDefinitions, K>,
  ): void {
    if (this._nativeModule != null) {
      this._nativeModule.removeListeners(1);
    }
    super.removeSubscription(subscription);
  }
}
