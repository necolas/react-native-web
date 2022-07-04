import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import Example from '../../shared/example';

export default function ActivityIndicatorPage() {
  const [animating, setAnimating] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(!animating);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [animating]);

  return (
    <Example title="ActivityIndicator">
      <View style={styles.row}>
        <ActivityIndicator style={styles.item} />
        <ActivityIndicator
          animating={false}
          hidesWhenStopped={false}
          style={styles.item}
        />
        <ActivityIndicator
          animating={animating}
          hidesWhenStopped={false}
          style={styles.item}
        />
      </View>
      <View style={styles.row}>
        <ActivityIndicator color="#1DA1F2" size="small" style={styles.item} />
        <ActivityIndicator color="#17BF63" size={20} style={styles.item} />
      </View>
      <View style={styles.row}>
        <ActivityIndicator color="#FFAD1F" size="large" style={styles.item} />
        <ActivityIndicator color="#F45D22" size={36} style={styles.item} />
      </View>
      <View style={styles.row}>
        <ActivityIndicator color="#794BC4" size={60} style={styles.item} />
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  item: {
    paddingHorizontal: 10
  }
});
