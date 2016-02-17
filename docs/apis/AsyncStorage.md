# AsyncStorage

`AsyncStorage` is a simple, asynchronous, persistent, key-value storage system
that is global to the domain. It's a facade over, and should be used instead of
`window.localStorage` to provide an asynchronous API and multi functions. Each
method returns a `Promise` object.

It is recommended that you use an abstraction on top of `AsyncStorage` instead
of `AsyncStorage` directly for anything more than light usage since it operates
globally.

The batched functions are useful for executing a lot of operations at once,
allowing for optimizations to provide the convenience of a single promise after
all operations are complete.

## Methods

static **clear**()

Erases all AsyncStorage. You probably don't want to call this - use
`removeItem` or `multiRemove` to clear only your own keys instead. Returns a
Promise object.

static **getAllKeys**()

Gets all known keys. Returns a Promise object.

static **getItem**(key: string)

Fetches the value of the given key. Returns a Promise object.

static **mergeItem**(key: string, value: string)

Merges existing value with input value, assuming they are stringified JSON.
Returns a Promise object.

static **multiGet**(keys: Array<string>)

`multiGet` results in an array of key-value pair arrays that matches the input
format of `multiSet`. Returns a Promise object.

```js
multiGet(['k1', 'k2']) -> [['k1', 'val1'], ['k2', 'val2']]
```

static **multiMerge**(keyValuePairs: Array<Array<string>>)

multiMerge takes an array of key-value array pairs that match the output of
`multiGet`. It merges existing values with input values, assuming they are
stringified JSON. Returns a Promise object.

static **multiRemove**(keys: Array<string>)

Delete all the keys in the keys array. Returns a Promise object.

static **multiSet**(keyValuePairs: Array<Array<string>>)

`multiSet` takes an array of key-value array pairs that match the output of
`multiGet`. Returns a Promise object.

```js
multiSet([['k1', 'val1'], ['k2', 'val2']]);
```

static **removeItem**(key: string)

Removes the value of the given key. Returns a Promise object.

static **setItem**(key: string, value: string)

Sets the value of the given key. Returns a Promise object.
