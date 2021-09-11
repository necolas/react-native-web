/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import invariant from 'fbjs/lib/invariant';

const initialURL = canUseDOM ? window.location.href : '';

type Callback = (...args: any) => void;

type OnOpenCallback = (event: 'onOpen', callback: (url: string) => void) => void;
type GenericCallback = (event: string, callback: Callback) => void;

class Linking {
  /**
   * An object mapping of event name
   * and all the callbacks subscribing to it
   */
  _eventCallbacks: { [key: string]: Array<Callback> } = {};

  _dispatchEvent(event: string, ...data: any) {
    const listeners = this._eventCallbacks[event];
    if (listeners != null && Array.isArray(listeners)) {
      listeners.map((listener) => {
        listener(...data);
      });
    }
  }

  /**
   * Adds a event listener for the specified event. The callback will be called when the
   * said event is dispatched.
   */
  addEventListener: OnOpenCallback | GenericCallback = (event: string, callback: Callback) => {
    if (!this._eventCallbacks[event]) {
      this._eventCallbacks[event] = [callback];
      return;
    }
    this._eventCallbacks[event].push(callback);
  };

  /**
   * Removes a previously added event listener for the specified event. The callback must
   * be the same object as the one passed to `addEventListener`.
   */
  removeEventListener: OnOpenCallback | GenericCallback = (event: string, callback: Callback) => {
    const callbacks = this._eventCallbacks[event];
    const filteredCallbacks = callbacks.filter((c) => c.toString() !== callback.toString());
    this._eventCallbacks[event] = filteredCallbacks;
  };

  canOpenURL(): Promise<boolean> {
    return Promise.resolve(true);
  }

  getInitialURL(): Promise<string> {
    return Promise.resolve(initialURL);
  }

  /**
   * Try to open the given url in a secure fashion. The method returns a Promise object.
   * If the url opens, the promise is resolved. If not, the promise is rejected.
   * Dispatches the `onOpen` event if `url` is opened successfully
   */
  openURL(url: string): Promise<Object | void> {
    try {
      open(url);
      this._dispatchEvent('onOpen', url);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  _validateURL(url: string) {
    invariant(typeof url === 'string', 'Invalid URL: should be a string. Was: ' + url);
    invariant(url, 'Invalid URL: cannot be empty');
  }
}

const open = (url) => {
  if (canUseDOM) {
    const urlToOpen = new URL(url, window.location).toString();
    if (urlToOpen.indexOf('tel:') === 0) {
      window.location = urlToOpen;
    } else {
      window.open(urlToOpen, '_blank', 'noopener');
    }
  }
};

export default (new Linking(): Linking);
