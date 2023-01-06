/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ImageSource, LoadRequest } from '../../modules/ImageLoader';
import type { ImageProps } from './types';

import * as React from 'react';
import createElement from '../createElement';
import { getAssetByID } from '../../modules/AssetRegistry';
import { createBoxShadowValue } from '../StyleSheet/preprocess';
import ImageLoader from '../../modules/ImageLoader';
import PixelRatio from '../PixelRatio';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import View from '../View';
import { warnOnce } from '../../modules/warnOnce';

export type { ImageProps };

const ERRORED = 'ERRORED';
const LOADED = 'LOADED';
const LOADING = 'LOADING';
const IDLE = 'IDLE';

let _filterId = 0;
const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

function createTintColorSVG(tintColor, id) {
  return tintColor && id != null ? (
    <svg
      style={{
        position: 'absolute',
        height: 0,
        visibility: 'hidden',
        width: 0
      }}
    >
      <defs>
        <filter id={`tint-${id}`} suppressHydrationWarning={true}>
          <feFlood floodColor={`${tintColor}`} key={tintColor} />
          <feComposite in2="SourceAlpha" operator="atop" />
        </filter>
      </defs>
    </svg>
  ) : null;
}

function getFlatStyle(style, blurRadius, filterId, tintColorProp) {
  const flatStyle = StyleSheet.flatten(style);
  const { filter, resizeMode, shadowOffset, tintColor } = flatStyle;

  if (flatStyle.resizeMode) {
    warnOnce(
      'Image.style.resizeMode',
      'Image: style.resizeMode is deprecated. Please use props.resizeMode.'
    );
  }
  if (flatStyle.tintColor) {
    warnOnce(
      'Image.style.tintColor',
      'Image: style.tintColor is deprecated. Please use props.tintColor.'
    );
  }

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
    const shadowString = createBoxShadowValue(flatStyle);
    if (shadowString) {
      filters.push(`drop-shadow(${shadowString})`);
    }
  }
  if ((tintColorProp || tintColor) && filterId != null) {
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
  } else if (
    source != null &&
    !Array.isArray(source) &&
    typeof source === 'object'
  ) {
    const { height, width } = source;
    return { height, width };
  }
}

