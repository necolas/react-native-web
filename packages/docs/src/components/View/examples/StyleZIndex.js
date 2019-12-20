import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

const INDICES = [[0, -1, 2, 1], [1, 2, -1, 0], ['auto', 'auto', 'auto', 'auto']];

class ZIndex extends React.Component {
  state = {
    current: 0
  };

  render() {
    const indices = INDICES[this.state.current];

    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View>
          <Text style={{ paddingBottom: 10 }}>Tap to change order</Text>
          <View
            style={[
              styles.zIndex,
              { marginTop: 0, backgroundColor: '#E57373', zIndex: indices[0] }
            ]}
          >
            <Text>ZIndex {indices[0]}</Text>
          </View>
          <View
            style={[
              styles.zIndex,
              { marginLeft: 50, backgroundColor: '#FFF176', zIndex: indices[1] }
            ]}
          >
            <Text>ZIndex {indices[1]}</Text>
          </View>
          <View
            style={[
              styles.zIndex,
              { marginLeft: 100, backgroundColor: '#81C784', zIndex: indices[2] }
            ]}
          >
            <Text>ZIndex {indices[2]}</Text>
          </View>
          <View
            style={[
              styles.zIndex,
              { marginLeft: 150, backgroundColor: '#64B5F6', zIndex: indices[3] }
            ]}
          >
            <Text>ZIndex {indices[3]}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _handlePress = () => {
    this.setState({ current: (this.state.current + 1) % INDICES.length });
  };
}

export default function Style() {
  return <ZIndex />;
}

const styles = StyleSheet.create({
  zIndex: {
    justifyContent: 'space-around',
    width: 100,
    height: 50,
    marginTop: -10
  }
});
