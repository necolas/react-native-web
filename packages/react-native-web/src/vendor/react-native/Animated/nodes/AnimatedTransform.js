/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

'use strict';

import AnimatedNode from './AnimatedNode';
import AnimatedWithChildren from './AnimatedWithChildren';
import NativeAnimatedHelper from '../NativeAnimatedHelper';

class AnimatedTransform extends AnimatedWithChildren {
  _transforms: ReadonlyArray<Object>;

  constructor(transforms: ReadonlyArray<Object>) {
    super();
    this._transforms = transforms;
  }

  __makeNative() {
    this._transforms.forEach(transform => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          value.__makeNative();
        }
      }
    });
    super.__makeNative();
  }

  __getValue(): ReadonlyArray<Object> {
    return this._transforms.map(transform => {
      const result: {[string]: unknown} = {};
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          result[key] = value.__getValue();
        } else {
          result[key] = value;
        }
      }
      return result;
    });
  }

  __getAnimatedValue(): ReadonlyArray<Object> {
    return this._transforms.map(transform => {
      const result: {[string]: unknown} = {};
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          result[key] = value.__getAnimatedValue();
        } else {
          // All transform components needed to recompose matrix
          result[key] = value;
        }
      }
      return result;
    });
  }

  __attach(): void {
    this._transforms.forEach(transform => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          value.__addChild(this);
        }
      }
    });
  }

  __detach(): void {
    this._transforms.forEach(transform => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          value.__removeChild(this);
        }
      }
    });
    super.__detach();
  }

  __getNativeConfig(): any {
    const transConfigs: Array<
      | {type: 'animated', property: string, nodeTag: ?number}
      | {type: 'static', property: string, value: number | string},
    > = [];

    this._transforms.forEach(transform => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof AnimatedNode) {
          transConfigs.push({
            type: 'animated',
            property: key,
            nodeTag: value.__getNativeTag(),
          });
        } else {
          transConfigs.push({
            type: 'static',
            property: key,
            value: NativeAnimatedHelper.transformDataType(value),
          });
        }
      }
    });

    NativeAnimatedHelper.validateTransform(transConfigs);
    return {
      type: 'transform',
      transforms: transConfigs,
    };
  }
}

export default AnimatedTransform;
