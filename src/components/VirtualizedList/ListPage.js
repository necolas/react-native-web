import React, { Component } from "react";
import PropTypes from "prop-types";

import StyleSheet from "../../apis/StyleSheet";
import View from "../View";

import ListCell from "./ListCell";

export default class ListPage extends Component {
  static propTypes = {
    fullData: PropTypes.any,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    getItemLayout: PropTypes.func,
    keyExtractor: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    shouldItemUpdate: PropTypes.func,
    index: PropTypes.number,
    show: PropTypes.bool
  };

  static defaultProps = {
    show: true
  };

  state = {
    showPage: true,
    pageHeight: null
  };

  pageRef = undefined;
  elementRefs = [];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      showPage: !!props.show
    };
  }

  componentDidMount() {
    if (!this.state.showPage) {
      this.calculatePageHeight();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.show && !nextProps.show) {
      this.hidePage();
    } else if (!this.props.show && nextProps.show) {
      this.showPage();
    }
  }

  showPage() {
    this.setState({
      showPage: true
    });
  }

  hidePage() {
    this.calculatePageHeight();

    this.setState({
      showPage: false
    });
  }

  calculatePageHeight() {
    const { getItemLayout } = this.props;

    if (getItemLayout) {
      const pageHeight = this.props.items.reduce((memo, item, index) => {
        return (
          memo + getItemLayout(this.props.fullData, this.props.index + index)
        );
      }, 0);

      this.setState({ pageHeight });
    } else if (this.pageRef) {
      const boundingRect = this.pageRef.getBoundingClientRect();

      this.setState({
        pageHeight: boundingRect.height
      });
    }
  }

  calculateItemsOnScreen = listDimensions => {
    return this.elementRefs.reduce((memo, element, index) => {
      if (element.cellRef && element.cellRef.domRef) {
        const elementDimensions = element.cellRef.domRef.getBoundingClientRect();

        if (
          elementDimensions.bottom > listDimensions.top &&
          elementDimensions.top < listDimensions.bottom
        ) {
          memo.push(this.props.items[index]);
        }
      }

      return memo;
    }, []);
  };

  assignPageRef = element => {
    this.pageRef = element.domRef;
  };

  assignElementRef(index) {
    return element => {
      this.elementRefs[index] = element;
    };
  }

  scrollTo = (index = 0) => {
    if (!this.state.showPage) {
      this.setState(
        {
          showPage: true
        },
        () => {
          this.scrollToElement(index);
        }
      );
    } else {
      this.scrollToElement(index);
    }
  };

  scrollToElement(index = 0) {
    const elementRef = this.elementRefs[index];

    if (elementRef && elementRef.scrollIntoView) {
      elementRef.scrollIntoView();
    }
  }

  render() {
    const { items, renderItem, shouldItemUpdate, keyExtractor } = this.props;
    const { showPage } = this.state;

    if (!showPage && this.state.pageHeight) {
      return (
        <View
          ref={this.assignPageRef}
          style={[styles.container, { height: this.state.pageHeight }]}
        />
      );
    }

    const itemList = items.map((item, index) => {
      let key = index;

      if (keyExtractor) {
        key = keyExtractor(item, this.props.index + index);
      } else if (item.key) {
        key = item.key;
      }

      return (
        <ListCell
          key={key}
          ref={this.assignElementRef(index)}
          item={item}
          index={this.props.index + index}
          renderItem={renderItem}
          shouldItemUpdate={shouldItemUpdate}
        />
      );
    });

    return (
      <View ref={this.assignPageRef} style={[styles.container, styles.list]}>
        {itemList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0
  },
  list: {
    padding: 0
  }
});
