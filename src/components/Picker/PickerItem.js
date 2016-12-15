import React, { Component, PropTypes } from 'react';
import ColorPropType from '../../propTypes/ColorPropType';

export default class PickerItem extends React.Component {

  static propTypes = {
    /**
     * Text to display for this item.
     */
    label: React.PropTypes.string.isRequired,
    /**
     * The value to be passed to picker's `onValueChange` callback when
     * this item is selected. Can be a string or an integer.
     */
    value: React.PropTypes.any,
    /**
     * Color of this item's text.
     */
    color: ColorPropType,
    /**
     * Used to locate the item in end-to-end tests.
     */
    testID: React.PropTypes.string,
  };

  render() {
    return null;
  }
};