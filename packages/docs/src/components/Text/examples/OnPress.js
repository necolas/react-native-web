import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function OnPress() {
  const [count, updateCount] = React.useState(0);

  let textLog = '';
  if (count > 1) {
    textLog = count + 'x text onPress';
  } else if (count > 0) {
    textLog = 'text onPress';
  }

  return (
    <View>
      <Text
        onPress={() => {
          updateCount((count) => count + 1);
        }}
        style={styles.textBlock}
      >
        Text has built-in onPress handling
      </Text>
      <View style={styles.logBox}>
        <Text>{textLog}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logBox: {
    padding: 20,
    marginTop: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
  textBlock: {
    fontWeight: '500',
    color: 'blue',
  },
});
