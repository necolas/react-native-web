/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import type { Nullable } from '../../../../types';

export interface EventSubscription {
  remove(): void;
}

export interface IEventEmitter<
  TEventToArgsMap extends Readonly<Record<string, Array<unknown>>>
> {
  addListener<TEvent extends keyof TEventToArgsMap & string>(
    eventType: TEvent,
    listener: (...args: TEventToArgsMap[TEvent]) => unknown,
    context?: unknown
  ): EventSubscription;

  emit<TEvent extends keyof TEventToArgsMap & string>(
    eventType: TEvent,
    ...args: TEventToArgsMap[TEvent]
  ): void;

  removeAllListeners<TEvent extends keyof TEventToArgsMap & string>(
    eventType?: Nullable<TEvent>
  ): void;

  listenerCount<TEvent extends keyof TEventToArgsMap & string>(
    eventType: TEvent
  ): number;
}

interface Registration<TArgs extends Array<unknown>> {
  readonly context: unknown;
  readonly listener: (...args: TArgs) => unknown;
  readonly remove: () => void;
}

type Registry<
  TEventToArgsMap extends Readonly<Record<string, Array<unknown>>>
> = {
  [TEvent in keyof TEventToArgsMap]?: Set<
    Registration<TEventToArgsMap[TEvent]>
  >;
};

/**
 * EventEmitter manages listeners and publishes events to them.
 *
 * EventEmitter accepts a single type parameter that defines the valid events
 * and associated listener argument(s).
 *
 * @example
 *
 *   const emitter = new EventEmitter<{
 *     success: [number, string],
 *     error: [Error],
 *   }>();
 *
 *   emitter.on('success', (statusCode, responseText) => {...});
 *   emitter.emit('success', 200, '...');
 *
 *   emitter.on('error', error => {...});
 *   emitter.emit('error', new Error('Resource not found'));
 *
 */
export default class EventEmitter<
  TEventToArgsMap extends Readonly<Record<string, Array<unknown>>>
> implements IEventEmitter<TEventToArgsMap> {
  _registry: Registry<TEventToArgsMap> = {};

  /**
   * Registers a listener that is called when the supplied event is emitted.
   * Returns a subscription that has a `remove` method to undo registration.
   */
  addListener<TEvent extends keyof TEventToArgsMap & string>(
    eventType: TEvent,
    listener: (...args: TEventToArgsMap[TEvent]) => unknown,
    context?: unknown
  ): EventSubscription {
    const registrations = allocate(this._registry, eventType);
    const registration: Registration<TEventToArgsMap[TEvent]> = {
      context,
      listener,
      remove(): void {
        registrations.delete(registration);
      }
    };
    registrations.add(registration);
    return registration;
  }

  /**
   * Emits the supplied event. Additional arguments supplied to `emit` will be
   * passed through to each of the registered listeners.
   *
   * If a listener modifies the listeners registered for the same event, those
   * changes will not be reflected in the current invocation of `emit`.
   */
  emit<TEvent extends keyof TEventToArgsMap & string>(
    eventType: TEvent,
    ...args: TEventToArgsMap[TEvent]
  ): void {
    const registrations: Nullable<Set<Registration<TEventToArgsMap[TEvent]>>> =
      this._registry[eventType];
    if (registrations != null) {
      for (const registration of [...registrations]) {
        registration.listener.apply(registration.context, args);
      }
    }
  }

  /**
   * Removes all registered listeners.
   */
  removeAllListeners<TEvent extends keyof TEventToArgsMap & string>(
    eventType?: Nullable<TEvent>
  ): void {
    if (eventType == null) {
      this._registry = {};
    } else {
      delete this._registry[eventType];
    }
  }

  /**
   * Returns the number of registered listeners for the supplied event.
   */
  listenerCount<TEvent extends keyof TEventToArgsMap & string>(
    eventType: TEvent
  ): number {
    const registrations: Nullable<Set<Registration<TEventToArgsMap[TEvent]>>> =
      this._registry[eventType];
    return registrations == null ? 0 : registrations.size;
  }
}

function allocate<
  TEventToArgsMap extends Readonly<Record<string, Array<unknown>>>,
  TEvent extends keyof TEventToArgsMap
>(
  registry: Registry<TEventToArgsMap>,
  eventType: TEvent
): Set<Registration<TEventToArgsMap[TEvent]>> {
  let registrations: Nullable<Set<Registration<TEventToArgsMap[TEvent]>>> =
    registry[eventType];
  if (registrations == null) {
    registrations = new Set();
    registry[eventType] = registrations;
  }
  return registrations;
}
