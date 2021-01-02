import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const l1 = { width: '100%', paddingLeft: 0, paddingTop: 0 };
const l2 = { width: '75%', paddingLeft: 10, paddingTop: 10 };

class OnLayoutExample extends React.Component {
  state = {
    layoutInfo: {},
  };

  componentDidMount() {
    this._layout = l1;

    this._interval = setInterval(() => {
      if (this._ref) {
        this._ref.setNativeProps({ style: this._layout });
        this._layout = this._layout.width === '100%' ? l2 : l1;
      }
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    const { x, y, width, height } = this.state.layoutInfo;
    return (
      <View style={styles.root}>
        <View style={styles.left}>
          <Text>x: {x}</Text>
          <Text>y: {y}</Text>
          <Text>width: {width}</Text>
          <Text>height: {height}</Text>
        </View>
        <View style={styles.right}>
          <View ref={this._setRef} style={styles.container}>
            <View onLayout={this._handleLayout} style={styles.box} />
          </View>
        </View>
      </View>
    );
  }

  _handleLayout = ({ nativeEvent }) => {
    this.setState(() => ({ layoutInfo: nativeEvent.layout }));
  };

  _setRef = (component) => {
    this._ref = component;
  };
}

export default function OnLayout() {
  return <OnLayoutExample />;
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  container: {
    height: 50,
  },
  left: {
    width: 100,
  },
  right: {
    flex: 1,
  },
  box: {
    backgroundColor: '#eee',
    flex: 1,
  },
});
