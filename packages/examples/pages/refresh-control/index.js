/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { useState } from 'react';
import {
  ScrollView,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput
} from 'react-native';
import Example from '../../shared/example';

const ITEMS = [...Array(12)].map((_, i) => `Item ${i}`);

function createItemRow(msg, index) {
  return (
    <TouchableOpacity key={index} style={[styles.item]}>
      <Text style={styles.text}>{msg}</Text>
    </TouchableOpacity>
  );
}

const Divider = ({ v }) => <View style={v ? styles.vDivider : styles.hDivider} />;
const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

export default function RefreshControlPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [progressBgColor, setProgressBgColor] = useState<string>(undefined);
  const [tintColor, setTintColor] = useState<string>(undefined);
  const [progressViewOffset, setProgressViewOffset] = useState(50);
  const [size, setSize] = useState(0);
  const clearRefreshingTicker = React.useRef<TimeoutID | null>(null);

  React.useEffect(() => {
    clearRefreshingTicker.current && clearTimeout(clearRefreshingTicker.current);
    clearRefreshingTicker.current = setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [clearRefreshingTicker, refreshing]);

  return (
    <Example title="RefreshControl">
      <Divider />
      <View style={styles.container}>
        <Text style={styles.heading}>Scroll View</Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              enabled={enabled}
              onRefresh={() => {
                console.log('refreshing');
                setRefreshing(true);
              }}
              progressBackgroundColor={progressBgColor}
              progressViewOffset={Number(progressViewOffset)}
              refreshing={refreshing}
              size={size}
              tintColor={tintColor}
            />
          }
          style={styles.scrollView}
        >
          {ITEMS.map(createItemRow)}
        </ScrollView>
        <Divider />
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              setRefreshing(true);
            }}
            title="Trigger refresh"
          />
          <Divider v />
          <Button
            onPress={() => {
              setEnabled(!enabled);
            }}
            title={enabled ? 'Disable' : 'Enable'}
          />
          <Divider v />
          <Button
            onPress={() => {
              setProgressBgColor(randomColor());
              setRefreshing(true);
            }}
            title={'progressBackgroundColor'}
          />
          <Divider v />
          <Button
            onPress={() => {
              setTintColor(randomColor());
              setRefreshing(true);
            }}
            title={'tintColor'}
          />
        </View>
        <View style={styles.buttons}>
          <View>
            <Text>progressViewOffset:</Text>
            <Text>For this example keep value less than 120</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={setProgressViewOffset}
              style={styles.textInput}
              value={progressViewOffset}
            />
          </View>
          <Divider v />
          <View>
            <Button
              onPress={() => {
                setSize(size ? 0 : 1);
                setRefreshing(true);
              }}
              title={'size'}
            />
          </View>
        </View>
        <Divider />
        <Divider />
        <Text style={styles.heading}>Inverted List View</Text>
        <FlatList
          data={ITEMS}
          inverted
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                console.log('refreshing');
                setRefreshing(true);
              }}
              refreshing={refreshing}
            />
          }
          refreshing={refreshing}
          renderItem={({ item }) => (
            <View style={[styles.item]}>
              <TouchableOpacity key={item}>
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
          style={styles.scrollView}
        />
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    overflow: 'scroll'
  },
  scrollView: {
    backgroundColor: '#eeeeee',
    maxHeight: 250
  },
  item: {
    margin: 5,
    padding: 5,
    backgroundColor: '#cccccc',
    borderRadius: 3,
    minWidth: 96
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
    textAlign: 'center'
  },
  hDivider: {
    height: '1rem'
  },
  vDivider: {
    width: '1rem'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '1rem',
    flexWrap: 'wrap'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000'
  }
});
