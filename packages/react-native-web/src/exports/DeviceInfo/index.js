/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Dimensions from '../Dimensions';

const DeviceInfo = {
  Dimensions: {
    get windowPhysicalPixels() {
      const { width, height, fontScale, scale } = Dimensions.get('window');
      return {
        width: width * scale,
        height: height * scale,
        scale,
        fontScale
      };
    },
    get screenPhysicalPixels() {
      const { width, height, fontScale, scale } = Dimensions.get('screen');
      return {
        width: width * scale,
        height: height * scale,
        scale,
        fontScale
      };
    }
  },

  get locale() {
    if (canUseDOM) {
      if (window.navigator.languages) {
        return window.navigator.languages[0];
      } else {
        return window.navigator.language;
      }
    }
  },

  get totalMemory() {
    return canUseDOM ? window.navigator.deviceMemory : undefined;
  },

  get userAgent() {
    return canUseDOM ? window.navigator.userAgent : '';
  }
};

export default DeviceInfo;
