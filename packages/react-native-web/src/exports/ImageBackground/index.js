/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ImageProps } from '../Image';
import type { ViewProps } from '../View';

import ensureComponentIsNative from '../../modules/ensureComponentIsNative';
import Image from '../Image';
import StyleSheet from '../StyleSheet';
import View from '../View';
import React from 'react';

type ImageBackgroundProps = {
  ...ImageProps,
  imageRef?: any,
  imageStyle?: $PropertyType<ImageProps, 'style'>,
  style?: $PropertyType<ViewProps, 'style'>
};

const emptyObject = {};

/**
 * Very simple drop-in replacement for <Image> which supports nesting views.
 */
class ImageBackground extends React.Component<ImageBackgroundProps> {
  setNativeProps(props: Object) {
    // Work-around flow
    const viewRef = this._viewRef;
    if (viewRef) {
      ensureComponentIsNative(viewRef);
      viewRef.setNativeProps(props);
    }
  }

  _viewRef: ?View = null;

  _captureRef = (ref: View) => {
    this._viewRef = ref;
  };

  render() {
    const { children, style = emptyObject, imageStyle, imageRef, ...props } = this.props;
    const { height, width } = StyleSheet.flatten(style);

    return (
      <View ref={this._captureRef} style={style}>
        <Image
          {...props}
          ref={imageRef}
          style={[
            StyleSheet.absoluteFill,
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
            imageStyle
          ]}
        />
        {children}
      </View>
    );
  }
}

export default ImageBackground;
