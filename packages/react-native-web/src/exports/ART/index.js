/**
 * @Author: Theo Seguier <key>
 * @Date:   2018-02-27T10:16:16-08:00
 * @Last modified by:   key
 * @Last modified time: 2018-02-27T10:30:12-08:00
 */

/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Dimensions
 * @flow
 */
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

const ART = canUseDOM ? require('react-art') : null;

export default ART;
