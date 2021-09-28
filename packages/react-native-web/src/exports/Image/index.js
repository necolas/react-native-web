/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ImageProps, ImageStatics } from './types';
import type { PlatformMethods } from '../../types';

import * as React from 'react';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import * as forwardedProps from '../../modules/forwardedProps';
import pick from '../../modules/pick';
import processColor from '../processColor';
import resolveShadowValue from '../StyleSheet/resolveShadowValue';
import useElementLayout from '../../modules/useElementLayout';
import useMergeRefs from '../../modules/useMergeRefs';
import usePlatformMethods from '../../modules/usePlatformMethods';
import useResponderEvents from '../../modules/useResponderEvents';
import ImageLoader from '../../modules/ImageLoader';
import PixelRatio from '../PixelRatio';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import View from '../View';

import { getAssetByID, getAssetUriByID } from '../../modules/AssetRegistry';

const emptyObject = {};
const forwardPropsList = {
  ...forwardedProps.defaultProps,
  ...forwardedProps.accessibilityProps,
  ...forwardedProps.clickProps,
  ...forwardedProps.focusProps,
  ...forwardedProps.keyboardProps,
  ...forwardedProps.mouseProps,
  ...forwardedProps.touchProps,
  ...forwardedProps.styleProps,
  crossOrigin: true,
  decoding: true,
  draggable: true,
  loading: true,
  referrerPolicy: true
};

const pickProps = (props) => pick(props, forwardPropsList);

const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

function getFlatStyle(style, blurRadius, resizeModeProp) {
  const initialStyle = StyleSheet.flatten(style) || emptyObject;
  const objectFitStyle = resizeModeStyles[initialStyle.resizeMode || resizeModeProp || 'cover'];
  const flatStyle = { ...initialStyle, ...objectFitStyle };
  const { filter, resizeMode, shadowOffset, tintColor } = flatStyle;

  // Add CSS filters
  // React Native exposes these features as props and proprietary styles
  const filters = [];
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

  if (filters.length > 0) {
    flatStyle.filter = filters.join(' ');
  }

  return flatStyle;
}

function getImageData(image: HTMLImageElement) {
  const { width, height, currentSrc } = image;
  return {
    source: { height, width, url: currentSrc },
    target: image
  }
}

function resolveAssetUri(source): ?string {
  let uri = null;
  if (typeof source === 'number') {
    uri = getAssetUriByID(source);
  } else if (typeof source === 'string') {
    uri = source;
  } else if (Array.isArray(source)) {
    uri = source[0].uri;
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

const ERROR_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const Image: React.AbstractComponent<ImageProps, HTMLImageElement & PlatformMethods> = React.forwardRef(
  (props, forwardedRef) => {
    const {
      blurRadius,
      defaultSource,
      onError,
      onLayout,
      onLoad,
      onLoadEnd,
      onLoadStart,
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
      pointerEvents,
      resizeMode,
      source,
      style
    } = props;

    if (process.env.NODE_ENV !== 'production') {
      if (props.children) {
        throw new Error(
          'The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.'
        );
      }
    }

    const supportedProps = pickProps(props);
    
    const src = resolveAssetUri(source) || resolveAssetUri(defaultSource);
    let srcSet;
    if (Array.isArray(source)) {
      srcSet = source.map(({ uri, scale }) => `${uri} ${scale || 1}x`);
    }

    const [managedSrc, setManagedSrc] = React.useState(src);
    const flatStyle = getFlatStyle(style, blurRadius, resizeMode);

    const hostRef = React.useRef(null);
    const hasTextAncestor = React.useContext(TextAncestorContext);
    useElementLayout(hostRef, onLayout);
    useResponderEvents(hostRef, {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture
    });

    const internalImageRef = React.useCallback((target) => {
      const errorListener = function (e) {
        // If the image fails to load, browsers will display a "broken" icon.
        // To avoid this we replace the image with a transparent gif.
        setManagedSrc(ERROR_PLACEHOLDER);
        if (onError != null) {
          onError({
            nativeEvent: {
              error: `Failed to load resource ${e.target.src} (404)`
            }
          });
        }
        if (onLoadEnd != null) {
          onLoadEnd({ nativeEvent: { target }});
        }
      };

      const loadListener = function (e) {
        const { target: image } = e;
        if (image.src === ERROR_PLACEHOLDER) {
          // Prevent the placeholder from triggering a 'load' event that event
          // listeners would otherwise receive.
          e.stopImmediatePropagation();
        } else {
          if (onLoad != null) {
            onLoad({
              nativeEvent: getImageData(image)
            });
          }
          if (onLoadEnd != null) {
            onLoadEnd({ nativeEvent: { target }});
          }
        }
      };

      if (target !== null) {
        // If the image is loaded before JS loads (e.g., SSR), then we manually
        // call onLoad
//        console.log(target.complete)
        if (onLoad != null && target.complete) {
          onLoad({
            nativeEvent: getImageData(target)
          });
          return;
        }

        hostRef.current = target;
        if (onLoadStart != null) {
          onLoadStart({ nativeEvent: { target }});
        }
        target.addEventListener('error', errorListener);
        target.addEventListener('load', loadListener);
      } else if (hostRef.current != null) {
        const node = hostRef.current;
        node.removeEventListener('error', errorListener);
        node.removeEventListener('load', loadListener);
        hostRef.current = null;
      }
    },
    [onError, onLoad, onLoadEnd]
  );

    const platformMethodsRef = usePlatformMethods(supportedProps);

    const ref = useMergeRefs(
      hostRef,
      internalImageRef,
      platformMethodsRef,
      forwardedRef
    );

    supportedProps.alt = props.alternativeText;
    supportedProps.classList = hasTextAncestor ? inlineClassList : defaultClassList;
    supportedProps.decoding = props.decoding || 'async';
    supportedProps.draggable = props.draggable || false;
    supportedProps.loading = props.loading || 'lazy';
    supportedProps.ref = ref;
    supportedProps.src = managedSrc;
    supportedProps.srcSet = 
        srcSet != null && managedSrc !== ERROR_PLACEHOLDER
          ? srcSet.join(',')
          : null;
    supportedProps.style = flatStyle;

    return createElement('img', supportedProps);
  }
);

Image.displayName = 'Image';

const classes = css.create({
  image: {
    backgroundColor: 'transparent',
    border: '0 solid black',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    objectFit: 'cover',
    padding: 0,
    position: 'relative',
    zIndex: 0
  },
  inlineImage: {
    display: 'inline-flex'
  }
});

const defaultClassList = [classes.image];
const inlineClassList = [classes.image, classes.inlineImage];

const resizeModeStyles = {
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
    objectFit: 'none'
  },
  stretch: {
    objectFit: 'fill'
  }
};

// $FlowIgnore: This is the correct type, but casting makes it unhappy since the variables aren't defined yet
const ImageWithStatics = (Image: React.AbstractComponent<
  ImageProps,
  React.ElementRef<typeof View>
> &
  ImageStatics);

ImageWithStatics.getSize = function (uri, success, failure) {
  return ImageLoader.getSize(uri, success, failure);
};

ImageWithStatics.prefetch = function (uri) {
  return ImageLoader.prefetch(uri);
};

ImageWithStatics.queryCache = function (uris) {
  return ImageLoader.queryCache(uris);
};

export type { ImageProps };

export default ImageWithStatics;
