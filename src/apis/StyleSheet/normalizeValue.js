/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import unitlessNumbers from '../../modules/unitlessNumbers';

const normalizeValue = (property: string, value) => {
  if (!unitlessNumbers[property] && typeof value === 'number') {
    value = `${value}px`;
  }
  return value;
};

export default normalizeValue;
