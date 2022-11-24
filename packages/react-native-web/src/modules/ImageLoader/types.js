/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type ImageSource = {|
  uri: string,
  headers?: { [key: string]: string },
  width?: ?number,
  height?: ?number
|};

export type ImageResult = {|
  source: {|
    uri: string,
    width: number,
    height: number
  |}
|};
