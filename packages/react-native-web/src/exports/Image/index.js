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
import ImageLoader, { resolveAssetUri } from '../../modules/ImageLoader';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import View from '../View';

export type { ImageProps };

const ERRORED = 'ERRORED';
const LOADED = 'LOADED';
const LOADING = 'LOADING';
const IDLE = 'IDLE';

let _filterId = 0;

function createTintColorSVG(tintColor, id) {
  return tintColor && id != null ? (
    <svg style={{ position: 'absolute', height: 0, visibility: 'hidden', width: 0 }}>
      <defs>
        <filter id={`tint-${id}`} suppressHydrationWarning={true}>
          <feFlood floodColor={`${tintColor}`} key={tintColor} />
          <feComposite in2="SourceAlpha" operator="atop" />
        </filter>
      </defs>
    </svg>
  ) : null;
}

function getFlatStyle(style, blurRadius, filterId) {
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
  if (tintColor && filterId != null) {
    filters.push(`url(#tint-${filterId})`);
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

  return [flatStyle, resizeMode, _filter, tintColor];
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

    const hasTextAncestor = React.useContext(TextAncestorContext);
    const hiddenImageRef = React.useRef(null);
    const filterRef = React.useRef(_filterId++);
    const requestRef = React.useRef(null);
    const shouldDisplaySource = state === LOADED || (state === LOADING && defaultSource == null);
    const [flatStyle, _resizeMode, filter, tintColor] = getFlatStyle(
      style,
      blurRadius,
      filterRef.current
    );
    const resizeMode = props.resizeMode || _resizeMode || 'cover';
    const selectedSource = shouldDisplaySource ? source : defaultSource;
    const displayImageUri = resolveAssetUri(selectedSource);
    const imageSizeStyle = resolveAssetDimensions(selectedSource);
    const crossOrigin = typeof selectedSource === 'object' ? selectedSource.crossOrigin : undefined;

    // Accessibility image allows users to trigger the browser's image context menu
    const image = displayImageUri
      ? createElement('img', {
          alt: accessibilityLabel !== null ? accessibilityLabel || '' : undefined,
          classList: [classes.image],
          crossOrigin: crossOrigin,
          draggable: draggable || false,
          ref: hiddenImageRef,
          src: displayImageUri,
          style: [style, resizeModeStyles[resizeMode], { filter }]
        })
      : null;

    // Image loading
    // NOTE: in order to prevent costly reloads when objects aren't equal, we only check the resolved URI here
    // however, what we really want is to deepEqual test the source var on all props that might affect loading.
    const uri = resolveAssetUri(source);
    React.useEffect(() => {
      abortPendingRequest();

      if (source && uri != null) {
        updateState(LOADING);
        if (onLoadStart) {
          onLoadStart();
        }

        requestRef.current = ImageLoader.load(
          source,
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
                  error: `Failed to load resource ${source.toString()} (404)`
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
        onLayout={onLayout}
        pointerEvents={pointerEvents}
        ref={ref}
        style={[styles.root, hasTextAncestor && styles.inline, imageSizeStyle, flatStyle]}
      >
        {image}
        {createTintColorSVG(tintColor, filterRef.current)}
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
  image: {
    height: '100%',
    width: '100%'
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
  }
});

const resizeModeStyles = StyleSheet.create({
  center: {
    objectFit: 'scale-down'
  },
  contain: {
    objectFit: 'contain'
  },
  cover: {
    objectFit: 'cover'
  },
  none: {
    objectPosition: '0 0',
    objectFit: 'scale-down'
  },
  /* Repeat is not properly supported */
  repeat: {
    objectFit: 'scale-down'
  },
  stretch: {
    objectFit: 'fill'
  }
});

export default ImageWithStatics;
