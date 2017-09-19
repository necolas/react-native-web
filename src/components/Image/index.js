/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Image
 * @flow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import createElement from '../../modules/createElement';
import { getAssetByID } from '../../modules/AssetRegistry';
import ImageLoader from '../../modules/ImageLoader';
import ImageResizeMode from './ImageResizeMode';
import ImageStylePropTypes from './ImageStylePropTypes';
import ImageUriCache from './ImageUriCache';
import requestIdleCallback, { cancelIdleCallback } from '../../modules/requestIdleCallback';
import StyleSheet from '../../apis/StyleSheet';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';
import { any, bool, func, number, oneOf, oneOfType, shape, string } from 'prop-types';
import React, { Component } from 'react';

const emptyObject = {};

const STATUS_ERRORED = 'ERRORED';
const STATUS_LOADED = 'LOADED';
const STATUS_LOADING = 'LOADING';
const STATUS_PENDING = 'PENDING';
const STATUS_IDLE = 'IDLE';

const ImageSourcePropType = oneOfType([
  number,
  shape({
    height: number,
    uri: string.isRequired,
    width: number
  }),
  string
]);

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

const svgDataUriPattern = /^data:image\/svg\+xml;/;
const resolveAssetSource = source => {
  let uri;
  if (typeof source === 'number') {
    // get the URI from the packager
    const asset = getAssetByID(source);
    const scale = asset.scales[0];
    const scaleSuffix = scale !== 1 ? `@${scale}x` : '';
    uri = asset ? `${asset.httpServerLocation}/${asset.name}${scaleSuffix}.${asset.type}` : '';
  } else if (source && source.uri) {
    uri = source.uri;
  } else {
    uri = source || '';
  }

  // SVG data may contain characters (e.g., #, ") that need to be escaped
  if (svgDataUriPattern.test(uri)) {
    const parts = uri.split('<svg');
    const [prefix, ...svgFragment] = parts;
    const svg = encodeURIComponent(`<svg${svgFragment.join('<svg')}`);
    return `${prefix}${svg}`;
  }

  return uri;
};

class Image extends Component {
  state: { shouldDisplaySource: boolean };

  static displayName = 'Image';

  static contextTypes = {
    isInAParentText: bool
  };

  static propTypes = {
    ...ViewPropTypes,
    children: any,
    defaultSource: ImageSourcePropType,
    draggable: bool,
    onError: func,
    onLayout: func,
    onLoad: func,
    onLoadEnd: func,
    onLoadStart: func,
    resizeMode: oneOf(Object.keys(ImageResizeMode)),
    source: ImageSourcePropType,
    style: StyleSheetPropType(ImageStylePropTypes)
  };

  static defaultProps = {
    style: emptyObject
  };

  static getSize(uri, success, failure) {
    ImageLoader.getSize(uri, success, failure);
  }

  static prefetch(uri) {
    return ImageLoader.prefetch(uri);
  }

  static resizeMode = ImageResizeMode;

  _imageRequestId = null;
  _imageState = null;
  _isMounted = false;
  _loadRequest = null;

  constructor(props, context) {
    super(props, context);
    // If an image has been loaded before, render it immediately
    const uri = resolveAssetSource(props.source);
    const shouldDisplaySource = ImageUriCache.has(uri);
    this.state = { shouldDisplaySource };
    this._imageState = getImageState(uri, shouldDisplaySource);
    shouldDisplaySource && ImageUriCache.add(uri);
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
  }

  componentDidUpdate() {
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    const uri = resolveAssetSource(this.props.source);
    const nextUri = resolveAssetSource(nextProps.source);
    if (uri !== nextUri) {
      ImageUriCache.remove(uri);
      const isPreviouslyLoaded = ImageUriCache.has(nextUri);
      isPreviouslyLoaded && ImageUriCache.add(uri);
      this._updateImageState(getImageState(uri, isPreviouslyLoaded));
    }
  }

