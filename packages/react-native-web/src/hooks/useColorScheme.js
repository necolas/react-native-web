import * as React from 'react';
import type { ColorSchemeName } from '../exports/Appearance';
import { getColorScheme, addChangeListener, removeChangeListener } from '../exports/Appearance';

export default function useColorScheme(): ColorSchemeName {
  const [colorScheme, setColorScheme] = React.useState(getColorScheme());

  React.useEffect(() => {
    function listener(appearance) {
      setColorScheme(appearance.colorScheme);
    }
    addChangeListener(listener);
    return () => removeChangeListener(listener);
  });

  return colorScheme;
}
