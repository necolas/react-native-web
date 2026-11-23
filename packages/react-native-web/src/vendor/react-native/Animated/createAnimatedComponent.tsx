/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as React from 'react';

import View from '../../../exports/View';
import useMergeRefs from '../Utilities/useMergeRefs';
import useAnimatedProps from './useAnimatedProps';

type PassthroughProps = {
  readonly passthroughAnimatedPropExplicitValues?: React.ComponentProps<
    typeof View
  >;
};

type AnimatedProps<Props> = {
  [K in keyof (Omit<Props, 'ref'> & PassthroughProps)]: unknown;
};

export type AnimatedComponentType<
  Props extends { readonly [key: string]: unknown },
  Instance = unknown
> = (
  props: AnimatedProps<Props> & React.RefAttributes<Instance>
) => React.ReactNode;

/**
 * Experimental implementation of `createAnimatedComponent` that is intended to
 * be compatible with concurrent rendering.
 */
export default function createAnimatedComponent<
  TProps extends { readonly [key: string]: unknown },
  TInstance
>(
  Component: React.ComponentType<TProps & React.RefAttributes<TInstance>>
): AnimatedComponentType<TProps, TInstance> {
  const AnimatedComponent = (
    propsWithRef: AnimatedProps<TProps> & React.RefAttributes<TInstance>
  ) => {
    const forwardedRef = propsWithRef.ref;
    // Keep the same `props` object when only the animated values update.
    // `useAnimatedProps` creates new animated nodes when `props` changes.
    const props = React.useMemo(() => {
      const { ref, ...rest } = propsWithRef;
      return rest;
    }, [propsWithRef]);
    const [reducedProps, callbackRef] = useAnimatedProps<TInstance>(props) as [
      TProps & PassthroughProps & { readonly style?: unknown },
      ReturnType<typeof useAnimatedProps<TInstance>>[1]
    ];
    const ref = useMergeRefs<TInstance | null>(callbackRef, forwardedRef);

    // Some components require explicit passthrough values for animation
    // to work properly. For example, if an animated component is
    // transformed and Pressable, onPress will not work after transform
    // without these passthrough values.
    const { passthroughAnimatedPropExplicitValues, style } = reducedProps;
    const { style: passthroughStyle, ...passthroughProps } =
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
  return AnimatedComponent;
}
