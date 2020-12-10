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

import createElement from '../createElement';
import css from '../StyleSheet/css';
import resolveShadowValue from '../StyleSheet/resolveShadowValue';
import ImageLoader, { ImageUriCache } from '../../modules/ImageLoader';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import View from '../View';
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';

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

const Image = forwardRef<ImageProps, *>((props, ref) => {
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
    onProgress,
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
  const cachedSource = ImageUriCache.get(source);
  const resolvedSource = ImageLoader.resolveSource(source);
  const resolvedDefaultSource = ImageLoader.resolveSource(defaultSource);
  const [state, updateState] = useState(() => {
    if (source != null) {
      const isLoaded = ImageUriCache.has(source);

      if (isLoaded) {
        return LOADED;
      }
    }

    return IDLE;
  });
  const [layout, updateLayout] = useState({});
  const hasTextAncestor = useContext(TextAncestorContext);
  const hiddenImageRef = useRef(null);
  const filterRef = useRef(_filterId++);
  const requestRef = useRef(null);
  const shouldDisplaySource = state === LOADED || (state === LOADING && defaultSource == null);
  const [flatStyle, _resizeMode, filter, tintColor] = getFlatStyle(
    style,
    blurRadius,
    filterRef.current
  );
  const resizeMode = props.resizeMode || _resizeMode || 'cover';
  const selectedSource = shouldDisplaySource ? resolvedSource : resolvedDefaultSource;
  const displayImageUri = (cachedSource && cachedSource.displayImageUri) || selectedSource.uri;
  const imageSizeStyle = {
    height: selectedSource.height,
    width: selectedSource.width
  };

  const backgroundImage = displayImageUri ? `url("${displayImageUri}")` : null;
  const backgroundSize = getBackgroundSize();

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
  const { uri } = resolvedSource;
  useEffect(() => {
    abortPendingRequest();

    if (uri) {
      updateState(LOADING);
      if (onLoadStart) {
        onLoadStart();
      }

      requestRef.current = ImageLoader.load(
        source,
        function load(e, imageUri) {
          imageUri && ImageUriCache.add(source, imageUri);

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
        },
        function progress(event) {
          if (onProgress) {
            onProgress({
              nativeEvent: event
            });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri, onError, onLoad, onProgress, onLoadEnd, onLoadStart]);

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
        suppressHydrationWarning={true}
      />
      {hiddenImage}
      {createTintColorSVG(tintColor, filterRef.current)}
    </View>
  );
});

Image.displayName = 'Image';

// $FlowFixMe
Image.getSize = function(uri, success, failure) {
  ImageLoader.getSize(uri, success, failure);
};

// $FlowFixMe
Image.prefetch = function(uri) {
  return ImageLoader.prefetch(uri);
};

// $FlowFixMe
Image.queryCache = function(uris) {
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

export default Image;
