import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import Example from '../../shared/example';

const log = (...msg) => {
  console.log(...msg);
};

const l1 = { width: '100%', paddingLeft: 0, paddingTop: 0 };
const l2 = { width: '75%', paddingLeft: 10, paddingTop: 10 };

function Box({ pointerEvents }) {
  return (
    <Pressable
      onPress={log}
      style={({ pressed }) => [
        styles.box,
        pressed && styles.purple,
        pointerEventsStyles[pointerEvents]
      ]}
    >
      <Pressable
        onPress={log}
        style={({ pressed }) => [styles.content, pressed && styles.orange]}
      >
        <Text>{pointerEvents}</Text>
      </Pressable>
    </Pressable>
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
        <Text role="heading" style={styles.heading}>
          onLayout
        </Text>
        <View>
          <View style={[styles.layoutContainer, layoutStyle]}>
            <View onLayout={handleLayout} style={styles.layoutBox} />
          </View>
          <Text>{JSON.stringify(layoutInfo, null, 2)}</Text>
        </View>

        <Text role="heading" style={styles.heading}>
          pointerEvents
        </Text>
        <View style={pointerEventsStyles['box-none']}>
          <View style={[styles.boxContainer, pointerEventsStyles['box-none']]}>
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
    marginVertical: 5,
    userSelect: 'none'
  },
  content: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    userSelect: 'none'
  },
  orange: {
    backgroundColor: 'orange'
  },
  purple: {
    backgroundColor: 'purple'
  }
});

const pointerEventsStyles = StyleSheet.create({
  auto: {
    pointerEvents: 'auto'
  },
  none: {
    pointerEvents: 'none'
  },
  'box-only': {
    pointerEvents: 'box-only'
  },
  'box-none': {
    pointerEvents: 'box-none'
  }
});
