/* global window */
import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import ImageStylePropTypes from './ImageStylePropTypes'
import React, { PropTypes } from 'react'
import View from '../View'

const STATUS_ERRORED = 'ERRORED'
const STATUS_LOADED = 'LOADED'
const STATUS_LOADING = 'LOADING'
const STATUS_PENDING = 'PENDING'
const STATUS_IDLE = 'IDLE'

const imageStyleKeys = Object.keys(ImageStylePropTypes)

const styles = {
  initial: {
    alignSelf: 'flex-start',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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
  },
  resizeMode: {
    clip: {
      backgroundSize: 'auto'
    },
    contain: {
      backgroundSize: 'contain'
    },
    cover: {
      backgroundSize: 'cover'
    },
    stretch: {
      backgroundSize: '100% 100%'
    }
  }
}

class Image extends React.Component {
  constructor(props, context) {
    super(props, context)

    // state
    this.state = { status: props.source.uri ? STATUS_PENDING : STATUS_IDLE }

    // autobinding
    this._onError = this._onError.bind(this)
    this._onLoad = this._onLoad.bind(this)
  }

  static propTypes = {
    accessibilityLabel: PropTypes.string,
    children: PropTypes.any,
    defaultSource: PropTypes.object,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
    onLoadStart: PropTypes.func,
    resizeMode: PropTypes.oneOf(['clip', 'contain', 'cover', 'stretch']),
    source: PropTypes.object,
    style: PropTypes.shape(ImageStylePropTypes),
    testID: CoreComponent.propTypes.testID
  }

  static stylePropTypes = ImageStylePropTypes

  static defaultProps = {
    defaultSource: {},
    resizeMode: 'cover',
    source: {},
    style: styles.initial
  }

  _cancelEvent(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  _createImageLoader() {
    const { source } = this.props

    this._destroyImageLoader()
    this.image = new window.Image()
    this.image.onerror = this._onError
    this.image.onload = this._onLoad
    this.image.src = source.uri
    this._onLoadStart()
  }

  _destroyImageLoader() {
    if (this.image) {
      this.image.onload = null
      this.image.onerror = null
      this.image = null
    }
  }

  _onError(e) {
    const { onError } = this.props
    const event = { nativeEvent: e }

    this._destroyImageLoader()
    this.setState({ status: STATUS_ERRORED })
    if (onError) onError(event)
    this._onLoadEnd()
  }

  _onLoad(e) {
    const { onLoad } = this.props
    const event = { nativeEvent: e }

    this._destroyImageLoader()
    this.setState({ status: STATUS_LOADED })
    if (onLoad) onLoad(event)
    this._onLoadEnd()
  }

  _onLoadEnd() {
    const { onLoadEnd } = this.props
    if (onLoadEnd) onLoadEnd()
  }

  _onLoadStart() {
    const { onLoadStart } = this.props
    this.setState({ status: STATUS_LOADING })
    if (onLoadStart) onLoadStart()
  }

  componentDidMount() {
    if (this.state.status === STATUS_PENDING) {
      this._createImageLoader()
    }
  }

  componentDidUpdate() {
    if (this.state.status === STATUS_PENDING && !this.image) {
      this._createImageLoader()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.source.uri !== nextProps.source.uri) {
      this.setState({
        status: nextProps.source.uri ? STATUS_PENDING : STATUS_IDLE
      })
    }
  }

  componentWillUnmount() {
    this._destroyImageLoader()
  }

  render() {
    const {
      accessibilityLabel,
      children,
      defaultSource,
      resizeMode,
      source,
      style,
      testID
    } = this.props

    const isLoaded = this.state.status === STATUS_LOADED
    const defaultImage = defaultSource.uri || null
    const displayImage = !isLoaded ? defaultImage : source.uri
    const resolvedStyle = pickProps(style, imageStyleKeys)
    const backgroundImage = displayImage ? `url("${displayImage}")` : null

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
        aria-role='img'
        className={'Image'}
        component='div'
        style={{
          ...(styles.initial),
          ...resolvedStyle,
          ...(backgroundImage && { backgroundImage }),
          ...(styles.resizeMode[resizeMode])
        }}
        testID={testID}
      >
        <img
          src={displayImage}
          style={styles.img}
        />
        {children ? (
          <View children={children} pointerEvents='box-none' style={styles.children} />
        ) : null}
      </View>
    )
  }
}

export default Image
