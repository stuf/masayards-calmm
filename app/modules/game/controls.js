/* eslint-disable import/prefer-default-export, no-unused-expressions */
// @flow
import React from 'karet';

import { eventHandler } from './_event-handlers';
import { initializeObserver } from './_game-state';

type WebViewProps = {
  atom: *
};

export const WebView = ({ atom }: WebViewProps) => {
  function ref(didMount) {
    let observer;
    let effectObs;

    if (didMount) {
      didMount.addEventListener('dom-ready', eventHandler(atom));
      observer = initializeObserver(atom);
    }

    if (observer && !didMount) {
      observer.unsubscribe();
      effectObs && effectObs.unsubscribe();
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
