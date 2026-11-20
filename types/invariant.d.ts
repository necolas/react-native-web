declare module 'invariant' {
  const invariant: (
    condition: unknown,
    format?: string,
    ...args: Array<unknown>
  ) => asserts condition;
  export default invariant;
}
