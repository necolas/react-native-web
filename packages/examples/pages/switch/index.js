import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import Example from '../../shared/example';

function Divider() {
  return <View style={styles.divider} />
}

export default function SwitchPage() {
  const [checked, setChecked] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setChecked(!checked);
    }, 2500);
    return () => {
      clearInterval(interval);
    };
  }, [checked]);

  return (
    <Example title="Switch">
      <View style={styles.row}>
        <Switch disabled={true} value={false} />
        <Divider />
        <Switch disabled={true} value={true} />
      </View>
      <View style={styles.row}>
        <Switch value={false} />
        <Divider />
        <Switch value={true} />
      </View>
      <View style={styles.row}>
        <Switch activeThumbColor="#1DA1F2" activeTrackColor="#ccc" value={true} />
        <Divider />
        <Switch activeThumbColor="#17BF63" activeTrackColor="#ccc" value={true} />
        <Divider />
        <Switch activeThumbColor="#FFAD1F" activeTrackColor="#ccc" value={true} />
        <Divider />
        <Switch activeThumbColor="#F45D22" activeTrackColor="#ccc" value={true} />
        <Divider />
        <Switch activeThumbColor="#794BC4" activeTrackColor="#ccc" value={true} />
        <Divider />
        <Switch activeThumbColor="#E0245E" activeTrackColor="#ccc" value={true} />
      </View>
      <View style={styles.row}>
        <Switch activeThumbColor="#fff" activeTrackColor="#1DA1F2" value={true} />
        <Divider />
        <Switch activeThumbColor="#fff" activeTrackColor="#17BF63" value={true} />
        <Divider />
        <Switch activeThumbColor="#fff" activeTrackColor="#FFAD1F" value={true} />
        <Divider />
        <Switch activeThumbColor="#fff" activeTrackColor="#F45D22" value={true} />
        <Divider />
        <Switch activeThumbColor="#fff" activeTrackColor="#794BC4" value={true} />
        <Divider />
        <Switch activeThumbColor="#fff" activeTrackColor="#E0245E" value={true} />
      </View>
      <View style={styles.row}>
        <Switch activeTrackColor="#ccc" thumbColor="#1DA1F2" value={false} />
        <Divider />
        <Switch activeTrackColor="#ccc" thumbColor="#17BF63" value={false} />
        <Divider />
        <Switch activeTrackColor="#ccc" thumbColor="#FFAD1F" value={false} />
        <Divider />
        <Switch activeTrackColor="#ccc" thumbColor="#F45D22" value={false} />
        <Divider />
        <Switch activeTrackColor="#ccc" thumbColor="#794BC4" value={false} />
        <Divider />
        <Switch activeTrackColor="#ccc" thumbColor="#E0245E" value={false} />
      </View>
      <View style={styles.row}>
        <Switch thumbColor="#fff" trackColor="#1DA1F2" value={false} />
        <Divider />
        <Switch thumbColor="#fff" trackColor="#17BF63" value={false} />
        <Divider />
        <Switch thumbColor="#fff" trackColor="#FFAD1F" value={false} />
        <Divider />
        <Switch thumbColor="#fff" trackColor="#F45D22" value={false} />
        <Divider />
        <Switch thumbColor="#fff" trackColor="#794BC4" value={false} />
        <Divider />
        <Switch thumbColor="#fff" trackColor="#E0245E" value={false} />
      </View>

      <View style={styles.row}>
        <Switch style={{ height: 32, width: 32 }} thumbColor="#1DA1F2" value={checked} />
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
  divider: {
    width: 10
  }
});
