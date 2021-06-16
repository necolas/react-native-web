/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ImageProps } from './types';

import * as React from 'react';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import { getAssetByID } from '../../modules/AssetRegistry';
import resolveShadowValue from '../StyleSheet/resolveShadowValue';
import ImageLoader from '../../modules/ImageLoader';
import PixelRatio from '../PixelRatio';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import View from '../View';
import processColor from '../processColor';

export type { ImageProps };

const ERRORED = 'ERRORED';
const LOADED = 'LOADED';
const LOADING = 'LOADING';
const IDLE = 'IDLE';

const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

function getFlatStyle(style, blurRadius) {
  const flatStyle = { ...StyleSheet.flatten(style) };
  const { filter, resizeMode, shadowOffset, tintColor } = flatStyle;

  // Add CSS filters
  // React Native exposes these features as props and proprietary styles
  const filters = [];
  let _filter = null;

  if (filter) {
    filters.push(filter);
  }
  if (blurRadius) {
    filters.push(`blur(${blurRadius}px)`);
  }
  if (shadowOffset) {
    const shadowString = resolveShadowValue(flatStyle);
    if (shadowString) {
      filters.push(`drop-shadow(${shadowString})`);
    }
  }
  if (tintColor) {
    const colorInt = processColor(tintColor);
    if (colorInt != null) {
      const r = (colorInt >> 16) & 255;
      const g = (colorInt >> 8) & 255;
      const b = colorInt & 255;
      const a = ((colorInt >> 24) & 255) / 255;
      const alpha = a.toFixed(2);
      const matrix = `0 0 0 0 ${r / 255} 0 0 0 0 ${g / 255} 0 0 0 0 ${b / 255} 0 0 0 ${alpha} 0`;
      // NOTE: Safari doesn't support inline SVG filters (reported 2012)
      // https://bugs.webkit.org/show_bug.cgi?id=104169
      const svgFilter =
        "url('data:image/svg+xml," +
        '<svg xmlns="http://www.w3.org/2000/svg">' +
        '<filter id="tint">' +
        `<feColorMatrix type="matrix" values="${matrix}" />` +
        '</filter>' +
        "</svg>#tint')";
      filters.push(svgFilter);
    }
  }

  if (filters.length > 0) {
    _filter = filters.join(' ');
  }

  // These styles are converted to CSS filters applied to the
  // element displaying the background image.
  delete flatStyle.blurRadius;
  delete flatStyle.shadowColor;
  delete flatStyle.shadowOpacity;
  delete flatStyle.shadowOffset;
  delete flatStyle.shadowRadius;
  delete flatStyle.tintColor;
  // These styles are not supported on View
  delete flatStyle.overlayColor;
  delete flatStyle.resizeMode;

  return [flatStyle, resizeMode, _filter];
}

function resolveAssetDimensions(source) {
  if (typeof source === 'number') {
    const { height, width } = getAssetByID(source);
    return { height, width };
  } else if (source != null && !Array.isArray(source) && typeof source === 'object') {
    const { height, width } = source;
    return { height, width };
  }
}

function resolveAssetUri(source): ?string {
  let uri = null;
  if (typeof source === 'number') {
    // get the URI from the packager
    const asset = getAssetByID(source);
    let scale = asset.scales[0];
    if (asset.scales.length > 1) {
      const preferredScale = PixelRatio.get();
      // Get the scale which is closest to the preferred scale
      scale = asset.scales.reduce((prev, curr) =>
        Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev
      );
    }
    const scaleSuffix = scale !== 1 ? `@${scale}x` : '';
    uri = asset ? `${asset.httpServerLocation}/${asset.name}${scaleSuffix}.${asset.type}` : '';
  } else if (typeof source === 'string') {
    uri = source;
  } else if (source && typeof source.uri === 'string') {
    uri = source.uri;
  }

  if (uri) {
    const match = uri.match(svgDataUriPattern);
    // inline SVG markup may contain characters (e.g., #, ") that need to be escaped
    if (match) {
      const [, prefix, svg] = match;
      const encodedSvg = encodeURIComponent(svg);
      return `${prefix}${encodedSvg}`;
    }
  }

  return uri;
}

interface ImageStatics {
  getSize: (
    uri: string,
    success: (width: number, height: number) => void,
    failure: () => void
  ) => void;
  prefetch: (uri: string) => Promise<void>;
  queryCache: (uris: Array<string>) => Promise<{| [uri: string]: 'disk/memory' |}>;
}

