/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ComponentRef, ReactNode, Ref } from 'react';

import Image, { type ImageProps } from '../Image';
import StyleSheet from '../StyleSheet';
import View from '../View';
import type { ViewProps, ViewStyle } from '../View/types';

type ImageBackgroundProps = Omit<ImageProps, 'style'> & {
  imageRef?: Ref<ComponentRef<typeof View>>;
  imageStyle?: ImageProps['style'];
  ref?: Ref<ComponentRef<typeof View>>;
  style?: ViewProps['style'];
};

const emptyObject: ViewStyle = {};

/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */
const ImageBackground = (props: ImageBackgroundProps): ReactNode => {
  const {
    children,
    style = emptyObject,
    imageStyle,
    imageRef,
    ref,
    ...rest
  } = props;
  const { height, width } = StyleSheet.flatten(style);

  return (
    <View ref={ref} style={style}>
      <Image
        {...rest}
        ref={imageRef}
        style={[
          {
            // Temporary Workaround:
            // Current (imperfect yet) implementation of <Image> overwrites width and height styles
            // (which is not quite correct), and these styles conflict with explicitly set styles
            // of <ImageBackground> and with our internal layout model here.
            // So, we have to proxy/reapply these styles explicitly for actual <Image> component.
            // This workaround should be removed after implementing proper support of
            // intrinsic content size of the <Image>.
            width,
            height,
            zIndex: -1
          },
          StyleSheet.absoluteFill,
          imageStyle
        ]}
      />
      {children}
    </View>
  );
};

ImageBackground.displayName = 'ImageBackground';

export default ImageBackground;
