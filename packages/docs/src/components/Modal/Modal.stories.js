import PropTypes from 'prop-types';

export default {
  title: 'Components|Modal',
  includeStories: []
};

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,

  visible: PropTypes.bool,

  animated: PropTypes.bool,
  animationType: PropTypes.oneOf(['none', 'slide', 'fade']),

  presentationStyle: PropTypes.oneOf(['fullScreen', 'pageSheet', 'formSheet', 'overFullScreen']),
  transparent: PropTypes.bool,

  onOrientationChange: PropTypes.func,
  supportedOrientations: PropTypes.arrayOf(PropTypes.oneOf('portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right')),

  statusBarTranslucent: PropTypes.bool,
  hardwareAccelerated: PropTypes.bool,

  onRequestClose: PropTypes.func,
  onShow: PropTypes.func,
  onDismiss: PropTypes.func,
};

export { ofProps };
export { default as modal } from './examples/Modal';
export { default as modalBackdrop } from './examples/ModalBackdrop';
