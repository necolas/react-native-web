import React, { Component } from 'react';
import PropTypes from 'prop-types';

import View from '../View';

export default class ListCell extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    shouldItemUpdate: PropTypes.func,
    item: PropTypes.any,
    index: PropTypes.number.isRequired
  };

  cellRef = undefined;

  shouldComponentUpdate(nextProps) {
    if (nextProps.shouldItemUpdate) {
      return nextProps.shouldItemUpdate(
        {
          item: this.props.item,
          index: this.props.index
        },
        { item: nextProps.item, index: nextProps.index }
      );
    }

    return true;
  }

  bindCellRef = element => {
    this.cellRef = element;
  };

  render() {
    const { renderItem, item, index } = this.props;

    return (
      <View ref={this.bindCellRef}>
        {renderItem({ item, index })}
      </View>
    );
  }
}
