/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import invariant from 'invariant';

import canUseDOM from '../../modules/canUseDom';
import type { Nullable } from '../../types';
import EventEmitter, {
  type EventSubscription
} from '../../vendor/react-native/vendor/emitter/EventEmitter';

const EVENT_TYPES = ['change', 'memoryWarning'];

type AppStateStatus = 'active' | 'background';

type AppStateEvents = {
  change: [AppStateStatus];
  memoryWarning: [];
};

const isAvailable: boolean = canUseDOM && !!document.visibilityState;
let changeEmitter: Nullable<EventEmitter<AppStateEvents>> = null;

const getCurrentState = (): AppStateStatus =>
  !isAvailable || document.visibilityState === 'visible'
    ? 'active'
    : 'background';

export default class AppState {
  static isAvailable: boolean = isAvailable;

  static get currentState(): AppStateStatus {
    return getCurrentState();
  }

  static addEventListener(
    type: string,
    handler: (state: AppStateStatus) => unknown
  ): EventSubscription {
    if (isAvailable) {
      invariant(
        EVENT_TYPES.indexOf(type) !== -1,
        'Trying to subscribe to unknown event: "%s"',
        type
      );

      if (type === 'change') {
        if (!changeEmitter) {
          changeEmitter = new EventEmitter<AppStateEvents>();

          document.addEventListener(
            'visibilitychange',
            () => {
              changeEmitter?.emit('change', AppState.currentState);
            },
            false
          );
        }

        return changeEmitter.addListener('change', handler);
      }
    }

    return { remove() {} };
  }
}
