# Vibration

Vibration is described as a pattern of on-off pulses, which may be of varying
lengths. The pattern may consist of either a single integer, describing the
number of milliseconds to vibrate, or an array of integers describing a pattern
of vibrations and pauses. Vibration is controlled with a single method:
`Vibration.vibrate()`.

The vibration is asynchronous so this method will return immediately. There
will be no effect on devices that do not support vibration.

## Methods

static **cancel**()

Stop the vibration.

static **vibrate**(pattern)

Start the vibration pattern.

## Examples

Vibrate once for 200ms:

```js
Vibration.vibrate(200);
Vibration.vibrate([200]);
```

Vibrate for 200ms, pause for 100ms, vibrate for 200ms:

```js
Vibration.vibrate([200, 100, 200]);
```
