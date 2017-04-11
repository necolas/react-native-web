import {Animated, View, Text} from 'react-native';
import React, {Component} from 'react';
import {action, storiesOf} from '@kadira/storybook';

class AnimatedExample extends Component {
  state = {size: new Animated.Value(100)};
  render() {
    return (
      <View style={{minWidth: 300}}>
        <Text onPress={this._handleClick}>Click to Animate</Text>
        <Animated.View
          style={{
            height: this.state.size,
            width: this.state.size,
            marginVertical: 20,
            backgroundColor: '#757575',
            padding: 10,
          }}
        >
          <View>
            Animated Box
          </View>
        </Animated.View>
      </View>
    );
  }

  _handleClick = () => {
    Animated.timing(this.state.size, {toValue: 200}).start();
  };
}

storiesOf('api: Animated', module).add('Animate Box Size', () => (
  <AnimatedExample />
));
