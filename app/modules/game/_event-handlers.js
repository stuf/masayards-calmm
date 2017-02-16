// @flow
import { Map } from 'immutable';
import * as R from 'ramda';
import Kefir from 'kefir';

import * as M from './meta';
import { cookies, styles } from './_injectables';
import { getHandler } from './_network-handlers';

const debuggerProtocol: string = '1.1';
const gameUrl: string = 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/';
const gameUrlRegex: RegExp = new RegExp(gameUrl.replace(/\//g, '\/')); // eslint-disable-line no-useless-escape

type CovariantObject<A, B> = { +[k: A]: B };

type Fn1 = (a: *) => *;
type Fn2 = (a: *, b: *) => *;
type Fn3 = (a: *, b: *, c: *) => *;
type Fn4 = (a: *, b: *, c: *, d: *) => *;
type Fn5 = (a: *, b: *, c: *, d: *, e: *) => *;

type CurriedFn2 =
  | Fn2
  | (a: *) => Fn1;

type CurriedFn3 =
  | Fn3
  | (a: *) => CurriedFn2
  | (a: *, b: *) => Fn1;

type CurriedFn4 =
  | Fn4
  | (a: *) => CurriedFn3
  | (a: *, b: *) => CurriedFn2
  | (a: *, b: *, c: *) => Fn1;

type CurriedFn5 =
  | Fn5
  | (a: *) => CurriedFn4
  | (a: *, b: *) => CurriedFn3
  | (a: *, b: *, c: *) => CurriedFn2
  | (a: *, b: *, c: *, d: *) => Fn1;

/**
 * Network event message handler
 * @todo Rethink in case debugger effect handling could be done in some other way
 */
export const messageHandler: CurriedFn5 =
  R.curry((atom: *, contents: *, event: *, method: string, params: CovariantObject<string, *>) => {
    const fn = getHandler(method);
    const requestId = params.requestId;

    if (!fn) {
      return;
    }

    fn({ handlerState: atom, contents, requestId, event, method, params });
  });

// Network event handler

/**
 * Network event handler state
 */
let handlerState = Map({
  debuggerAttached: false,
  firstGameLoad: true
});

export const eventHandler = (atom: *) => (e: *) => {
  const { view, contents, /* session,*/ webRequest } = M.Events.getEventObjects(e);

  Kefir.fromEvents(view, 'close').observe(() =>
    contents.debugger.sendCommand('Network.disable'));

  contents.on('dom-ready', () => contents.insertCSS(styles.join('')));

  if (!handlerState.get('debuggerAttached')) {
    contents.debugger.attach(debuggerProtocol);
    handlerState = handlerState.set('debuggerAttached', true);

    contents.debugger.on('message', messageHandler(atom, contents));
  }

  if (handlerState.get('firstGameLoad')) {
    webRequest.onBeforeRequest((details, cb) => {
      if (R.test(gameUrlRegex, details.url)) {
        console.log('Inject cookies into webview contents.');
        contents.executeJavaScript(cookies.join('\n'));
        handlerState = handlerState.set('firstGameLoad', false);
      }

      cb(details);
    });
  }

  contents.debugger.sendCommand('Network.enable');
};
