// Copied from: https://github.com/alexreardon/memoize-one/blob/master/src/memoize-one.js.flow
export type EqualityFn = (newArgs: mixed[], lastArgs: mixed[]) => boolean;

declare module 'memoize-one' {
  // @flow

  // These types are not as powerful as the TypeScript types, but they get the job done

  // default export
  declare export default function memoizeOne<ResultFn: (...any[]) => mixed>(
    fn: ResultFn,
    isEqual?: EqualityFn,
  ): ResultFn & { clear: () => void };
}