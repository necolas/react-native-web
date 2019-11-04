/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import createElement from '../createElement';
import css from '../StyleSheet/css';
import { getAssetByID } from '../../modules/AssetRegistry';
import resolveShadowValue from '../StyleSheet/resolveShadowValue';
import ImageLoader from '../../modules/ImageLoader';
import ImageResizeMode from './ImageResizeMode';
import ImageSourcePropType from './ImageSourcePropType';
import ImageStylePropTypes from './ImageStylePropTypes';
import ImageUriCache from './ImageUriCache';
import StyleSheet from '../StyleSheet';
import StyleSheetPropType from '../../modules/StyleSheetPropType';
import View from '../View';
import ViewPropTypes from '../ViewPropTypes';
import { bool, func, number, oneOf, shape } from 'prop-types';
import React, { Component } from 'react';

const emptyObject = {};

const STATUS_ERRORED = 'ERRORED';
const STATUS_LOADED = 'LOADED';
const STATUS_LOADING = 'LOADING';
const STATUS_PENDING = 'PENDING';
const STATUS_IDLE = 'IDLE';

const getImageState = (uri, shouldDisplaySource) => {
  return shouldDisplaySource ? STATUS_LOADED : uri ? STATUS_PENDING : STATUS_IDLE;
};

const resolveAssetDimensions = source => {
  return {
    height: source.height,
    width: source.width
  };
};

