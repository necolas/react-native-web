/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from '../View';
import type { ResizeMode, Source, Style } from './types';

import applyNativeMethods from '../../modules/applyNativeMethods';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import { getAssetByID } from '../../modules/AssetRegistry';
import resolveShadowValue from '../StyleSheet/resolveShadowValue';
import ImageLoader from '../../modules/ImageLoader';
import ImageUriCache from './ImageUriCache';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import View from '../View';
import React from 'react';

export type ImageProps = {
  ...ViewProps,
  blurRadius?: number,
  defaultSource?: Source,
  draggable?: boolean,
  onError?: (e: any) => void,
  onLayout?: (e: any) => void,
  onLoad?: (e: any) => void,
  onLoadEnd?: (e: any) => void,
  onLoadStart?: (e: any) => void,
  onProgress?: (e: any) => void,
  resizeMode?: ResizeMode,
  source: Source,
  style?: Style
};

type State = {
  layout: Object,
  shouldDisplaySource: boolean
};

const STATUS_ERRORED = 'ERRORED';
const STATUS_LOADED = 'LOADED';
const STATUS_LOADING = 'LOADING';
const STATUS_PENDING = 'PENDING';
const STATUS_IDLE = 'IDLE';

const getImageState = (uri, shouldDisplaySource) => {
  return shouldDisplaySource ? STATUS_LOADED : uri ? STATUS_PENDING : STATUS_IDLE;
};

const resolveAssetDimensions = source => {
  if (typeof source === 'number') {
    const { height, width } = getAssetByID(source);
    return { height, width };
  } else if (typeof source === 'object') {
    const { height, width } = source;
    return { height, width };
  }
};

