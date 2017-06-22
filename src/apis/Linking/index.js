/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Linking
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

const initialURL = canUseDOM ? window.location.href : '';

const Linking = {
  addEventListener() {},
  removeEventListener() {},
  canOpenURL() {
    return Promise.resolve(true);
  },
  getInitialURL() {
    return Promise.resolve(initialURL);
  },
  openURL(url: string) {
    try {
      iframeOpen(url);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
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
  const body = document.body;
  if (body) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const iframeBody = iframeDoc.body;
    if (iframeBody) {
      const script = iframeDoc.createElement('script');
      const openerExpression = noOpener ? 'child.opener = null' : '';
      script.text = `
        window.parent = null; window.top = null; window.frameElement = null;
        var child = window.open("${url}"); ${openerExpression};
      `;
      iframeBody.appendChild(script);
    }
    body.removeChild(iframe);
  }
};

export default Linking;
