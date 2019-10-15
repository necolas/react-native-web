import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,
  numberOfLines: PropTypes.number,
  onPress: PropTypes.func,
  selectable: PropTypes.bool
};

export default {
  title: 'Components|Text',
  includeStories: []
};

export { ofProps };

export { default as children } from './examples/Children';
export { default as numberOfLines } from './examples/NumberOfLines';
export { default as onPress } from './examples/OnPress';
export { default as selectable } from './examples/Selectable';
export { default as style } from './examples/Style';