const Image: React.AbstractComponent<ImageProps, React.ElementRef<typeof View>> = React.forwardRef(
  (props, ref) => {
    const {
      accessibilityLabel,
      blurRadius,
      defaultSource,
      draggable,
      onError,
      onLayout,
      onLoad,
      onLoadEnd,
      onLoadStart,
      pointerEvents,
      source,
      style,
      ...rest
    } = props;

    if (process.env.NODE_ENV !== 'production') {
      if (props.children) {
        throw new Error(
          'The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.'
        );
      }
    }

    const [state, updateState] = React.useState(() => {
      const uri = resolveAssetUri(source);
      if (uri != null) {
        const isLoaded = ImageLoader.has(uri);
        if (isLoaded) {
          return LOADED;
        }
      }
      return IDLE;
    });

    const [layout, updateLayout] = React.useState({});
    const hasTextAncestor = React.useContext(TextAncestorContext);
    const hiddenImageRef = React.useRef(null);
    const requestRef = React.useRef(null);
    const shouldDisplaySource = state === LOADED || (state === LOADING && defaultSource == null);
    const [flatStyle, _resizeMode, filter] = getFlatStyle(style, blurRadius);
    const resizeMode = props.resizeMode || _resizeMode || 'cover';
    const selectedSource = shouldDisplaySource ? source : defaultSource;
    const displayImageUri = resolveAssetUri(selectedSource);
    const imageSizeStyle = resolveAssetDimensions(selectedSource);
    const backgroundImage = displayImageUri ? `url("${displayImageUri}")` : null;
    const backgroundSize = getBackgroundSize();

    // Accessibility image allows users to trigger the browser's image context menu
    const hiddenImage = displayImageUri
      ? createElement('img', {
          alt: accessibilityLabel || '',
          classList: [classes.accessibilityImage],
          draggable: draggable || false,
          ref: hiddenImageRef,
          src: displayImageUri
        })
      : null;

    function getBackgroundSize(): ?string {
      if (hiddenImageRef.current != null && (resizeMode === 'center' || resizeMode === 'repeat')) {
        const { naturalHeight, naturalWidth } = hiddenImageRef.current;
        const { height, width } = layout;
        if (naturalHeight && naturalWidth && height && width) {
          const scaleFactor = Math.min(1, width / naturalWidth, height / naturalHeight);
          const x = Math.ceil(scaleFactor * naturalWidth);
          const y = Math.ceil(scaleFactor * naturalHeight);
          return `${x}px ${y}px`;
        }
      }
    }

    function handleLayout(e) {
      if (resizeMode === 'center' || resizeMode === 'repeat' || onLayout) {
        const { layout } = e.nativeEvent;
        onLayout && onLayout(e);
        updateLayout(layout);
      }
    }

    // Image loading
    const uri = resolveAssetUri(source);
    React.useEffect(() => {
      abortPendingRequest();

      if (uri != null) {
        updateState(LOADING);
        if (onLoadStart) {
          onLoadStart();
        }

        requestRef.current = ImageLoader.load(
          uri,
          function load(e) {
            updateState(LOADED);
            if (onLoad) {
              onLoad(e);
            }
            if (onLoadEnd) {
              onLoadEnd();
            }
          },
          function error() {
            updateState(ERRORED);
            if (onError) {
              onError({
                nativeEvent: {
                  error: `Failed to load resource ${uri} (404)`
                }
              });
            }
            if (onLoadEnd) {
              onLoadEnd();
            }
          }
        );
      }

      function abortPendingRequest() {
        if (requestRef.current != null) {
          ImageLoader.abort(requestRef.current);
          requestRef.current = null;
        }
      }

      return abortPendingRequest;
    }, [uri, requestRef, updateState, onError, onLoad, onLoadEnd, onLoadStart]);

    return (
      <View
        {...rest}
        accessibilityLabel={accessibilityLabel}
        onLayout={handleLayout}
        pointerEvents={pointerEvents}
        ref={ref}
        style={[styles.root, hasTextAncestor && styles.inline, imageSizeStyle, flatStyle]}
      >
        <View
          style={[
            styles.image,
            resizeModeStyles[resizeMode],
            { backgroundImage, filter },
            backgroundSize != null && { backgroundSize }
          ]}
        />
        {hiddenImage}
      </View>
    );
  }
);

Image.displayName = 'Image';

// $FlowIgnore: This is the correct type, but casting makes it unhappy since the variables aren't defined yet
const ImageWithStatics = (Image: React.AbstractComponent<
  ImageProps,
  React.ElementRef<typeof View>
> &
  ImageStatics);

ImageWithStatics.getSize = function (uri, success, failure) {
  ImageLoader.getSize(uri, success, failure);
};

ImageWithStatics.prefetch = function (uri) {
  return ImageLoader.prefetch(uri);
};

ImageWithStatics.queryCache = function (uris) {
  return ImageLoader.queryCache(uris);
};

const classes = css.create({
  accessibilityImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0,
    width: '100%',
    zIndex: -1
  }
});

const styles = StyleSheet.create({
  root: {
    flexBasis: 'auto',
    overflow: 'hidden',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    zIndex: -1
  }
});

const resizeModeStyles = StyleSheet.create({
  center: {
    backgroundSize: 'auto'
  },
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundPosition: '0 0',
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundPosition: '0 0',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});

export default ImageWithStatics;
