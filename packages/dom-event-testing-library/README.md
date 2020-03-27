# `dom-event-testing-library`

A library for unit testing high-level interactions via simple pointer events, e.g.,
`pointerdown`, that produce realistic and complete DOM event sequences.

There are number of challenges involved in unit testing modules that work with
DOM events.

1. Testing environments with and without support for the `PointerEvent` API.
2. Testing various user interaction modes including mouse, touch, and pen use.
3. Testing against the event sequences browsers actually produce (e.g., emulated
   touch and mouse events.)
4. Testing against the event properties DOM events include (i.e., more complete
   mock data)
4. Testing against "virtual" events produced by tools like screen-readers.

Writing unit tests to cover all these scenarios is tedious and error prone. This
event testing library is designed to avoid these issues by allowing developers to
more easily dispatch events in unit tests, and to more reliably test interactions
while using an API based on `PointerEvent`.

## Example

```js
import {
  describeWithPointerEvent,
  testWithPointerType,
  clearPointers,
  createEventTarget,
  setPointerEvent,
} from 'dom-event-testing-library';

describeWithPointerEvent('useTap', hasPointerEvent => {
  beforeEach(() => {
    // basic PointerEvent mock
    setPointerEvent(hasPointerEvent);
  });

  afterEach(() => {
    // clear active pointers between test runs
    clearPointers();
  });

  // test all the pointer types supported by the environment
  testWithPointerType('pointer down', pointerType => {
    const ref = createRef(null);
    const onTapStart = jest.fn();
    render(() => {
      useTap(ref, { onTapStart });
      return <div ref={ref} />
    });

    // create an event target
    const target = createEventTarget(ref.current);
    // dispatch high-level pointer event
    target.pointerdown({ pointerType });
    expect(onTapStart).toBeCalled();
  });
});
```

This tests the interaction in multiple scenarios. In each case, a realistic DOM
event sequence–with complete mock events–is produced. When running in a mock
environment without the `PointerEvent` API, the test runs for both `mouse` and
`touch` pointer types. When `touch` is the pointer type it produces emulated mouse
events. When running in a mock environment with the `PointerEvent` API, the test
runs for `mouse`, `touch`, and `pen` pointer types.

It's important to cover all these scenarios because it's very easy to introduce
bugs – e.g., double calling of callbacks – if not accounting for emulated mouse
events, differences in target capturing between `touch` and `mouse` pointers, and
the different semantics of `button` across event APIs.

Default values are provided for the expected native events properties. They can
also be customized as needed in a test.

```js
target.pointerdown({
  button: 0,
  buttons: 1,
  pageX: 10,
  pageY: 10,
  pointerType,
  // NOTE: use x,y instead of clientX,clientY
  x: 10,
  y: 10
});
```

Tests that dispatch multiple pointer events will dispatch multi-touch native events
on the target.

```js
// first pointer is active
target.pointerdown({pointerId: 1, pointerType});
// second pointer is active
target.pointerdown({pointerId: 2, pointerType});
```

## API

### Target and events

To create a new event target pass the DOM node to `createEventTarget(node)`. This target can then be used to dispatch event sequences and customize the event payload. The following are currently supported:

* `blur`
* `click`
* `contextmenu`
* `focus`
* `keydown`
* `keyup`
* `pointercancel`
* `pointerdown`
* `pointerhover` (moves when pointer is not down)
* `pointermove` (moves when pointer is down)
* `pointerover`
* `pointerout`
* `scroll`
* `select`
* `selectionchange`
* `tap` (equivalent to `pointerdown` followed by `pointerup`)
* `virtualclick`

The target also has `node` property equal to the node that was used to create the target, and a `setBoundClientRect({x,y,width,height})` method that can be used to mock the return value of `getBoundingClientRect`.

### Jest helpers

#### `describeWithPointerEvent`

This is just like `describe` but it will run the entire test suite twice, once in an environment with `PointerEvent` mocked and once without.

```js
describeWithPointerEvent('useTap', hasPointerEvent => {
  // test suite
});
```

#### `testWithPointerType`

The is just like `test` but it will run the test for every pointer type supported by the environment. When `PointerEvent` is mocked, the pointer types will be `mouse`, `touch`, and `pen`; otherwise the pointer types will be `mouse` and `touch`.

```js
testWithPointerType('pointer down', pointerType => {
  // test unit
});
```

### jsdom environment helpers

#### platform

Interactions that account for Windows / macOS differences can change the platform by calling `platform.set(value)`, where `value` can be either `'mac'` or `'windows'`. To retreive the current platform call `platform.get()`, and the clear it call `platform.clear()`.

#### hasPointerEvent / setPointerEvent

Interactions implemented using `PointerEvent` can create a basic mock for jsdom by calling `setPointerEvent(true)` (disable with `setPointerEvent(false)`), and check whether `PointerEvent` is available by calling `hasPointerEvent()`.
