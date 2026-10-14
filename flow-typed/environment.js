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

declare class Intl$Locale {
  constructor(tag: string): void;
  maximize(): Intl$Locale;
  readonly script?: string;
}

declare var Intl: {
  Locale: Class<Intl$Locale>,
  ...
};
