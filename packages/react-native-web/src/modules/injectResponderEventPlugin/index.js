// based on https://github.com/facebook/react/pull/4303/files

import normalizeNativeEvent from '../normalizeNativeEvent';
import ReactDOM from 'react-dom';
import ReactDOMUnstableNativeDependencies from 'react-dom/unstable-native-dependencies';

const { EventPluginHub } = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
const { ResponderEventPlugin, ResponderTouchHistoryStore } = ReactDOMUnstableNativeDependencies;

const originalExtractEvents = ResponderEventPlugin.extractEvents;
ResponderEventPlugin.extractEvents = (topLevelType, targetInst, nativeEvent, nativeEventTarget) => {
  const hasActiveTouches = ResponderTouchHistoryStore.touchHistory.numberActiveTouches > 0;
  if (
    // Filter out mousemove and mouseup events when a touch hasn't started yet
    ((nativeEvent.type === 'mousemove' || nativeEvent.type === 'mouseup') && !hasActiveTouches) ||
    // Filter out events from wheel/middle and right click.
    (nativeEvent.button === 1 || nativeEvent.button === 2)
  ) {
    return;
  }

  const normalizedEvent = normalizeNativeEvent(nativeEvent);

  return originalExtractEvents.call(
    ResponderEventPlugin,
    topLevelType,
    targetInst,
    normalizedEvent,
    nativeEventTarget
  );
};

EventPluginHub.injection.injectEventPluginsByName({
  ResponderEventPlugin
});
