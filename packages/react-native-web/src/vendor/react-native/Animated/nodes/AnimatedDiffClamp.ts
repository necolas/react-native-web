/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import type { Nullable } from '../../../../types';
import type { PlatformConfig } from '../AnimatedPlatformConfig';
import type { InterpolationConfigType } from './AnimatedInterpolation';
import AnimatedInterpolation from './AnimatedInterpolation';
import type { AnimatedNumericNode } from './AnimatedNode';
import AnimatedWithChildren from './AnimatedWithChildren';

class AnimatedDiffClamp extends AnimatedWithChildren {
  _a: AnimatedNumericNode;
  _min: number;
  _max: number;
  _value: number;
  _lastValue: number;

  constructor(a: AnimatedNumericNode, min: number, max: number) {
    super();

    this._a = a;
    this._min = min;
    this._max = max;
    this._value = this._lastValue = this._a.__getValue();
  }

  __makeNative(platformConfig?: Nullable<PlatformConfig>) {
    this._a.__makeNative(platformConfig);
    super.__makeNative(platformConfig);
  }

  interpolate<OutputT extends number | string>(
    config: InterpolationConfigType<OutputT>
  ): AnimatedInterpolation<OutputT> {
    return new AnimatedInterpolation(this, config);
  }

  __getValue(): number {
    const value = this._a.__getValue();
    const diff = value - this._lastValue;
    this._lastValue = value;
    this._value = Math.min(Math.max(this._value + diff, this._min), this._max);
    return this._value;
  }

  __attach(): void {
    this._a.__addChild(this);
  }

  __detach(): void {
    this._a.__removeChild(this);
    super.__detach();
  }

  __getNativeConfig(): Record<string, unknown> {
    return {
      type: 'diffclamp',
      input: this._a.__getNativeTag(),
      min: this._min,
      max: this._max
    };
  }
}

export default AnimatedDiffClamp;
