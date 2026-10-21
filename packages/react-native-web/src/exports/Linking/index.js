/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import invariant from 'fbjs/lib/invariant';
import canUseDOM from '../../modules/canUseDom';

const initialURL = canUseDOM ? window.location.href : '';

type Listener = (...args: any) => unknown;
type LinkingTarget = '_blank' | '_self' | '_parent' | '_top';

class Linking {
  // Wrap each listener in an object so the same function can be registered twice
  _listeners: { [type: string]: Set<{| listener: Listener |}> } = {};

  addListener(type: string, listener: Listener): {| remove(): void |} {
    const listeners = this._listeners;
    const entry = { listener };

    if (listeners[type] == null) {
      listeners[type] = new Set();
    }

    listeners[type].add(entry);

    return {
      remove() {
        listeners[type]?.delete(entry);
      }
    };
  }

  addEventListener(type: string, listener: Listener): {| remove(): void |} {
    return this.addListener(type, listener);
  }

  emit(type: string, ...args: any) {
    const listeners = this._listeners[type];

    if (listeners != null) {
      // Copy so mutations during emit do not change this invocation
      [...listeners].forEach(({ listener }) => listener(...args));
    }
  }

  listenerCount(type: string): number {
    return this._listeners[type]?.size ?? 0;
  }

  removeAllListeners(type?: ?string) {
    invariant(
      type != null,
      '`NativeEventEmitter.removeAllListener()` requires a non-null argument.'
    );

    this._listeners[type]?.clear();
  }

  canOpenURL(): Promise<boolean> {
    return Promise.resolve(true);
  }

  getInitialURL(): Promise<string> {
    return Promise.resolve(initialURL);
  }

  sendIntent(
    action: string,
    extras?: Array<{
      key: string,
      value: string | number | boolean,
      ...
    }>
  ): Promise<void> {
    return Promise.reject(new Error('Unsupported'));
  }

  openSettings(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Try to open the given url in a secure fashion. The method returns a Promise object.
   * If a target is passed (including undefined) that target will be used, otherwise '_blank'.
   * If the url opens, the promise is resolved. If not, the promise is rejected.
   * Emits the `onOpen` event if `url` is opened successfully.
   */
  openURL(url: string, target?: LinkingTarget): Promise<void> {
    if (arguments.length === 1) {
      target = '_blank';
    }
    try {
      open(url, target);
      this.emit('onOpen', url);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const open = (url: string, target?: LinkingTarget) => {
  if (canUseDOM) {
    const urlToOpen = new URL(url, window.location.href).toString();
    if (urlToOpen.indexOf('tel:') === 0) {
      window.location.href = urlToOpen;
    } else {
      window.open(urlToOpen, target, 'noopener');
    }
  }
};

export default new Linking() as Linking;
