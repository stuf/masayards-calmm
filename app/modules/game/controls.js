// @flow
import React from 'karet';
import * as U from 'karet.util';
import Kefir from 'kefir';

import * as M from './meta';
import { getEventObjects, eventHandler } from './_event-handlers';

export const dummy = 0;

export const WebView = ({ atom }: *) => {
  const view = M.Webview.observerViewIn(atom);

  function ref(didMount) {
    if (didMount) {
      this.addEventListener('dom-ready', eventHandler);
    }
    else {
      this.removeEventListener('dom-ready');
    }
  }

  return <webview ref={ref} />;
};
