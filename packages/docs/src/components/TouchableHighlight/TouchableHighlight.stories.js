import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...TouchableWithoutFeedbackPropTypes': PropTypes.any,
  activeOpacity: PropTypes.number,
  onHideUnderlay: PropTypes.func,
  onShowUnderlay: PropTypes.func,
  underlayColor: PropTypes.string
};

ofProps.defaultProps = {
  activeOpacity: '0.85',
  underlayColor: 'black'
};

export default {
  title: 'Components|TouchableHighlight',
  includeStories: []
};

export { ofProps };
export { default as delayEvents } from './examples/DelayEvents';
export { default as disabled } from './examples/Disabled';
export { default as feedbackEvents } from './examples/FeedbackEvents';
export { default as styleOverrides } from './examples/StyleOverrides';
