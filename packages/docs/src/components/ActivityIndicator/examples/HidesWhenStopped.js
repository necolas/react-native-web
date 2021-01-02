import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

class ToggleAnimatingActivityIndicator extends React.Component {
  state = {
    animating: true,
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

export default function HidesWhenStoppedExample() {
  return (
    <View style={[styles.horizontal]}>
      <ToggleAnimatingActivityIndicator hidesWhenStopped={false} style={styles.item} />
      <ToggleAnimatingActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    paddingRight: 10,
  },
});
