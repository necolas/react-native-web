import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

const colors = [ "#1DA1F2", "#17BF63", "#FFAD1F", "#F45D22", "#794BC4", "#E0245E" ];
const sizes = [20, 'small', 36, 'large', 60];

export default function ActivityIndicatorPage() {
  const [animating,setAnimating] = React.useState(true);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(!animating);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [animating]);

  return (
    <>
      <View style={styles.horizontal}>
        <ActivityIndicator style={styles.item} />
        <ActivityIndicator animating={false} hidesWhenStopped={false} style={styles.item} />
        <ActivityIndicator animating={animating} hidesWhenStopped={false} />
      </View>
      <View style={styles.horizontal}>
        {sizes.map((size, i) => (
          <ActivityIndicator color={colors[i]} key={i} size={size} style={styles.item} />
        ))}
        <ActivityIndicator size="large" style={styles.large} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  item: {
    paddingRight: 10
  },
  large: {
    marginLeft: 20,
    transform: [{ scale: 1.75 }]
  }
});
