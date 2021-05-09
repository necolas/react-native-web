import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Example from '../../shared/example';

const log = (...msg) => {
  console.log(...msg);
};

const l1 = { width: '100%', paddingLeft: 0, paddingTop: 0 };
const l2 = { width: '75%', paddingLeft: 10, paddingTop: 10 };

function Box({ pointerEvents }) {
  return (
    <TouchableHighlight
      onPress={log}
      pointerEvents={pointerEvents}
      style={styles.box}
      underlayColor="purple"
    >
      <TouchableHighlight onPress={log} style={styles.content} underlayColor="orange">
        <Text>{pointerEvents}</Text>
      </TouchableHighlight>
    </TouchableHighlight>
  );
}

export default function ViewPage() {
  const [layoutInfo, setLayoutInfo] = React.useState({});
  const [layoutStyle, setLayoutStyle] = React.useState(l1);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLayoutStyle((l) => (l.width === '100%' ? l2 : l1));
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleLayout = ({ nativeEvent }) => {
    setLayoutInfo(() => ({ ...nativeEvent.layout }));
  };

  return (
    <Example title="View">
      <View style={styles.container}>
        <Text accessibilityRole="heading" style={styles.heading}>
          onLayout
        </Text>
        <View>
          <View style={[styles.layoutContainer, layoutStyle]}>
            <View onLayout={handleLayout} style={styles.layoutBox} />
          </View>
          <Text>{JSON.stringify(layoutInfo, null, 2)}</Text>
        </View>

        <Text accessibilityRole="heading" style={styles.heading}>
          pointerEvents
        </Text>
        <View pointerEvents="box-none">
          <View pointerEvents="box-none" style={styles.boxContainer}>
            <Box pointerEvents="none" />
            <Box pointerEvents="auto" />
            <Box pointerEvents="box-only" />
            <Box pointerEvents="box-none" />
          </View>
        </View>
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 10
  },
  heading: {
    fontWeight: 'bold',
    marginVertical: '1rem'
  },
  layoutContainer: {
    marginBottom: '1rem'
  },
  layoutBox: {
    backgroundColor: '#FFAD1F',
    height: 50
  },
  boxContainer: {
    height: 50
  },
  box: {
    backgroundColor: '#ececec',
    padding: 30,
    marginVertical: 5
  },
  content: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  }
});
