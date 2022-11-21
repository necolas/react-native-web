/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ImageResult } from '../../modules/ImageLoader';
import type { ImageProps, Source, ImageLoadingProps } from './types';

import * as React from 'react';
import createElement from '../createElement';
import { getAssetByID } from '../../modules/AssetRegistry';
import { createBoxShadowValue } from '../StyleSheet/preprocess';
import ImageLoader from '../../modules/ImageLoader';
import PixelRatio from '../PixelRatio';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import View from '../View';

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

function getFlatStyle(style, blurRadius, filterId) {
  const flatStyle = StyleSheet.flatten(style);
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
    const shadowString = createBoxShadowValue(flatStyle);
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
  } else if (
    source != null &&
    !Array.isArray(source) &&
    typeof source === 'object'
  ) {
    const { height, width } = source;
    return { height, width };
  }
}

// Todo: move this to ImageLoader, and handle URI create by URL.createObjectURL
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

const Image: React.AbstractComponent<
  ImageProps,
  React.ElementRef<typeof View>
> = React.forwardRef((props, ref) => {
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
  const { state, loadedUri } = useSource(
    { onLoad, onLoadStart, onLoadEnd, onError },
    source
  );
  const [layout, updateLayout] = React.useState({});
  const hasTextAncestor = React.useContext(TextAncestorContext);
  const hiddenImageRef = React.useRef(null);
  const filterRef = React.useRef(_filterId++);
  const shouldDisplaySource =
    state === LOADED || (state === LOADING && defaultSource == null);
  const [flatStyle, _resizeMode, filter, tintColor] = getFlatStyle(
    style,
    blurRadius,
    filterRef.current
  );
  const resizeMode = props.resizeMode || _resizeMode || 'cover';
  const selectedSource = shouldDisplaySource ? loadedUri : defaultSource;
  const displayImageUri = resolveAssetUri(selectedSource);
  const imageSizeStyle = resolveAssetDimensions(selectedSource);
  const backgroundImage = displayImageUri ? `url("${displayImageUri}")` : null;
  const backgroundSize = getBackgroundSize();

  // Accessibility image allows users to trigger the browser's image context menu
  const hiddenImage = displayImageUri
    ? createElement('img', {
        alt: accessibilityLabel || '',
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

  return (
    <View
      {...rest}
      accessibilityLabel={accessibilityLabel}
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

/**
 * Image loading/state management hook
 * @param params
 * @param source
 * @returns {{state: string, uri: string}}
 */
const useSource = (
  { onLoad, onLoadStart, onLoadEnd, onError }: ImageLoadingProps,
  source: ?Source
): { state: string, loadedUri: ?string } => {
  const input = React.useRef({ uri: '' });
  const [requestId, setRequestId] = React.useState(-1);
  const [state, setState] = React.useState(() => {
    const uri = resolveAssetUri(source);

    return {
      // Use the resolved URI for cases where it was already loaded or preloaded
      result: { uri },
      status: ImageLoader.has(uri) ? LOADED : IDLE
    };
  });

  const handleLoad = React.useCallback(
    (result: ImageResult) => {
      if (onLoad) onLoad(result);
      if (onLoadEnd) onLoadEnd();
      setState({ status: LOADED, result });
    },
    [onLoad, onLoadEnd]
  );

  const handleError = React.useCallback(
    (error) => {
      if (onError) {
        onError({
          nativeEvent: {
            error: `Failed to load resource ${input.current.uri} (404)`
          }
        });
      }
      if (onLoadEnd) onLoadEnd();

      setState({ status: ERRORED, result: error });
    },
    [onError, onLoadEnd]
  );

  const startLoading = React.useCallback(
    (nextInput) => {
      if (onLoadStart) onLoadStart();
      const requestId = ImageLoader.load(nextInput, handleLoad, handleError);
      setRequestId(requestId);

      setState((prevState) => ({ ...prevState, status: LOADING }));
    },
    [handleError, handleLoad, onLoadStart]
  );

  // Cleanup on umount or after starting a new request
  React.useEffect(() => {
    return () => {
      if (requestId > 0) ImageLoader.release(requestId);
    };
  }, [requestId]);

  // (Maybe) start loading on source changes
  React.useEffect(() => {
    const uri = resolveAssetUri(source);
    if (uri == null) return;

    let headers;
    if (source && typeof source.headers === 'object') {
      headers = ((source.headers: any): { [key: string]: string });
    }

    const nextInput = { uri, headers };

    // Do nothing if the input is virtually the same as the last loaded source
    if (JSON.stringify(nextInput) === JSON.stringify(input.current)) return;

    input.current = nextInput;
    startLoading(nextInput);
  }, [source, startLoading]);

  return {
    state: state.status,
    loadedUri: state.result.uri
  };
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
