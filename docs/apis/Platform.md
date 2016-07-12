# Platform

Detect what is the platform in which the app is running. This piece of
functionality can be useful when only small parts of a component are platform
specific.

## Properties

**OS**: string

`Platform.OS` will be `web` when running in a Web browser.

```js
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  height: (Platform.OS === 'web') ? 200 : 100,
});
```

## Methods

**select**(object): any

`Platform.select` takes an object containing `Platform.OS` as keys and returns
the value for the platform you are currently running on.

```js
import { Platform } from 'react-native';

const containerStyles = {
  flex: 1,
  ...Platform.select({
    android: {
      backgroundColor: 'blue'
    },
    ios: {
      backgroundColor: 'red'
    },
    web: {
      backgroundColor: 'green'
    }
  })
});
```
