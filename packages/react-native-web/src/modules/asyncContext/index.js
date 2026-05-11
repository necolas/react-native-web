/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

/**
 * Per-request scoping for module-level state inside react-native-web.
 *
 * On the client and on React Native, this module is a no-op singleton
 * store: `getScopedState` always returns the same process-wide instance
 * for each key, matching the historical behavior of RNW's module-level
 * `let` bindings.
 *
 * On Node, callers (typically an SSR pipeline) can wrap each render in
 * `runInRequestScope` to give that request its own isolated state for
 * every key — preventing cross-request leaks during concurrent renders
 * with `renderToPipeableStream`.
 *
 * `node:async_hooks` is loaded via `eval('require')` so bundlers that
 * target browser/native do not attempt to resolve the Node-only module.
 */

type RequestStore = { states: Map<string, mixed> };

// Defeats bundler static analysis so async_hooks is not resolved in
// browser/native builds. In Node, this becomes a real require and we
// get AsyncLocalStorage; everywhere else the catch leaves als as null
// and every API becomes a no-op against the process-default map.
let AsyncLocalStorageCtor: ?Class<any> = null;
try {
  // $FlowFixMe[unsafe-eval]
  // eslint-disable-next-line no-eval
  AsyncLocalStorageCtor = eval('require')('async_hooks').AsyncLocalStorage;
} catch (e) {
  AsyncLocalStorageCtor = null;
}

const als: ?{
  getStore(): ?RequestStore,
  run<T>(store: RequestStore, fn: () => T): T,
  ...
} = AsyncLocalStorageCtor ? new AsyncLocalStorageCtor() : null;

const defaultStates: Map<string, mixed> = new Map();

/**
 * Run `fn` inside a fresh per-request scope. State read via
 * `getScopedState` during `fn` is isolated from concurrent scopes;
 * the scope ends when `fn`'s promise settles or it returns.
 *
 * No-op on the client / native: state remains the process singleton.
 */
export function runInRequestScope<T>(fn: () => T): T {
  if (als == null) return fn();
  return als.run({ states: new Map() }, fn);
}

/**
 * Return the per-request state object for `key`, creating it with
 * `createDefault()` on first access in this scope. Outside any scope,
 * returns the process-default singleton (also lazily created).
 *
 * The returned reference is stable across reads within the same
 * scope — callers can mutate its properties and changes will be
 * observed by subsequent reads in the same scope.
 */
export function getScopedState<T>(key: string, createDefault: () => T): T {
  const store = als ? als.getStore() : null;
  if (store) {
    let value = store.states.get(key);
    if (value === undefined) {
      value = createDefault();
      store.states.set(key, value);
    }
    // $FlowFixMe[incompatible-return] T is enforced by the key/factory contract
    return value;
  }
  let value = defaultStates.get(key);
  if (value === undefined) {
    value = createDefault();
    defaultStates.set(key, value);
  }
  // $FlowFixMe[incompatible-return]
  return value;
}

/** True iff currently inside a request scope. */
export function hasRequestScope(): boolean {
  return als != null && als.getStore() != null;
}
