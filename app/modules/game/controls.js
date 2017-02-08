/* eslint import/prefer-default-export: 0 */
// @flow
import React from 'karet';

import * as M from './meta';
import { eventHandler } from './_event-handlers';
import { initializeObserver } from './_game-state';

export const WebView = ({ atom }: *) => {
  function ref(didMount) {
    let observer;

    if (didMount) {
      didMount.addEventListener('dom-ready', eventHandler(atom));
      observer = initializeObserver(atom);
    }

    if (observer && !didMount) {
      observer.unsubscribe();
    }
  }

  const props = {
    is: true,
    ref,
    nodeintegration: true,
    plugins: true,
    partition: 'persist:masayards',
    src: 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/',
    style: { height: '480px', width: '800px' }
  };

  return <webview {...props} />;
};
