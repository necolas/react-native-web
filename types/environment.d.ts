declare const global: typeof globalThis & {
  RN$Bridgeless?: boolean;
};

declare const process: {
  env: { [key: string]: string | null | undefined };
};

declare function setImmediate<TArgs extends unknown[]>(
  callback: (...args: TArgs) => unknown,
  ...args: TArgs
): unknown;

declare function clearImmediate(immediate: unknown): void;
