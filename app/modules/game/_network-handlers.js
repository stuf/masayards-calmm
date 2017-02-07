/**
 * @fileoverview
 *  Debugger network event handlers used for monitoring incoming processable API data
 *
 * @flow
 */
import * as R from 'ramda';
import * as L from 'partial.lenses';

import * as M from './meta';

type NetworkEventMethod =
  | 'Network.requestWillBeSent'
  | 'Network.responseReceived'
  | 'Network.loadingFinished'
  | 'Network.getResponseBody';

export const networkEvent: { [key: string]: NetworkEventMethod } = {
  REQUEST_WILL_BE_SENT: 'Network.requestWillBeSent',
  RESPONSE_RECEIVED: 'Network.responseReceived',
  LOADING_FINISHED: 'Network.loadingFinished',
  GET_RESPONSE_BODY: 'Network.getResponseBody'
};

const pathPrefix: RegExp = /.*\/kcsapi/;

const requestWillBeSent = ({ handlerState, requestId, params }: *) => {
  const url = R.path(['request', 'url'], params);
  if (!pathPrefix.test(url)) {
    return;
  }

  M.Network
   .views
   .requestIn(requestId, handlerState)
   .modify(
     L.set(M.Handler.requestTemplate('request'), {
       requestId,
       request: params.request
     }));
};

const responseReceived = ({ handlerState, requestId, params }: *) => {
  const url = R.path(['response', 'url'], params);
  if (!pathPrefix.test(url)) {
    return;
  }

  M.Network
   .views
   .requestIn(requestId, handlerState)
   .modify(
     L.set(M.Handler.requestTemplate('response'), {
       requestId,
       response: params.response
     }));
};

const loadingFinished = ({ handlerState, contents, requestId }: *) => {
  const reqView = M.Network.views.requestIn(requestId, handlerState);
  const req = reqView.get();
  if (!req) {
    return;
  }

  reqView.remove();

  const path = M.Network.getPath(req);

  contents.debugger.sendCommand(networkEvent.GET_RESPONSE_BODY, { requestId },
    (err, result) => {
      console.group(path);
      console.time('Time spent (inner)');

      const ts = +(new Date());
      const body = M.Network.getBody(result);
      const postBody = M.Network.getPostBody(req);
      const data = { path, ts, body, postBody };

      console.timeEnd('Time spent (inner)');
      console.log('data =', data);

      const latest = M.Network.views.latestIn(handlerState);

      latest.set(data);

      console.groupEnd();
    });
};

export const getHandler = R.cond([
  [R.equals(networkEvent.REQUEST_WILL_BE_SENT), R.always(requestWillBeSent)],
  [R.equals(networkEvent.RESPONSE_RECEIVED), R.always(responseReceived)],
  [R.equals(networkEvent.LOADING_FINISHED), R.always(loadingFinished)]
]);
