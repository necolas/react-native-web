# Platform

Detect what is the platform in which the app is running. This piece of
functionality can be useful when only small parts of a component are platform
specific.

## Properties

**OS**: string

`Platform.OS` will be `web` when running in a Web browser.

**userAgent**: string

On Web, the `Platform` module can be also be used to detect the browser
`userAgent`.

## Examples

```js
const styles = StyleSheet.create({
  height: (Platform.OS === 'web') ? 200 : 100,
});

if (Platform.userAgent.includes('Android')) {
  console.log('Running on Android!');
}
```
