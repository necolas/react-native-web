import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropsTypes': PropTypes.any,
  delayLongPress: PropTypes.number,
  delayPressIn: PropTypes.number,
  delayPressOut: PropTypes.number,
  disabled: PropTypes.bool,
  onLongPress: PropTypes.func,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  pressRetentionOffset: PropTypes.object
};

export default {
  title: 'Components|TouchableWithoutFeedback',
  includeStories: []
};

export { ofProps };
export { default as delayEvents } from './examples/DelayEvents';
export { default as disabled } from './examples/Disabled';
export { default as feedbackEvents } from './examples/FeedbackEvents';
