"use strict";

exports.__esModule = true;
exports.registerAsset = registerAsset;
exports.getAssetByID = getAssetByID;

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var assets = [];

function registerAsset(asset) {
  // `push` returns new array length, so the first asset will
  // get id 1 (not 0) to make the value truthy
  return assets.push(asset);
}

function getAssetByID(assetId) {
  return assets[assetId - 1];
}