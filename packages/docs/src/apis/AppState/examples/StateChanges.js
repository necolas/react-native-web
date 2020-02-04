import React from 'react';
import { AppState, Text, View } from 'react-native';

export default function StateChanges() {
  const [state, updateState] = React.useState({
    active: 0,
    background: 0,
    currentState: AppState.currentState
  });

  React.useEffect(() => {
    const handleChange = nextState => {
      updateState(previousState => ({
        ...previousState,
        [nextState]: previousState[nextState] + 1
      }));
    };

    AppState.addEventListener('change', handleChange);
    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <View>
      <Text>Active count: {state.active}</Text>
      <Text>Background count: {state.background}</Text>
      <Text>Current state is: {state.currentState}</Text>
    </View>
  );
}
