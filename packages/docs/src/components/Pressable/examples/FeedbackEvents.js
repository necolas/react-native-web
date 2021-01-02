import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function FeedbackEvents() {
  const [eventLog, updateEventLog] = React.useState([]);

  const handlePress = (eventName) => {
    return () => {
      const limit = 6;
      updateEventLog((state) => {
        const nextState = state.slice(0, limit - 1);
        nextState.unshift(eventName);
        return nextState;
      });
    };
  };

  return (
    <View>
      <View>
        <Pressable
          onLongPress={handlePress('longPress')}
          onPress={handlePress('press')}
          onPressIn={handlePress('pressIn')}
          onPressOut={handlePress('pressOut')}
        >
          <View>
            <Text style={styles.touchableText}>Press Me</Text>
          </View>
        </Pressable>
      </View>

      <View>
        <Pressable
          accessibilityRole="none"
          onLongPress={handlePress('longPress')}
          onPress={handlePress('press')}
          onPressIn={handlePress('pressIn')}
          onPressOut={handlePress('pressOut')}
          style={({ hovered, pressed, focused }) => {
            let backgroundColor = 'white';
            if (hovered) {
              backgroundColor = 'lightgray';
            }
            if (pressed) {
              backgroundColor = 'lightblue';
            }
            return {
              padding: 10,
              margin: 10,
              borderWidth: 1,
              borderColor: focused ? 'red' : null,
              backgroundColor,
              outlineWidth: 0,
            };
          }}
        >
          <Pressable
            accessibilityRole="button"
            onLongPress={handlePress('longPress - inner')}
            onPress={handlePress('press - inner')}
            onPressIn={handlePress('pressIn - inner')}
            onPressOut={handlePress('pressOut - inner')}
            style={({ hovered, pressed, focused }) => {
              let backgroundColor = 'white';
              if (hovered) {
                backgroundColor = 'lightgray';
              }
              if (pressed) {
                backgroundColor = 'lightblue';
              }
              return {
                padding: 10,
                margin: 10,
                borderWidth: 1,
                borderColor: focused ? 'red' : null,
                backgroundColor,
                outlineWidth: 0,
              };
            }}
          >
            <Text>Nested pressables</Text>
          </Pressable>
        </Pressable>
      </View>

      <View style={styles.eventLogBox}>
        {eventLog.map((e, ii) => (
          <Text key={ii}>{e}</Text>
        ))}
      </View>
    </View>
  );
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
