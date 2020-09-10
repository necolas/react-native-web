# Responder Event System

The Responder Event System is a gesture system that manages the lifecycle of gestures. It was designed for [React Native](https://reactnative.dev/docs/next/gesture-responder-system) to help support the development of native-quality gestures. A pointer may transition through several different phases while the gesture is being determined (e.g., tap, scroll, swipe) and be used simultaneously alongside other pointers. The Responder Event System provides a single, global “interaction lock” on views. For a view to become the “responder” means that pointer interactions are exclusive to that view and none other. A view can negotiate to become the “responder” without requiring knowledge of other views.

NOTE: Although the responder events mention only `touches`, this is for historical reasons (originating from React Native); the system does respond to mouse events which are converted into emulated touches. In the future we could adjust the events to align more with the `PointerEvent` API which would remove this ambiguity and surface more information to developers (e.g., `pointerType`).

## How it works

A view can become the "responder" after the following native events: `scroll`, `selectionchange`, `touchstart`, `touchmove`, `mousedown`, `mousemove`. If nothing is already the "responder", the event propagates to (capture) and from (bubble) the event target until a view returns `true` for `on*ShouldSetResponder(Capture)`.
 
If something is *already* the responder, the negotiation event propagates to (capture) and from (bubble) the lowest common ancestor of the event target and the current responder. Then negotiation happens between the current responder and the view that wants to become the responder.

## API

### useResponderEvents

The `useResponderEvents` hook takes a ref to a host element and an object of responder callbacks.

```js
function View(props) {
  const hostRef = useRef(null);

  const callbacks: ResponderCallbacks = {
    onMoveShouldSetResponder: props.onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture: props.onMoveShouldSetResponderCapture,
    onResponderEnd: props.onResponderEnd,
    onResponderGrant: props.onResponderGrant,
    onResponderMove: props.onResponderMove,
    onResponderReject: props.onResponderReject,
    onResponderRelease: props.onResponderRelease,
    onResponderStart: props.onResponderStart,
    onResponderTerminate: props.onResponderTerminate,
    onResponderTerminationRequest: props.onResponderTerminationRequest,
    onScrollShouldSetResponder: props.onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture: props.onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder: props.onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture: props.onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder: props.onStartShouldSetResponder,
    onStartShouldSetResponderCapture: props.onStartShouldSetResponderCapture
  }

  useResponderEvents(hostRef, callbacks);

  return (
    <div ref={hostRef} />
  );
}
```

### Responder negotiation

A view can become the responder by using the negotiation methods. During the capture phase the deepest node is called last. During the bubble phase the deepest node is called first. The capture phase should be used when a view wants to prevent a descendant from becoming the responder. The first view to return `true` from any of the `on*ShouldSetResponderCapture`/`on*ShouldSetResponder` methods will either become the responder or enter into negotiation with the existing responder.

N.B. If `stopPropagation` is called on the event for any of the negotiation methods, it only stops further negotiation within the Responder System. It will not stop the propagation of the native event (which has already bubbled to the `document` by this time.)

#### onStartShouldSetResponder / onStartShouldSetResponderCapture

On pointer down, should this view attempt to become the responder? If the view is not the responder, these methods may be called for every pointer start on the view.

#### onMoveShouldSetResponder / onMoveShouldSetResponderCapture

On pointer move, should this view attempt to become the responder? If the view is not the responder, these methods may be called for every pointer move on the view.

#### onScrollShouldSetResponder / onScrollShouldSetResponderCapture

On scroll, should this view attempt to become the responder? If the view is not the responder, these methods may be called for every scroll on the view.

#### onSelectionChangeShouldSetResponder / onSelectionChangeShouldSetResponderCapture

On text selection change, should this view attempt to become the responder? Does not capture or bubble and is only called on the view that is the first ancestor of the selection `anchorNode`.

#### onResponderTerminationRequest

The view is the responder, but another view now wants to become the responder. Should this view release the responder? Returning `true` allows the responder to be released.

### Responder transfer

If a view returns `true` for a negotiation method then it will either become the responder (if none exists) or be involved in the responder transfer. The following methods are called only for the views involved in the responder transfer (i.e., no bubbling.)

#### onResponderGrant

The view is granted the responder and is now responding to pointer events. The lifecycle methods will be called for this view. This is the point at which you should provide visual feedback for users that the interaction has begun.

#### onResponderReject

The view was not granted the responder. It was rejected because another view is already the responder and will not release it.

#### onResponderTerminate

The responder has been taken from this view. It may have been taken by another view after a call to `onResponderTerminationRequest`, or it might have been taken by the browser without asking (e.g., window blur, document scroll, context menu open). This is the point at which you should provide visual feedback for users that the interaction has been cancelled.

### Responder lifecycle

If a view is the responder, the following methods will be called only for this view (i.e., no bubbling.) These methods are *always* bookended by `onResponderGrant` (before) and either `onResponderRelease` or `onResponderTerminate` (after).

#### onResponderStart

A pointer down event occured on the screen. The responder is notified of all start events, even if the pointer target is not this view (i.e., additional pointers are being used). Therefore, this method may be called multiple times while the view is the responder.

#### onResponderMove

A pointer move event occured on the screen. The responder is notified of all move events, even if the pointer target is not this view (i.e., additional pointers are being used). Therefore, this method may be called multiple times while the view is the responder.

#### onResponderEnd

A pointer up event occured on the screen. The responder is notified of all end events, even if the pointer target is not this view (i.e., additional pointers are being used). Therefore, this method may be called multiple times while the view is the responder.

#### onResponderRelease

As soon as there are no more pointers that *started* inside descendants of the responder, this method is called on the responder and the interaction lock is released. This is the point at which you should provide visual feedback for users that the interaction is over.

### Responder events

Every method is called with a responder event. The type of the event is shown below. The `currentTarget` of the event is always `null` for the negotiation methods. Data dervied from the native events, e.g., the native `target` and pointer coordinates, can be used to determine the return value of the negotiation methods, etc.

## Types

```js
type ResponderCallbacks = {
  onResponderEnd?: ?(e: ResponderEvent) => void,
  onResponderGrant?: ?(e: ResponderEvent) => void,
  onResponderMove?: ?(e: ResponderEvent) => void,
  onResponderRelease?: ?(e: ResponderEvent) => void,
  onResponderReject?: ?(e: ResponderEvent) => void,
  onResponderStart?: ?(e: ResponderEvent) => void,
  onResponderTerminate?: ?(e: ResponderEvent) => void,
  onResponderTerminationRequest?: ?(e: ResponderEvent) => boolean,
  onStartShouldSetResponder?: ?(e: ResponderEvent) => boolean,
  onStartShouldSetResponderCapture?: ?(e: ResponderEvent) => boolean,
  onMoveShouldSetResponder?: ?(e: ResponderEvent) => boolean,
  onMoveShouldSetResponderCapture?: ?(e: ResponderEvent) => boolean,
  onScrollShouldSetResponder?: ?(e: ResponderEvent) => boolean,
  onScrollShouldSetResponderCapture?: ?(e: ResponderEvent) => boolean,
  onSelectionChangeShouldSetResponder?: ?(e: ResponderEvent) => boolean,
  onSelectionChangeShouldSetResponderCapture?: ?(e: ResponderEvent) => boolean
};
```

```js
type ResponderEvent = {
  // The DOM element acting as the responder view
  currentTarget: ?HTMLElement,
  defaultPrevented: boolean,
  eventPhase: ?number,
  isDefaultPrevented: () => boolean,
  isPropagationStopped: () => boolean,
  isTrusted: boolean,
  preventDefault: () => void,
  stopPropagation: () => void,
  nativeEvent: TouchEvent,
  persist: () => void,
  target: HTMLElement,
  timeStamp: number,
  touchHistory: $ReadOnly<{|
    indexOfSingleActiveTouch: number,
    mostRecentTimeStamp: number,
    numberActiveTouches: number,
    touchBank: Array<{|
      currentPageX: number,
      currentPageY: number,
      currentTimeStamp: number,
      previousPageX: number,
      previousPageY: number,
      previousTimeStamp: number,
      startPageX: number,
      startPageY: number,
      startTimeStamp: number,
      touchActive: boolean
    |}>
  |}>
};
```

```js
type TouchEvent = {
  // Array of all touch events that have changed since the last event
  changedTouches: Array<Touch>,
  force: number,
  // ID of the touch
  identifier: number,
  // The X position of the pointer, relative to the currentTarget
  locationX: number,
  // The Y position of the pointer, relative to the currentTarget
  locationY: number,
  // The X position of the pointer, relative to the page
  pageX: number,
  // The Y position of the pointer, relative to the page
  pageY: number,
  // The DOM element receiving the pointer event
  target: HTMLElement,
  // A time identifier for the pointer, useful for velocity calculation
  timestamp: number,
  // Array of all current touches on the screen
  touches: Array<Touch>
};
```

```js
type Touch = {
  force: number,
  identifier: number,
  locationX: number,
  locationY: number,
  pageX: number,
  pageY: number,
  target: HTMLElement,
  timestamp: number
};
```
