/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use client';

import type { PackagerAsset } from '../../modules/AssetRegistry';

import { registerAsset, getAssetByID } from '../../modules/AssetRegistry';

export default {
  registerAsset,
  getAssetByID
};

export { registerAsset, getAssetByID };

export type { PackagerAsset };
