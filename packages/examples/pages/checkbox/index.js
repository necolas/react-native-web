import { CheckBox, StyleSheet, View } from 'react-native';
import React from 'react';

const colors = [ "#1DA1F2", "#17BF63", "#FFAD1F", "#F45D22", "#794BC4", "#E0245E" ];
const sizes = [20, 'small', 36, 'large', 60];

export default function CheckboxPage() {
  const [checked,setChecked] = React.useState(true);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setChecked(!checked);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [checked]);

  return (
    <View style={styles.horizontal}>
      <View style={styles.item}>
        <CheckBox disabled value={false} />
      </View>
      <View style={styles.item}>
        <CheckBox disabled value={true} />
      </View>
      <View style={styles.item}>
        <CheckBox value={false} />
      </View>
      <View style={styles.item}>
        <CheckBox value={true} />
      </View>
      {sizes.map((size, i) => (
        <View style={styles.item}>
          <CheckBox color={colors[i]} key={i} value={true} />
        </View>
      ))}
      <CheckBox color="#1DA1F2" style={{ height: 32, width: 32 }} value={checked} />
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  item: {
    paddingRight: 10
  }
});