const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;
const resolveAssetSource = source => {
  let resolvedSource = {
    method: 'GET',
    uri: '',
    headers: {},
    width: undefined,
    height: undefined
  };
  if (typeof source === 'number') {
    // get the URI from the packager
    const asset = getAssetByID(source);
    const scale = asset.scales[0];
    const scaleSuffix = scale !== 1 ? `@${scale}x` : '';
    resolvedSource.uri = asset
      ? `${asset.httpServerLocation}/${asset.name}${scaleSuffix}.${asset.type}`
      : '';
    resolvedSource.width = asset.width;
    resolvedSource.height = asset.height;
  } else if (typeof source === 'string') {
    resolvedSource.uri = source;
  } else if (typeof source === 'object') {
    resolvedSource = {
      ...resolvedSource,
      ...source
    };
  }

  if (resolvedSource.uri) {
    const match = resolvedSource.uri.match(svgDataUriPattern);
    // inline SVG markup may contain characters (e.g., #, ") that need to be escaped
    if (match) {
      const [, prefix, svg] = match;
      const encodedSvg = encodeURIComponent(svg);
      resolvedSource.uri = `${prefix}${encodedSvg}`;
    }
  }

  return resolvedSource;
};
const getCacheId = source => {
  return JSON.stringify(resolveAssetSource(source));
};
const getCacheUrl = e => {
  return e.path && e.path[0].src;
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

type State = {
  layout: Object,
  shouldDisplaySource: boolean,
  displayImageUri: string
};

class Image extends Component<*, State> {
  static displayName = 'Image';

  static contextTypes = {
    isInAParentText: bool
  };

  static propTypes = {
    ...ViewPropTypes,
    blurRadius: number,
    defaultSource: ImageSourcePropType,
    draggable: bool,
    onError: func,
    onLayout: func,
    onLoad: func,
    onLoadEnd: func,
    onLoadStart: func,
    resizeMode: oneOf(Object.keys(ImageResizeMode)),
    source: ImageSourcePropType,
    style: StyleSheetPropType(ImageStylePropTypes),
    // compatibility with React Native
    /* eslint-disable react/sort-prop-types */
    capInsets: shape({ top: number, left: number, bottom: number, right: number }),
    resizeMethod: oneOf(['auto', 'resize', 'scale'])
    /* eslint-enable react/sort-prop-types */
  };

  static defaultProps = {
    style: emptyObject
  };

  static getSize(uri, success, failure) {
    ImageLoader.getSize(uri, success, failure);
  }

  static prefetch(uri) {
    return ImageLoader.prefetch(uri).then(e => {
      // Add the uri to the cache so it can be immediately displayed when used
      // but also immediately remove it to correctly reflect that it has no active references
      ImageUriCache.add(uri, getCacheUrl(e));
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
    const cacheId = getCacheId(props.source);
    const resolvedSource = resolveAssetSource(props.source);
    const resolvedDefaultSource = resolveAssetSource(props.defaultSource);
    const cachedSource = ImageUriCache.get(cacheId);
    const shouldDisplaySource = !!cachedSource;
    this.state = {
      layout: {},
      shouldDisplaySource,
      displayImageUri: shouldDisplaySource
        ? cachedSource.uri
        : resolvedDefaultSource.uri || resolvedSource.uri
    };
    this._imageState = getImageState(resolvedSource.uri, shouldDisplaySource);
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
    const prevCacheId = getCacheId(prevProps.source);
    const cacheId = getCacheId(this.props.source);
    const hasDefaultSource = this.props.defaultSource != null;
    if (prevCacheId !== cacheId) {
      ImageUriCache.remove(prevCacheId);
      const isPreviouslyLoaded = ImageUriCache.has(cacheId);
      isPreviouslyLoaded && ImageUriCache.add(cacheId);
      this._updateImageState(getImageState(cacheId, isPreviouslyLoaded), hasDefaultSource);
    } else if (hasDefaultSource && prevProps.defaultSource !== this.props.defaultSource) {
      this._updateImageState(this._imageState, hasDefaultSource);
    }
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
  }

  componentWillUnmount() {
    const cacheId = getCacheId(this.props.source);
    ImageUriCache.remove(cacheId);
    this._destroyImageLoader();
    this._isMounted = false;
  }

  render() {
    const { displayImageUri, shouldDisplaySource } = this.state;
    const {
      accessibilityLabel,
      accessible,
      blurRadius,
      defaultSource,
      draggable,
      source,
      testID,
      /* eslint-disable */
      capInsets,
      onError,
      onLayout,
      onLoad,
      onLoadEnd,
      onLoadStart,
      resizeMethod,
      resizeMode,
      /* eslint-enable */
      ...other
    } = this.props;

    if (process.env.NODE_ENV !== 'production') {
      if (this.props.src) {
        console.warn('The <Image> component requires a `source` property rather than `src`.');
      }

      if (this.props.children) {
        throw new Error(
          'The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.'
        );
      }
    }

    const selectedSource = resolveAssetSource(shouldDisplaySource ? source : defaultSource);
    const imageSizeStyle = resolveAssetDimensions(selectedSource);
    const backgroundImage = displayImageUri ? `url("${displayImageUri}")` : null;
    const flatStyle = { ...StyleSheet.flatten(this.props.style) };
    const finalResizeMode = resizeMode || flatStyle.resizeMode || ImageResizeMode.cover;

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
        {...other}
        accessibilityLabel={accessibilityLabel}
        accessible={accessible}
        onLayout={this._createLayoutHandler(finalResizeMode)}
        style={[
          styles.root,
          this.context.isInAParentText && styles.inline,
          imageSizeStyle,
          flatStyle
        ]}
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

  _createImageLoader() {
    const { source } = this.props;
    this._destroyImageLoader();
    this._imageRequestId = ImageLoader.load(
      resolveAssetSource(source),
      this._onLoad,
      this._onError
    );
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
          error: `Failed to load resource ${resolveAssetSource(source).uri} (404)`
        }
      });
    }
    this._onLoadEnd();
  };

  _onLoad = e => {
    const { onLoad, source } = this.props;
    const event = { nativeEvent: e };
    ImageUriCache.add(getCacheId(source), getCacheUrl(e));
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
    const { source } = this.props;
    this._imageState = status;
    const shouldDisplaySource =
      this._imageState === STATUS_LOADED ||
      (this._imageState === STATUS_LOADING && !hasDefaultSource);
    const cachedId = getCacheId(source);
    const { displayImageUri } = ImageUriCache.has(cachedId)
      ? ImageUriCache.get(cachedId)
      : this.state;

    // only triggers a re-render when the image is loading and has no default image (to support PJPEG), loaded, or failed
    if (
      shouldDisplaySource !== this.state.shouldDisplaySource ||
      displayImageUri !== this.state.displayImageUri
    ) {
      if (this._isMounted) {
        this.setState(() => ({
          shouldDisplaySource,
          displayImageUri
        }));
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
