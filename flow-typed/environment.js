// @flow

declare var process: {
  env: { [string]: ?string, ... },
  ...
};

declare function setImmediate(
  callback: (...args: Array<any>) => unknown,
  ...args: Array<any>
): unknown;

declare function clearImmediate(immediate: unknown): void;
