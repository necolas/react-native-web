/* eslint-disable */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 */

'use strict';

var PooledClass = require('react-dom/lib/PooledClass');

var twoArgumentPooler = PooledClass.twoArgumentPooler;

/**
 * Position does not expose methods for construction via an `HTMLDOMElement`,
 * because it isn't meaningful to construct such a thing without first defining
 * a frame of reference.
 *
 * @param {number} windowStartKey Key that window starts at.
 * @param {number} windowEndKey Key that window ends at.
 */
function Position(left, top) {
  this.left = left;
  this.top = top;
}

Position.prototype.destructor = function() {
  this.left = null;
  this.top = null;
};

PooledClass.addPoolingTo(Position, twoArgumentPooler);

module.exports = Position;
