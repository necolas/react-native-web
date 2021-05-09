import React from 'react';
import { AppState, Text } from 'react-native';
import Example from '../../shared/example';

export default function AppStatePage() {
  const appState = React.useRef(AppState.currentState);
  const [state, setState] = React.useState({
    active: 0,
    background: 0,
    currentState: appState.current
  });

  React.useEffect(() => {
    const handleChange = nextState => {
      setState(previousState => ({
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
    <Example title="AppState">
      <Text style={{ marginTop: '1rem' }}>
        AppState.currentState: <Text style={{ fontWeight: 'bold' }}>{state.currentState}</Text>
      </Text>
      <Text>Active count: {state.active}</Text>
      <Text>Background count: {state.background}</Text>
    </Example>
  );
}
