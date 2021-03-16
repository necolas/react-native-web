/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { DisplayMetrics } from '../Dimensions';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import Dimensions from '../Dimensions';

const DeviceInfo = {
  Dimensions: {
    get windowPhysicalPixels(): DisplayMetrics {
      const { width, height, fontScale, scale } = Dimensions.get('window');
      return {
        width: width * scale,
        height: height * scale,
        scale,
        fontScale
      };
    },
    get screenPhysicalPixels(): DisplayMetrics {
      const { width, height, fontScale, scale } = Dimensions.get('screen');
      return {
        width: width * scale,
        height: height * scale,
        scale,
        fontScale
      };
    }
  },

  get locale(): string | void {
    if (canUseDOM) {
      if (window.navigator.languages) {
        return window.navigator.languages[0];
      } else {
        return window.navigator.language;
      }
    }
  },

  get totalMemory(): number | void {
    return canUseDOM ? window.navigator.deviceMemory : undefined;
  },

  get userAgent(): string {
    return canUseDOM ? window.navigator.userAgent : '';
  }
};

export default DeviceInfo;
