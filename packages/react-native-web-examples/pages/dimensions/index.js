import React from 'react';
import { Dimensions, Text } from 'react-native';
import Example from '../../shared/example';

export default function DimensionsPage() {
  const [screenDims, setScreen] = React.useState(Dimensions.get('screen'));
  const [windowDims, setWindow] = React.useState(Dimensions.get('window'));

  React.useEffect(() => {
    const handleChange = ({ screen, window: win }) => {
      setScreen(screen);
      setWindow(win);
    };

    const subscription = Dimensions.addEventListener('change', handleChange);
    return () => {
      subscription.remove();
    };
  }, [setScreen, setWindow]);

  return (
    <Example title="Dimensions">
      <Text style={{ marginVertical: '1em' }} suppressHydrationWarnings={true}>
        window: {JSON.stringify(windowDims, null, 2)}
      </Text>
      <Text suppressHydrationWarnings={true}>
        screen: {JSON.stringify(screenDims, null, 2)}
      </Text>
    </Example>
  );
}
