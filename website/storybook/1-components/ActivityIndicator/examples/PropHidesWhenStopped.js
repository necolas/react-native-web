/**
 * @flow
 */

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { bool } from 'prop-types';
import React, { PureComponent } from 'react';

class ToggleAnimatingActivityIndicator extends PureComponent {
  static propTypes = {
    hidesWhenStopped: bool,
    style: ActivityIndicator.propTypes.style
  };

  state = {
    animating: true
  };

  setToggleTimeout = () => {
    this._timer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
      this.setToggleTimeout();
    }, 2000);
  };

  componentDidMount() {
    this.setToggleTimeout();
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  render() {
    return (
      <ActivityIndicator
        animating={this.state.animating}
        hidesWhenStopped={this.props.hidesWhenStopped}
        size="large"
        style={[styles.centering, this.props.style]}
      />
    );
  }
}

const ActivityIndicatorHidesWhenStoppedExample = () => (
  <View style={[styles.horizontal]}>
    <ToggleAnimatingActivityIndicator hidesWhenStopped={false} style={styles.rightPadding} />
    <ToggleAnimatingActivityIndicator />
  </View>
);

const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightPadding: {
    paddingRight: 10
  }
});

ActivityIndicatorHidesWhenStoppedExample.metadata = {
  id: 'ActivityIndicator.props.hidesWhenStopped',
  description: ''
};

export default ActivityIndicatorHidesWhenStoppedExample;
