import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '../../shared/button';
import Example from '../../shared/example';

export default function PressablePage() {
  const [eventLog, updateEventLog] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [delay, setDelay] = useState(0);
  const nextEventId = useRef(0);

  const handleEvent = (name) => {
    return () => {
      const limit = 10;
      const id = nextEventId.current++;
      updateEventLog((state) => {
        const nextState = state.slice(0, limit - 1);
        nextState.unshift({ id, name });
        return nextState;
      });
    };
  };

  return (
    <Example title="Pressable">
      <View style={styles.container}>
        <Pressable
          delayLongPress="750"
          delayPressIn={delay}
          delayPressOut={delay}
          disabled={disabled}
          onBlur={handleEvent('onBlur')}
          onFocus={handleEvent('onFocus')}
          onHoverIn={handleEvent('onHoverIn')}
          onHoverOut={handleEvent('onHoverOut')}
          onKeyDown={(e) => {
            console.log(e.key);
          }}
          onLongPress={handleEvent('onLongPress - 750ms delay')}
          onPress={handleEvent(`onPress - ${delay}ms delay`)}
          onPressIn={handleEvent(`onPressIn - ${delay}ms delay`)}
          onPressOut={handleEvent(`oPressOut - ${delay}ms delay`)}
          role="button"
          style={(state) => [
            styles.pressable,
            !disabled && state.focused && styles.focused,
            !disabled && state.hovered && styles.hovered,
            !disabled && state.pressed && styles.pressed,
            disabled && styles.disabled
          ]}
        >
          <Text>Pressable</Text>
        </Pressable>

        <View style={styles.buttons}>
          <Button
            onPress={() => setDisabled((state) => !state)}
            title={disabled ? 'Enable' : 'Disable'}
          />
          <View style={{ width: '1rem' }} />
          <Button
            onPress={() => setDelay((state) => (state === 0 ? 350 : 0))}
            title={delay === 0 ? 'Add delay' : 'Remove delay'}
          />
        </View>

        <ScrollView style={styles.eventLogBox}>
          {eventLog.map((e) => (
            <Text key={e.id}>{e.name}</Text>
          ))}
        </ScrollView>
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 500,
    padding: '1rem',
    width: '100%'
  },
  pressable: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    outlineWidth: 0,
    backgroundColor: '#fff'
  },
  hovered: {
    backgroundColor: '#ddd'
  },
  focused: {
    boxShadow: '0px 0px 0px 1px blue'
  },
  pressed: {
    backgroundColor: 'lightblue'
  },
  disabled: {
    opacity: 0.5
  },
  buttons: {
    flexDirection: 'row',
    marginVertical: '1rem'
  },
  eventLogBox: {
    padding: 10,
    height: 120,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});
