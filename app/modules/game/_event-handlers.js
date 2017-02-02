// @flow
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import Kefir from 'kefir';
import Atom from 'kefir.atom';

import type { MessageHandler, HandlerState } from './types';
import * as M from './meta';
import { cookies, styles } from './_injectables';
import { getHandler } from './_network-handlers';

const debuggerProtocol = '1.1';
const gameUrl: string = 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/';
const gameUrlRegex: RegExp = new RegExp(gameUrl.replace(/\//g, '\/')); // eslint-disable-line no-useless-escape

export const messageHandler: MessageHandler = (atom, event, method, params) => {
  const fn = getHandler(method);
  const requestId = params.requestId;

  if (fn) {
    fn({ atom, requestId, event, method, params });
  }
};

export const eventHandler = (atom: *) => (e: *) => {
  const { view, contents, session, webRequest } = M.Events.getEventObjects(e);
  Kefir.fromEvents(view, 'close').observe(M.toDebugger(contents.debugger, 'Network.disable'));

  contents.on('ready', () => contents.injectCSS(styles.join('')));

  // @todo Look into using U.seq+U.lift or some other method for doing this
  const hs: HandlerState = atom.get();

  if (!hs.debuggerAttached) {
    contents.debugger.attach(debuggerProtocol);
    atom.modify(L.set('debuggerAttached', true));
  }

  if (hs.firstGameLoad) {
    webRequest.onBeforeRequest((details, cb) => {
      if (R.test(gameUrlRegex, details.url)) {
        console.log('Inject cookies into webview contents.');
        contents.executeJavaScript(cookies.join('\n'));
      }

      cb(details);
    });
  }
};
