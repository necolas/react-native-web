/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import PixelRatio from '../../exports/PixelRatio';

export type PackagerAsset = {
  __packager_asset: boolean,
  fileSystemLocation: string,
  httpServerLocation: string,
  width: ?number,
  height: ?number,
  scales: Array<number>,
  hash: string,
  name: string,
  type: string
};

const assets: Array<PackagerAsset> = [];

export function registerAsset(asset: PackagerAsset): number {
  // `push` returns new array length, so the first asset will
  // get id 1 (not 0) to make the value truthy
  return assets.push(asset);
}

export function getAssetByID(assetId: number): PackagerAsset {
  return assets[assetId - 1];
}

export function getAssetUriByID(assetId: number): string {
  // get the URI from the packager
  const asset = getAssetByID(assetId);
  let scale = asset.scales[0];
  if (asset.scales.length > 1) {
    const preferredScale = PixelRatio.get();
    // Get the scale which is closest to the preferred scale
    scale = asset.scales.reduce((prev, curr) =>
      Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev
    );
  }
  const scaleSuffix = scale !== 1 ? `@${scale}x` : '';
  return asset ? `${asset.httpServerLocation}/${asset.name}${scaleSuffix}.${asset.type}` : '';
}
