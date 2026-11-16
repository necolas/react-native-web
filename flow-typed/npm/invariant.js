declare module 'invariant' {
  declare module.exports: (
    condition: unknown,
    format?: string,
    ...args: Array<unknown>
  ) => asserts condition;
}
