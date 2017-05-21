## Linking

`Linking` gives you a general interface to interact with both incoming and outgoing web links.

## Methods

static **addEventListener**(type: string, handler: Function)

Add a handler to `Linking` changes by listening to the `url` event type and
providing the `handler`.
The handler is called each time another `window` [posts a message](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
to your origin, with the following object as parameter:
```flow
{
  url: string, // your current url
  nativeEvent: {
    data: any, // the data sent by the foreign window
    origin: string, // the origin of the foreign window (security: check that it's allowed!)
    source: any, // the foreign window object
  },
}
```

static **removeEventListener**(type: string, handler: Function)

Remove a handler by passing the change event `type` and the `handler`.

static **getInitialURL**()

A promise that gives the current URL.

static **openURL**(url: string)

Returns a Promise that resolves if it successfully opens the URL, and rejects if not.
