/* global window */
import applyNativeMethods from '../../modules/applyNativeMethods';
import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import createDOMElement from '../../modules/createDOMElement';
import ImageResizeMode from './ImageResizeMode';
import ImageStylePropTypes from './ImageStylePropTypes';
import StyleSheet from '../../apis/StyleSheet';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import View from '../View';
import React, { Component, PropTypes } from 'react';

const STATUS_ERRORED = 'ERRORED';
const STATUS_LOADED = 'LOADED';
const STATUS_LOADING = 'LOADING';
const STATUS_PENDING = 'PENDING';
const STATUS_IDLE = 'IDLE';

const ImageSourcePropType = PropTypes.oneOfType([
  PropTypes.shape({
    uri: PropTypes.string.isRequired
  }),
  PropTypes.string
]);

const resolveAssetSource = (source) => {
  return ((typeof source === 'object') ? source.uri : source) || null;
};

class Image extends Component {
  static displayName = 'Image';

  static propTypes = {
    ...BaseComponentPropTypes,
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
    accessible: true,
    style: {}
  };

  static resizeMode = ImageResizeMode;

  constructor(props, context) {
    super(props, context);
    this.state = { isLoaded: false };
    const uri = resolveAssetSource(props.source);
    this._imageState = uri ? STATUS_PENDING : STATUS_IDLE;
  }

  componentDidMount() {
    if (this._imageState === STATUS_PENDING) {
      this._createImageLoader();
    }
  }

  componentDidUpdate() {
    if (this._imageState === STATUS_PENDING && !this.image) {
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
  }

  render() {
    const { isLoaded } = this.state;
    const {
      accessibilityLabel,
      accessible,
      children,
      defaultSource,
      onLayout,
      source,
      testID
    } = this.props;

    const displayImage = resolveAssetSource(!isLoaded ? defaultSource : source);
    const backgroundImage = displayImage ? `url("${displayImage}")` : null;
    let style = StyleSheet.flatten(this.props.style);

    //translateZ property triggers hardware acceleration for better rendering of the background-image property
    const hasTranslateZ = style.transform && style.transform.reduce((acc, t) => acc || t && t.hasOwnProperty('translateZ'), false);
    if(!hasTranslateZ) {
      style.transform = Array.isArray(style.transform) ? style.transform : [];
      style.transform.unshift({translateZ: 0}); //only add translateZ if not already present, so as not to override its value
    }
    
    const resizeMode = this.props.resizeMode || style.resizeMode || ImageResizeMode.cover;
    // remove 'resizeMode' style, as it is not supported by View (N.B. styles are frozen in dev)
    style = process.env.NODE_ENV !== 'production' ? { ...style } : style;
    delete style.resizeMode;

    /**
     * Image is a non-stretching View. The image is displayed as a background
     * image to support `resizeMode`. The HTML image is hidden but used to
     * provide the correct responsive image dimensions, and to support the
     * image context menu. Child content is rendered into an element absolutely
     * positioned over the image.
     */
    return (
      <View
        accessibilityLabel={accessibilityLabel}
        accessibilityRole='img'
        accessible={accessible}
        onLayout={onLayout}
        style={[
          styles.initial,
          style,
          backgroundImage && { backgroundImage },
          resizeModeStyles[resizeMode]
        ]}
        testID={testID}
      >
        {createDOMElement('img', { src: displayImage, style: styles.img })}
        {children ? (
          <View children={children} pointerEvents='box-none' style={styles.children} />
        ) : null}
      </View>
    );
  }

  _createImageLoader() {
    const uri = resolveAssetSource(this.props.source);

    this._destroyImageLoader();
    this.image = new window.Image();
    this.image.onerror = this._onError;
    this.image.onload = this._onLoad;
    this.image.src = uri;
    this._onLoadStart();
  }

  _destroyImageLoader() {
    if (this.image) {
      this.image.onerror = null;
      this.image.onload = null;
      this.image = null;
    }
  }

  _onError = (e) => {
    const { onError } = this.props;
    const event = { nativeEvent: e };

    this._destroyImageLoader();
    this._updateImageState(STATUS_ERRORED);
    this._onLoadEnd();
    if (onError) { onError(event); }
  }

  _onLoad = (e) => {
    const { onLoad } = this.props;
    const event = { nativeEvent: e };

    this._destroyImageLoader();
    this._updateImageState(STATUS_LOADED);
    if (onLoad) { onLoad(event); }
    this._onLoadEnd();
  }

  _onLoadEnd() {
    const { onLoadEnd } = this.props;
    if (onLoadEnd) { onLoadEnd(); }
  }

  _onLoadStart() {
    const { onLoadStart } = this.props;
    this._updateImageState(STATUS_LOADING);
    if (onLoadStart) { onLoadStart(); }
  }

  _updateImageState(status) {
    this._imageState = status;
    const isLoaded = this._imageState === STATUS_LOADED;
    if (isLoaded !== this.state.isLoaded) {
      this.setState({ isLoaded });
    }
  }
}

const styles = StyleSheet.create({
  initial: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  img: {
    borderWidth: 0,
    height: 'auto',
    maxHeight: '100%',
    maxWidth: '100%',
    opacity: 0
  },
  children: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
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
