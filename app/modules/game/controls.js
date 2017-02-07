// @flow
import React from 'karet';

import * as M from './meta';
import { eventHandler } from './_event-handlers';
import { initializeObserver } from './_game-state';

export const dummy = 0;

export const WebView = ({ atom }: *) => {
  const view = M.Webview.observerViewIn(atom);
  initializeObserver(view);

  function ref(didMount) {
    if (didMount) {
      didMount.addEventListener('dom-ready', eventHandler(view));
    }
  }

  const props = {
    is: true,
    ref,
    nodeintegration: true,
    plugins: true,
    partition: 'persist:masayards',
    src: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/',
    style: { height: '480px', width: '800px', border: 'solid 1px #f00' }
  };

  return <webview {...props} />;
};

export default { WebView };
