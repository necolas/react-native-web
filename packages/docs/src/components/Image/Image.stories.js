import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,
  blurRadius: PropTypes.number,
  defaultSource: PropTypes.object, // ImageSourcePropType,
  draggable: PropTypes.bool,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  onLoadEnd: PropTypes.func,
  onLoadStart: PropTypes.func,
  resizeMode: PropTypes.oneOf(['contain', 'cover']),
  source: PropTypes.object, ///ImageSourcePropType,
  style: PropTypes.any
};

ofProps.defaultProps = {};

const ofStatics = () => {};

// hack to display instance methods
ofStatics.propTypes = {
  getSize: PropTypes.func,
  prefetch: PropTypes.func,
  queryCache: PropTypes.func
};

export default {
  title: 'Components|Image',
  includeStories: []
};

export { ofProps, ofStatics };
export { default as defaultSource } from './examples/DefaultSource';
export { default as draggable } from './examples/Draggable';
export { default as onError } from './examples/OnError';
export { default as onLoad } from './examples/OnLoad';
export { default as onLoadEnd } from './examples/OnLoadEnd';
export { default as onLoadStart } from './examples/OnLoadStart';
export { default as resizeMode } from './examples/ResizeMode';
export { default as source } from './examples/Source';
export { default as styleBoxShadow } from './examples/StyleBoxShadow';
export { default as styleTintColor } from './examples/StyleTintColor';

export { default as getSize } from './examples/StaticGetSize';
export { default as prefetch } from './examples/StaticPrefetch';