  componentWillUnmount() {
    ImageUriCache.remove(resolveAssetSource(this.props.source));
    this._destroyImageLoader();
    this._isMounted = false;
  }

  render() {
    const { shouldDisplaySource } = this.state;
    const {
      accessibilityLabel,
      accessible,
      children,
      defaultSource,
      draggable,
      onLayout,
      source,
      testID,
      /* eslint-disable */
      onError,
      onLoad,
      onLoadEnd,
      onLoadStart,
      resizeMode,
      /* eslint-enable */
      ...other
    } = this.props;

    const displayImage = resolveAssetSource(shouldDisplaySource ? source : defaultSource);
    const imageSizeStyle = resolveAssetDimensions(shouldDisplaySource ? source : defaultSource);
    const backgroundImage = displayImage ? `url("${displayImage}")` : null;
    const originalStyle = StyleSheet.flatten(this.props.style);
    const finalResizeMode = resizeMode || originalStyle.resizeMode || ImageResizeMode.cover;

    const style = StyleSheet.flatten([
      styles.initial,
      imageSizeStyle,
      originalStyle,
      resizeModeStyles[finalResizeMode],
      this.context.isInAParentText && styles.inline,
      backgroundImage && { backgroundImage }
    ]);
    // View doesn't support these styles
    delete style.overlayColor;
    delete style.resizeMode;
    delete style.tintColor;

    // Allows users to trigger the browser's image context menu
    const hiddenImage = displayImage
      ? createElement('img', {
          alt: accessibilityLabel || '',
          draggable,
          src: displayImage,
          style: styles.img
        })
      : null;

    return (
      <View
        {...other}
        accessibilityLabel={accessibilityLabel}
        accessible={accessible}
        onLayout={onLayout}
        style={style}
        testID={testID}
      >
        {hiddenImage}
        {children}
      </View>
    );
  }

  _createImageLoader() {
    this._destroyImageLoader();
    this._loadRequest = requestIdleCallback(() => {
      const uri = resolveAssetSource(this.props.source);
      this._imageRequestId = ImageLoader.load(uri, this._onLoad, this._onError);
      this._onLoadStart();
    });
  }

  _destroyImageLoader() {
    if (this._loadRequest) {
      cancelIdleCallback(this._loadRequest);
      this._loadRequest = null;
    }

    if (this._imageRequestId) {
      ImageLoader.abort(this._imageRequestId);
      this._imageRequestId = null;
    }
  }

  _onError = () => {
    const { onError, source } = this.props;
    this._updateImageState(STATUS_ERRORED);
    if (onError) {
      onError({
        nativeEvent: {
          error: `Failed to load resource ${resolveAssetSource(source)} (404)`
        }
      });
    }
    this._onLoadEnd();
  };

  _onLoad = e => {
    const { onLoad, source } = this.props;
    const event = { nativeEvent: e };
    ImageUriCache.add(resolveAssetSource(source));
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
    const { onLoadStart } = this.props;
    this._updateImageState(STATUS_LOADING);
    if (onLoadStart) {
      onLoadStart();
    }
  }

  _updateImageState(status) {
    this._imageState = status;
    const shouldDisplaySource =
      this._imageState === STATUS_LOADED || this._imageState === STATUS_LOADING;
    // only triggers a re-render when the image is loading (to support PJEG), loaded, or failed
    if (shouldDisplaySource !== this.state.shouldDisplaySource) {
      if (this._isMounted) {
        this.setState(() => ({ shouldDisplaySource }));
      }
    }
  }
}

const styles = StyleSheet.create({
  initial: {
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    opacity: 0,
    width: '100%',
    zIndex: -1
  }
});

const resizeModeStyles = StyleSheet.create({
  center: {
    backgroundSize: 'auto',
    backgroundPosition: 'center'
  },
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundSize: 'auto',
    backgroundRepeat: 'repeat'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});

export default applyNativeMethods(Image);
