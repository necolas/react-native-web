/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Switch, TouchableHighlight, View } from 'react-native';

export default function TouchableParent() {
  const [state, updateState] = React.useState(false);

  return (
    <View>
      <TouchableHighlight onPress={() => {}} style={style} underlayColor="#eee">
        <Switch
          onValueChange={(value) => {
            updateState(value);
          }}
          value={state}
        />
      </TouchableHighlight>
    </View>
  );
}

const style = {
  alignSelf: 'flex-start',
  borderWidth: 1,
  borderColor: '#ddd',
  paddingHorizontal: 50,
  paddingVertical: 20,
};
