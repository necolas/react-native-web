//Copied from: https://github.com/zertosh/nullthrows/blob/master/nullthrows.js.flow
declare module 'nullthrows' {
  /* @flow strict */

  declare module.exports: <T>(x: ?T, message?: string) => T;
}