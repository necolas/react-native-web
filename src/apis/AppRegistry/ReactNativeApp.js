import StyleSheet from '../../apis/StyleSheet';
import View from '../../components/View';
import React, { Component, PropTypes } from 'react';

class ReactNativeApp extends Component {
  static propTypes = {
    initialProps: PropTypes.object,
    rootComponent: PropTypes.any.isRequired,
    rootTag: PropTypes.any
  };

  render() {
    const { initialProps, rootComponent: RootComponent, rootTag } = this.props;

    return (
      <View style={styles.appContainer}>
        <RootComponent {...initialProps} rootTag={rootTag} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /**
   * Ensure that the application covers the whole screen.
   */
  appContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

module.exports = ReactNativeApp;
