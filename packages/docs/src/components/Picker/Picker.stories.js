import PropTypes from 'prop-types';

const ofProps = () => {};

ofProps.propTypes = {
  '...ViewPropTypes': PropTypes.any,
  children: PropTypes.any,
  enabled: PropTypes.bool,
  onValueChange: PropTypes.func,
  selectedValue: PropTypes.string,
  style: PropTypes.any
};

ofProps.defaultProps = {};

const ofPropsItem = () => {};

ofPropsItem.propTypes = {
  color: PropTypes.any,
  label: PropTypes.string,
  testID: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default {
  title: 'Components|ImageBackground',
  includeStories: []
};

export { ofProps, ofPropsItem };

/*
<PickerExample enabled={false} />

<PickerExample
  onValueChange={(itemValue, itemPosition) => {
    window.alert(`itemValue: ${itemValue}, itemPosition: ${itemPosition}`);
  }}
/>

<PickerExample selectedValue="book-3" />
*/
