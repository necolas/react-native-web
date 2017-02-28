/* global window */
import applyNativeMethods from '../../modules/applyNativeMethods';
import createDOMElement from '../../modules/createDOMElement';
import ImageResizeMode from './ImageResizeMode';
import ImageLoader from '../../modules/ImageLoader';
import ImageStylePropTypes from './ImageStylePropTypes';
import requestIdleCallback, { cancelIdleCallback } from '../../modules/requestIdleCallback';
import StyleSheet from '../../apis/StyleSheet';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import View from '../View';
import ViewPropTypes from '../View/ViewPropTypes';
import React, { Component, PropTypes } from 'react';

const emptyObject = {};

const STATUS_ERRORED = 'ERRORED';
const STATUS_LOADED = 'LOADED';
const STATUS_LOADING = 'LOADING';
const STATUS_PENDING = 'PENDING';
const STATUS_IDLE = 'IDLE';

const ImageSourcePropType = PropTypes.oneOfType([
  PropTypes.shape({
    height: PropTypes.number,
    uri: PropTypes.string.isRequired,
    width: PropTypes.number
  }),
  PropTypes.string
]);

const resolveAssetDimensions = source => {
  if (typeof source === 'object') {
    const { height, width } = source;
    return { height, width };
  }
};

const resolveAssetSource = source => {
  return (typeof source === 'object' ? source.uri : source) || null;
};

class Image extends Component {
  static displayName = 'Image';

  static propTypes = {
    ...ViewPropTypes,
    children: PropTypes.any,
    defaultSource: ImageSourcePropType,
    onError: PropTypes.func,
    onLayout: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    onLoadStart: PropTypes.func,
    resizeMode: PropTypes.oneOf(Object.keys(ImageResizeMode)),
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

  constructor(props, context) {
    super(props, context);
    this.state = { shouldDisplaySource: false };
    const uri = resolveAssetSource(props.source);
    this._imageState = uri ? STATUS_PENDING : STATUS_IDLE;
    this._isMounted = false;
  }

  componentDidMount() {
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
    this._isMounted = true;
  }

  componentDidUpdate() {
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextUri = resolveAssetSource(nextProps.source);
    if (resolveAssetSource(this.props.source) !== nextUri) {
      this._updateImageState(nextUri ? STATUS_PENDING : STATUS_IDLE);
    }
  }

  componentWillUnmount() {
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
      backgroundImage && { backgroundImage }
    ]);
    // View doesn't support 'resizeMode' as a style
    delete style.resizeMode;

    // Allows users to trigger the browser's image context menu
    const hiddenImage = displayImage
      ? createDOMElement('img', {
          src: displayImage,
          style: [StyleSheet.absoluteFill, styles.img]
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
    this._loadRequest = requestIdleCallback(() => {
      this._destroyImageLoader();
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
    const { onLoad } = this.props;
    const event = { nativeEvent: e };

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
    const shouldDisplaySource = this._imageState === STATUS_LOADED ||
      this._imageState === STATUS_LOADING;
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
  img: {
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

module.exports = applyNativeMethods(Image);
