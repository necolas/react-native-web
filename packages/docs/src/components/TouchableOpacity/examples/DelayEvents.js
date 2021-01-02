import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity as Touchable, View } from 'react-native';

export default class TouchableDelayEvents extends PureComponent {
  state = { eventLog: [] };

  render() {
    const { displayName } = Touchable;
    return (
      <View>
        <View>
          <Touchable
            delayLongPress={800}
            delayPressIn={400}
            delayPressOut={1000}
            onLongPress={this._createPressHandler('longPress: 800ms delay')}
            onPress={this._createPressHandler('press')}
            onPressIn={this._createPressHandler('pressIn: 400ms delay')}
            onPressOut={this._createPressHandler('pressOut: 1000ms delay')}
          >
            <View>
              <Text style={styles.touchableText}>{displayName}</Text>
            </View>
          </Touchable>
        </View>
        <View style={styles.eventLogBox}>
          {this.state.eventLog.map((e, ii) => (
            <Text key={ii}>{e}</Text>
          ))}
        </View>
      </View>
    );
  }

  _createPressHandler = (eventName) => {
    return () => {
      const limit = 6;
      this.setState((state) => {
        const eventLog = state.eventLog.slice(0, limit - 1);
        eventLog.unshift(eventName);
        return { eventLog };
      });
    };
  };
}

const styles = StyleSheet.create({
  touchableText: {
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    color: '#007AFF',
    borderStyle: 'solid',
    textAlign: 'center',
  },
  eventLogBox: {
    padding: 10,
    marginTop: 10,
    height: 120,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});
