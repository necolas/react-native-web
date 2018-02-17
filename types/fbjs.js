/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module 'fbjs/lib/invariant' {
  declare function exports<T>(condition: any, message: string, ...args: Array<any>): void;
}

declare module 'fbjs/lib/nullthrows' {
  declare function exports<T>(value: ?T): T;
}