function resolveAssetUri(source): ?string {
  let uri = null;
  if (typeof source === 'number') {
    // get the URI from the packager
    const asset = getAssetByID(source);
    if (asset == null) {
      throw new Error(
        `Image: asset with ID "${source}" could not be found. Please check the image source or packager.`
      );
    }
    let scale = asset.scales[0];
    if (asset.scales.length > 1) {
      const preferredScale = PixelRatio.get();
      // Get the scale which is closest to the preferred scale
      scale = asset.scales.reduce((prev, curr) =>
        Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale)
          ? curr
          : prev
      );
    }
    const scaleSuffix = scale !== 1 ? `@${scale}x` : '';
    uri = asset
      ? `${asset.httpServerLocation}/${asset.name}${scaleSuffix}.${asset.type}`
      : '';
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

function raiseOnErrorEvent(uri, { onError, onLoadEnd }) {
  if (onError) {
    onError({
      nativeEvent: {
        error: `Failed to load resource ${uri} (404)`
      }
    });
  }
  if (onLoadEnd) onLoadEnd();
}

function hasSourceDiff(a: ImageSource, b: ImageSource) {
  return (
    a.uri !== b.uri || JSON.stringify(a.headers) !== JSON.stringify(b.headers)
  );
}

interface ImageStatics {
  getSize: (
    uri: string,
    success: (width: number, height: number) => void,
    failure: () => void
  ) => void;
  prefetch: (uri: string) => Promise<void>;
  queryCache: (
    uris: Array<string>
  ) => Promise<{| [uri: string]: 'disk/memory' |}>;
}

type ImageComponent = React.AbstractComponent<
  ImageProps,
  React.ElementRef<typeof View>
>;

const BaseImage: ImageComponent = React.forwardRef((props, ref) => {
  const {
    'aria-label': ariaLabel,
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
  const filterRef = React.useRef(_filterId++);
  const requestRef = React.useRef(null);
  const shouldDisplaySource =
    state === LOADED || (state === LOADING && defaultSource == null);
  const [flatStyle, _resizeMode, filter, _tintColor] = getFlatStyle(
    style,
    blurRadius,
    filterRef.current,
    props.tintColor
  );
  const resizeMode = props.resizeMode || _resizeMode || 'cover';
  const tintColor = props.tintColor || _tintColor;
  const selectedSource = shouldDisplaySource ? source : defaultSource;
  const displayImageUri = resolveAssetUri(selectedSource);
  const imageSizeStyle = resolveAssetDimensions(selectedSource);
  const backgroundImage = displayImageUri ? `url("${displayImageUri}")` : null;
  const backgroundSize = getBackgroundSize();

  // Accessibility image allows users to trigger the browser's image context menu
  const hiddenImage = displayImageUri
    ? createElement('img', {
        alt: ariaLabel || '',
        style: styles.accessibilityImage$raw,
        draggable: draggable || false,
        ref: hiddenImageRef,
        src: displayImageUri
      })
    : null;

  function getBackgroundSize(): ?string {
    if (
      hiddenImageRef.current != null &&
      (resizeMode === 'center' || resizeMode === 'repeat')
    ) {
      const { naturalHeight, naturalWidth } = hiddenImageRef.current;
      const { height, width } = layout;
      if (naturalHeight && naturalWidth && height && width) {
        const scaleFactor = Math.min(
          1,
          width / naturalWidth,
          height / naturalHeight
        );
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
          raiseOnErrorEvent(uri, { onError, onLoadEnd });
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
      aria-label={ariaLabel}
      onLayout={handleLayout}
      pointerEvents={pointerEvents}
      ref={ref}
      style={[
        styles.root,
        hasTextAncestor && styles.inline,
        imageSizeStyle,
        flatStyle
      ]}
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

BaseImage.displayName = 'Image';

/**
 * This component handles specifically loading an image source with headers
 * default source is never loaded using headers
 */
const ImageWithHeaders: ImageComponent = React.forwardRef((props, ref) => {
  // $FlowIgnore: This component would only be rendered when `source` matches `ImageSource`
  const nextSource: ImageSource = props.source;
  const [blobUri, setBlobUri] = React.useState('');
  const request = React.useRef<LoadRequest>({
    cancel: () => {},
    source: { uri: '', headers: {} },
    promise: Promise.resolve('')
  });

  const { onLoadStart, ...forwardedProps } = props;
  const { onError, onLoadEnd } = forwardedProps;

  React.useEffect(() => {
    if (!hasSourceDiff(nextSource, request.current.source)) {
      return;
    }

    // When source changes we want to clean up any old/running requests
    request.current.cancel();

    if (onLoadStart) {
      onLoadStart();
    }

    // Store a ref for the current load request so we know what's the last loaded source,
    // and so we can cancel it if a different source is passed through props
    request.current = ImageLoader.loadWithHeaders(nextSource);

    request.current.promise
      .then((uri) => setBlobUri(uri))
      .catch(() =>
        raiseOnErrorEvent(request.current.source.uri, { onError, onLoadEnd })
      );
  }, [nextSource, onLoadStart, onError, onLoadEnd]);

  // Cancel any request on unmount
  React.useEffect(() => request.current.cancel, []);

  // Until the current component resolves the request (using headers)
  // we skip forwarding the source so the base component doesn't attempt
  // to load the original source
  const source = blobUri ? { ...nextSource, uri: blobUri } : undefined;

  return <BaseImage {...forwardedProps} ref={ref} source={source} />;
});

// $FlowFixMe
const ImageWithStatics: ImageComponent & ImageStatics = React.forwardRef(
  (props, ref) => {
    if (props.source && props.source.headers) {
      return <ImageWithHeaders {...props} ref={ref} />;
    }

    return <BaseImage {...props} ref={ref} />;
  }
);

ImageWithStatics.getSize = function (uri, success, failure) {
  ImageLoader.getSize(uri, success, failure);
};

ImageWithStatics.prefetch = function (uri) {
  return ImageLoader.prefetch(uri);
};

ImageWithStatics.queryCache = function (uris) {
  return ImageLoader.queryCache(uris);
};

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
  },
  accessibilityImage$raw: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0,
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
    backgroundPosition: '0',
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundPosition: '0',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});

export default ImageWithStatics;
