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

## Examples

In this example, let's say your app lives on `https://app.com`. When you call `window.postMessage('foobar', 'https://app.com')`
from the domain `https://google.com`, you will see the current URL (`https://app.com`) and received data (`foobar`).

```js
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = { initialUrl: '', currentUrl: '', receivedData: '' };
  }

  componentDidMount() {
    Linking.getInitialURL().then(url => this.setState({ initialUrl: url }));
    Linking.addEventListener('url', this._handleUrl);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleUrl);
  }

  _handleUrl = ({url, nativeEvent}) => {
    // Don't forget to check that the origin is allowed
    if (nativeEvent && nativeEvent.origin === 'https://google.com') {
      this.setState({
        currentUrl: url,
        receivedData: JSON.stringify(nativeEvent.data),
      });
    }
  }

  render() {
    return (
      <View>
        <Text>Initial URL is: {this.state.initialUrl}</Text>
        <Text>Current URL is: {this.state.currentUrl}</Text>
        <Text>Received data is: {this.state.receivedData}</Text>
       </View>
    )
  }
}
```
