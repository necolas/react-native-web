# NetInfo

`NetInfo` asynchronously determines the online/offline status of the
application.

Connection types:

* `bluetooth` - The user agent is using a Bluetooth connection.
* `cellular` - The user agent is using a cellular connection (e.g., EDGE, HSPA, LTE, etc.).
* `ethernet` - The user agent is using an Ethernet connection.
* `mixed` -  The user agent is using multiple connection types.
* `none` - The user agent will not contact the network (offline).
* `other` - The user agent is using a connection type that is not one of enumerated connection types.
* `unknown` -  The user agent has established a network connection, but is unable to determine what is the underlying connection technology.
* `wifi` - The user agent is using a Wi-Fi connection.
* `wimax` -  The user agent is using a WiMAX connection.

## Methods

Note that support for retrieving the connection type depends upon browswer
support (and is limited to mobile browsers). It will default to `unknown` when
support is missing.

static **addEventListener**(eventName: ChangeEventName, handler: Function)

static **fetch**(): Promise

static **removeEventListener**(eventName: ChangeEventName, handler: Function)

## Properties

**isConnected**

Available on all user agents. Asynchronously fetch a boolean to determine
internet connectivity.

**isConnected.addEventListener**(eventName: ChangeEventName, handler: Function)

**isConnected.fetch**(): Promise

**isConnected.removeEventListener**(eventName: ChangeEventName, handler: Function)

## Examples

Fetching the connection type:

```js
NetInfo.fetch().then((connectionType) => {
  console.log('Connection type:', connectionType);
});
```

Subscribing to changes in the connection type:

```js
const handleConnectivityTypeChange = (connectionType) => {
  console.log('Current connection type:', connectionType);
}
NetInfo.addEventListener('change', handleConnectivityTypeChange);
```

Fetching the connection status:

```js
NetInfo.isConnected.fetch().then((isConnected) => {
  console.log('Connection status:', (isConnected ? 'online' : 'offline'));
});
```

Subscribing to changes in the connection status:

```js
const handleConnectivityStatusChange = (isConnected) => {
  console.log('Current connection status:', (isConnected ? 'online' : 'offline'));
}
NetInfo.isConnected.addEventListener('change', handleConnectivityStatusChange);
```
