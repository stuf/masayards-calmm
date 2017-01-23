/* eslint no-underscore-dangle: 0 */
/**
 * @fileoverview
 *  Defines the handlers which will take care of collecting request and response data
 *  from the debugger.
 *
 * @todo Instead of collecting data temporarily into an Atom, why not collect it
 *       into state.game.api, and mark it with a `isComplete` flag when done.
 *       Then it can be appropriately handled for with an observer and necessary data
 *       moved into the active data pool.
 *
 * @todo Clean me, I'm dirty! Please!
 *
 * @flow
 */
import * as L from 'partial.lenses';
import K, * as U from 'karet.util';
import * as R from 'ramda';
import Atom from 'kefir.atom';
// import * as S from 'sanctuary';
import qs from 'querystring';
import { create, env } from 'sanctuary';

import handleGameState from './game-state';

const checkTypes = false;
const S = create({ checkTypes, env });

const requestStore = Atom({});

export const networkEvent: { [key: string]: string } = {
  REQUEST_WILL_BE_SENT: 'Network.requestWillBeSent',
  RESPONSE_RECEIVED: 'Network.responseReceived',
  LOADING_FINISHED: 'Network.loadingFinished',
  GET_RESPONSE_BODY: 'Network.getResponseBody'
};

// Test some monadic stuff
const apiDataPrefix: RegExp = /svdata=/;
const pathPrefix: RegExp = /.*\/kcsapi/;

const prepareApiData = S.encase(R.replace(apiDataPrefix, ''));
const getJson = S.parseJson(Object);
// const getData = S.get(Object, 'api_data');

const isObjectEmpty = S.ifElse(R.isEmpty, S.Maybe.empty, S.Maybe.of);

const getQS_ = R.path(['request', 'request', 'postData']);
const getQS = S.encase(getQS_);
const parseQS_ = qs.parse;
const parseQS = S.encase(parseQS_);
const removeToken = S.encase(R.dissoc('api_token'));

const getUrl_ = R.path(['request', 'url']);
const getUrl = S.encase(getUrl_);
const parsePath_ = R.replace(pathPrefix, '');
const parsePath = S.encase(parsePath_);

// Parsing functions for retrieving request data
const getBodyData = body =>
  S.Maybe.of(body)
         .chain(prepareApiData)
         .chain(getJson)
         // .chain(getData)
         .chain(isObjectEmpty);

const getPostBodyData = body =>
  S.Maybe.of(body)
         .chain(getQS)
         .chain(parseQS)
         .chain(removeToken)
         .chain(isObjectEmpty);

const getPath = req =>
  S.Maybe.of(req)
         .chain(getUrl)
         .chain(parsePath);

// Export public-facing functions

/**
 * Handler function for when the debugger sends a REQUEST_WILL_BE_SENT message.
 * @event REQUEST_WILL_BE_SENT
 */
export const requestWillBeSentFn =
  ({ thisRequest, requestId }: *, { event, method, params }: *) => {
    const url = R.path(['request', 'url'], params);
    if (!url || !pathPrefix.test(url)) {
      return;
    }

    thisRequest.modify(r => L.set('request', {
      requestId: params.requestId,
      request: params.request,
      url: params.request.url
    }, r));
  };

/**
 * Handler function for when the debugger sends a RESPONSE_RECEIVED message.
 * @event RESPONSE_RECEIVED
 */
export const responseReceivedFn =
  ({ thisRequest, requestId }: *, { event, method, params }: *) => {
    const url = R.path(['response', 'url'], params);
    if (!url || !pathPrefix.test(url)) {
      return;
    }

    thisRequest.modify(r => L.set('response', {
      requestId: params.requestId,
      response: params.response,
      url: params.response.url
    }, r));
  };

/**
 * Fetch the response body and move it into the pool of API data to be processed.
 * @event LOADING_FINISHED
 */
export const loadingFinishedFn =
  ({ thisRequest, game, contents, requestId }: *, { event, method, params }: *) => {
    const thisReq = thisRequest.get();

    // Since we already have all the data we need, we can safely remove this request
    // from the request pool.
    thisRequest.remove();

    if (!thisReq) {
      return;
    }

    const path = S.fromMaybe('', getPath(thisReq));

    // Get the resulting request body from this request
    contents.debugger.sendCommand(networkEvent.GET_RESPONSE_BODY, { requestId },
      (err, result) => {
        console.group(path);
        const time = +(new Date());
        const body = S.fromMaybe({}, getBodyData(result.body));
        const postBody = S.fromMaybe({}, getPostBodyData(thisReq));
        const newData = { time, body, postBody };

        console.log('newData =', newData);
        console.groupEnd();

        // Move the data from this request to the API data pool.
        // Subscribers from this pool can then process the data before it's passed into the UI.
        game.view(['api', 'latest']).modify(() => ({ path, ...newData }));
        game.view(['api', 'data']).modify(cur => L.set(path, newData, cur));
      });
  };

export const getHandler = R.cond([
  [R.equals(networkEvent.REQUEST_WILL_BE_SENT), R.always(requestWillBeSentFn)],
  [R.equals(networkEvent.RESPONSE_RECEIVED), R.always(responseReceivedFn)],
  [R.equals(networkEvent.LOADING_FINISHED), R.always(loadingFinishedFn)]
]);
