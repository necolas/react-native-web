/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import useAnimatedProps from './useAnimatedProps';
import useMergeRefs from '../Utilities/useMergeRefs';
import View from '../../../exports/View';
import * as React from 'react';

export type AnimatedComponentType<
  in Props extends {readonly [string]: unknown, ...},
  out Instance = unknown,
> = component(
  ref?: React.Ref<Instance>,
  ...{
    [K in keyof {
      ...Omit<Props, 'ref'>,
      readonly passthroughAnimatedPropExplicitValues?: React.ElementConfig<
        typeof View,
      >,
    }]: any,
  }
);

/**
 * Experimental implementation of `createAnimatedComponent` that is intended to
 * be compatible with concurrent rendering.
 */
export default function createAnimatedComponent<TProps extends {...}, TInstance>(
  Component: component(ref?: React.Ref<TInstance>, ...TProps),
): AnimatedComponentType<TProps, TInstance> {
  const AnimatedComponent = ({ref: forwardedRef, ...props}: any) => {
    const [reducedProps, callbackRef] = useAnimatedProps<TProps, TInstance>(
      props,
    );
    const ref = useMergeRefs<TInstance | null>(callbackRef, forwardedRef);

    // Some components require explicit passthrough values for animation
    // to work properly. For example, if an animated component is
    // transformed and Pressable, onPress will not work after transform
    // without these passthrough values.
    // $FlowFixMe[prop-missing]
    const {passthroughAnimatedPropExplicitValues, style} = reducedProps;
    const {style: passthroughStyle, ...passthroughProps} =
      passthroughAnimatedPropExplicitValues ?? {};
    const mergedStyle = [style, passthroughStyle];

    return (
      <Component
        {...reducedProps}
        {...passthroughProps}
        style={mergedStyle}
        ref={ref}
      />
    );
  };
  return AnimatedComponent as any;
}
