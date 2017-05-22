import invariant from 'fbjs/lib/invariant';
import findIndex from 'array-find-index';

type HandlerFunctionType = (event: EventType) => {};
type EventType = { url: string, nativeEvent: NativeEventType };
type NativeEventType = { data: any, origin: string, source: any };

const EVENT_TYPES = ['url'];
const MESSAGE_EVENT = 'message';

const listeners = [];

class Linking {
  static addEventListener(type: 'url', handler: HandlerFunctionType) {
    invariant(EVENT_TYPES.indexOf(type) !== -1, 'Trying to subscribe to unknown event: "%s"', type);
    const callback = event => onMessage(event, handler);
    listeners.push([handler, callback]);
    window.addEventListener(MESSAGE_EVENT, callback, false);
  }

  static removeEventListener(type: 'url', handler: HandlerFunctionType) {
    invariant(EVENT_TYPES.indexOf(type) !== -1, 'Trying to remove listener for unknown event: "%s"', type);
    const listenerIndex = findIndex(listeners, pair => pair[0] === handler);
    invariant(listenerIndex !== -1, 'Trying to remove Linking listener for unregistered handler');
    const callback = listeners[listenerIndex][1];
    window.removeEventListener(MESSAGE_EVENT, callback, false);
    listeners.splice(listenerIndex, 1);
  }

  static canOpenURL() {
    return Promise.resolve(true);
  }

  static getInitialURL() {
    return Promise.resolve(window.location.href);
  }

  static openURL(url: string) {
    try {
      iframeOpen(url);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

const onMessage = (nativeEvent: NativeEventType, handler: HandlerFunctionType) => {
  const url = window.location.href;
  handler({ url, nativeEvent });
};

/**
 * Tabs opened using JavaScript may redirect the parent tab using
 * `window.opener.location`, ignoring cross-origin restrictions and enabling
 * phishing attacks.
 *
 * Safari requires that we open the url by injecting a hidden iframe that calls
 * window.open(), then removes the iframe from the DOM.
 *
 * https://mathiasbynens.github.io/rel-noopener/
 */
const iframeOpen = url => {
  const noOpener = url.indexOf('mailto:') !== 0;
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const script = iframeDoc.createElement('script');
  script.text = `
    window.parent = null; window.top = null; window.frameElement = null;
    var child = window.open("${url}"); ${noOpener && 'child.opener = null'};
  `;
  iframeDoc.body.appendChild(script);
  document.body.removeChild(iframe);
};

module.exports = Linking;