const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;
const resolveAssetUri = source => {
  let uri = '';
  if (typeof source === 'number') {
    // get the URI from the packager
    const asset = getAssetByID(source);
    const scale = asset.scales[0];
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
};

let filterId = 0;

const createTintColorSVG = (tintColor, id) =>
  tintColor && id != null ? (
    <svg style={{ position: 'absolute', height: 0, visibility: 'hidden', width: 0 }}>
      <defs>
        <filter id={`tint-${id}`}>
          <feFlood floodColor={`${tintColor}`} />
          <feComposite in2="SourceAlpha" operator="atop" />
        </filter>
      </defs>
    </svg>
  ) : null;

class Image extends React.Component<ImageProps, State> {
  static displayName = 'Image';

  static getSize(uri, success, failure) {
    ImageLoader.getSize(uri, success, failure);
  }

  static prefetch(uri) {
    return ImageLoader.prefetch(uri).then(() => {
      // Add the uri to the cache so it can be immediately displayed when used
      // but also immediately remove it to correctly reflect that it has no active references
      ImageUriCache.add(uri);
      ImageUriCache.remove(uri);
    });
  }

  static queryCache(uris) {
    const result = {};
    uris.forEach(u => {
      if (ImageUriCache.has(u)) {
        result[u] = 'disk/memory';
      }
    });
    return Promise.resolve(result);
  }

  _filterId = 0;
  _imageRef = null;
  _imageRequestId = null;
  _imageState = null;
  _isMounted = false;

  constructor(props, context) {
    super(props, context);
    // If an image has been loaded before, render it immediately
    const uri = resolveAssetUri(props.source);
    const shouldDisplaySource = ImageUriCache.has(uri);
    this.state = { layout: {}, shouldDisplaySource };
    this._imageState = getImageState(uri, shouldDisplaySource);
    this._filterId = filterId;
    filterId++;
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    } else if (this._imageState === STATUS_LOADED) {
      this._onLoad({ target: this._imageRef });
    }
  }

  componentDidUpdate(prevProps) {
    const prevUri = resolveAssetUri(prevProps.source);
    const uri = resolveAssetUri(this.props.source);
    const hasDefaultSource = this.props.defaultSource != null;
    if (prevUri !== uri) {
      ImageUriCache.remove(prevUri);
      const isPreviouslyLoaded = ImageUriCache.has(uri);
      isPreviouslyLoaded && ImageUriCache.add(uri);
      this._updateImageState(getImageState(uri, isPreviouslyLoaded), hasDefaultSource);
    } else if (hasDefaultSource && prevProps.defaultSource !== this.props.defaultSource) {
      this._updateImageState(this._imageState, hasDefaultSource);
    }
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
  }

  componentWillUnmount() {
    const uri = resolveAssetUri(this.props.source);
    ImageUriCache.remove(uri);
    this._destroyImageLoader();
    this._isMounted = false;
  }

  renderImage(hasTextAncestor) {
    const { shouldDisplaySource } = this.state;
    const {
      accessibilityLabel,
      accessibilityRelationship,
      accessibilityRole,
      accessibilityState,
      accessible,
      blurRadius,
      defaultSource,
      draggable,
      importantForAccessibility,
      nativeID,
      pointerEvents,
      resizeMode,
      source,
      testID
    } = this.props;

    if (process.env.NODE_ENV !== 'production') {
      if (this.props.children) {
        throw new Error(
          'The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.'
        );
      }
    }

    const selectedSource = shouldDisplaySource ? source : defaultSource;
    const displayImageUri = resolveAssetUri(selectedSource);
    const imageSizeStyle = resolveAssetDimensions(selectedSource);
    const backgroundImage = displayImageUri ? `url("${displayImageUri}")` : null;
    const flatStyle = { ...StyleSheet.flatten(this.props.style) };
    const finalResizeMode = resizeMode || flatStyle.resizeMode || 'cover';

    // CSS filters
    const filters = [];
    const tintColor = flatStyle.tintColor;
    if (flatStyle.filter) {
      filters.push(flatStyle.filter);
    }
    if (blurRadius) {
      filters.push(`blur(${blurRadius}px)`);
    }
    if (flatStyle.shadowOffset) {
      const shadowString = resolveShadowValue(flatStyle);
      if (shadowString) {
        filters.push(`drop-shadow(${shadowString})`);
      }
    }
    if (flatStyle.tintColor) {
      filters.push(`url(#tint-${this._filterId})`);
    }

    // these styles were converted to filters
    delete flatStyle.shadowColor;
    delete flatStyle.shadowOpacity;
    delete flatStyle.shadowOffset;
    delete flatStyle.shadowRadius;
    delete flatStyle.tintColor;
    // these styles are not supported on View
    delete flatStyle.overlayColor;
    delete flatStyle.resizeMode;

    // Accessibility image allows users to trigger the browser's image context menu
    const hiddenImage = displayImageUri
      ? createElement('img', {
          alt: accessibilityLabel || '',
          classList: [classes.accessibilityImage],
          draggable: draggable || false,
          ref: this._setImageRef,
          src: displayImageUri
        })
      : null;

    return (
      <View
        accessibilityLabel={accessibilityLabel}
        accessibilityRelationship={accessibilityRelationship}
        accessibilityRole={accessibilityRole}
        accessibilityState={accessibilityState}
        accessible={accessible}
        importantForAccessibility={importantForAccessibility}
        nativeID={nativeID}
        onLayout={this._createLayoutHandler(finalResizeMode)}
        pointerEvents={pointerEvents}
        style={[styles.root, hasTextAncestor && styles.inline, imageSizeStyle, flatStyle]}
        testID={testID}
      >
        <View
          style={[
            styles.image,
            resizeModeStyles[finalResizeMode],
            this._getBackgroundSize(finalResizeMode),
            backgroundImage && { backgroundImage },
            filters.length > 0 && { filter: filters.join(' ') }
          ]}
        />
        {hiddenImage}
        {createTintColorSVG(tintColor, this._filterId)}
      </View>
    );
  }

  render() {
    return (
      <TextAncestorContext.Consumer>
        {hasTextAncestor => this.renderImage(hasTextAncestor)}
      </TextAncestorContext.Consumer>
    );
  }

  _createImageLoader() {
    const { source } = this.props;
    this._destroyImageLoader();
    const uri = resolveAssetUri(source);
    this._imageRequestId = ImageLoader.load(uri, this._onLoad, this._onError);
    this._onLoadStart();
  }

  _destroyImageLoader() {
    if (this._imageRequestId) {
      ImageLoader.abort(this._imageRequestId);
      this._imageRequestId = null;
    }
  }

  _createLayoutHandler = resizeMode => {
    const { onLayout } = this.props;
    if (resizeMode === 'center' || resizeMode === 'repeat' || onLayout) {
      return e => {
        const { layout } = e.nativeEvent;
        onLayout && onLayout(e);
        this.setState(() => ({ layout }));
      };
    }
  };

  _getBackgroundSize = resizeMode => {
    if (this._imageRef && (resizeMode === 'center' || resizeMode === 'repeat')) {
      const { naturalHeight, naturalWidth } = this._imageRef;
      const { height, width } = this.state.layout;
      if (naturalHeight && naturalWidth && height && width) {
        const scaleFactor = Math.min(1, width / naturalWidth, height / naturalHeight);
        const x = Math.ceil(scaleFactor * naturalWidth);
        const y = Math.ceil(scaleFactor * naturalHeight);
        return {
          backgroundSize: `${x}px ${y}px`
        };
      }
    }
  };

  _onError = () => {
    const { onError, source } = this.props;
    this._updateImageState(STATUS_ERRORED);
    if (onError) {
      onError({
        nativeEvent: {
          error: `Failed to load resource ${resolveAssetUri(source)} (404)`
        }
      });
    }
    this._onLoadEnd();
  };

  _onLoad = e => {
    const { onLoad, source } = this.props;
    const event = { nativeEvent: e };
    ImageUriCache.add(resolveAssetUri(source));
    this._updateImageState(STATUS_LOADED);
    if (onLoad) {
      onLoad(event);
    }
    this._onLoadEnd();
  };

  _onLoadEnd() {
    const { onLoadEnd } = this.props;
    if (onLoadEnd) {
      onLoadEnd();
    }
  }

  _onLoadStart() {
    const { defaultSource, onLoadStart } = this.props;
    this._updateImageState(STATUS_LOADING, defaultSource != null);
    if (onLoadStart) {
      onLoadStart();
    }
  }

  _setImageRef = ref => {
    this._imageRef = ref;
  };

  _updateImageState(status: ?string, hasDefaultSource: ?boolean = false) {
    this._imageState = status;
    const shouldDisplaySource =
      this._imageState === STATUS_LOADED ||
      (this._imageState === STATUS_LOADING && !hasDefaultSource);
    // only triggers a re-render when the image is loading and has no default image (to support PJPEG), loaded, or failed
    if (shouldDisplaySource !== this.state.shouldDisplaySource) {
      if (this._isMounted) {
        this.setState(() => ({ shouldDisplaySource }));
      }
    }
  }
}

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

export default applyNativeMethods(Image);
