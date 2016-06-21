## AppState

`AppState` can tell you if the app is in the foreground or background, and
notify you when the state changes.

States

* `active` - The app is running in the foreground
* `background` - The app is running in the background (i.e., the user has not focused the app's tab).

## Properties

static **currentState**

Returns the current state of the app: `active` or `background`.

## Methods

static **addEventListener**(type: string, handler: Function)

Add a handler to `AppState` changes by listening to the `change` event type and
providing the `handler`. The handler is called with the app state value.

static **removeEventListener**(type: string, handler: Function)

Remove a handler by passing the change event `type` and the `handler`.

## Examples

To see the current state, you can check `AppState.currentState`, which will be
kept up-to-date. This example will only ever appear to say "Current state is:
active" because the app is only visible to the user when in the `active` state,
and the null state will happen only momentarily.

```js
class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentAppState: AppState.currentState }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (currentAppState) => {
    this.setState({ currentAppState });
  }

  render() {
    return (
      <Text>Current state is: {this.state.currentAppState}</Text>
    )
  }
}
```
