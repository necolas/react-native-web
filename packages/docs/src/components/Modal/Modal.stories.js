import PropTypes from 'prop-types';

export default {
  title: 'Components|Modal',
  includeStories: []
};

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,

  animated: PropTypes.bool,

  animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
  hardwareAccelerated: PropTypes.bool,

  onDismiss: PropTypes.func,
  onOrientationChange: PropTypes.func,

  onRequestClose: PropTypes.func,
  onShow: PropTypes.func,

  presentationStyle: PropTypes.oneOf(['fullScreen', 'pageSheet', 'formSheet', 'overFullScreen']),
  statusBarTranslucent: PropTypes.bool,

  supportedOrientations: PropTypes.arrayOf(
    PropTypes.oneOf(
      'portrait',
      'portrait-upside-down',
      'landscape',
      'landscape-left',
      'landscape-right'
    )
  ),
  transparent: PropTypes.bool,
  visible: PropTypes.bool
};

export { ofProps };

export { default as transparentModal } from './examples/Transparent';
export { default as simpleModal } from './examples/Simple';
export { default as animatedModal } from './examples/Animated';
export { default as modalception } from './examples/Modalception';
