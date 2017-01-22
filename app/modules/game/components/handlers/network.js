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
const getData = S.get(Object, 'api_data');

const getBodyData = body =>
  S.Maybe.of(body)
         .chain(prepareApiData)
         .chain(getJson)
         .chain(getData);

const parseQS = S.encase(qs.parse);
const removeToken = S.encase(R.dissoc('api_token'));

const getPostBodyData = body =>
  S.Maybe.of(body)
         .chain(parseQS)
         .chain(removeToken);

// Define some basic utilities for handling data
const parsePath = R.replace(pathPrefix, '');

const parseResultBody = R.compose(R.prop('api_data'),
                                  JSON.parse,
                                  R.replace(apiDataPrefix),
                                  R.prop('body'));

const parseQueryString = R.compose(R.dissoc('api_token'),
                                   qs.parse,
                                   R.unless(R.isNil));

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
  ({ thisRequest, data, latest, contents, requestId }: *, { event, method, params }: *) => {
    const thisReq = thisRequest.get();

    // Since we already have all the data we need, we can safely remove this request
    // from the request pool.
    thisRequest.remove();

    if (!thisReq) {
      return;
    }

    const url = thisReq.request.url;

    // Get the resulting request body from this request
    contents.debugger.sendCommand(networkEvent.GET_RESPONSE_BODY, { requestId },
      (err, result) => {
        const body = result.body;
        const path = R.replace(pathPrefix, '', url);

        console.groupCollapsed(path);
        console.group('Monadic parse');
        console.time('Monadic parse');
        const mb = S.Maybe.of(body)
                          .chain(prepareApiData)
                          .chain(getJson)
                          .chain(getData);
        console.log('Result =>', S.fromMaybe({}, mb));
        console.timeEnd('Monadic parse');
        console.groupEnd();

        // Either this is right or then it goes all left...
        // @todo Clean this up with something less imperative
        // @todo Replace with `either.left` and `either.right` implementation
        console.group('Vanilla parse');
        console.time('Vanilla parse');
        let bd;
        if (body) {
          bd = body.replace(apiDataPrefix, '');
          bd = JSON.parse(bd);
          bd = R.prop('api_data', bd);
        }
        console.log('Vanilla =>', bd);
        console.groupEnd();
        console.timeEnd('Vanilla parse');

        const postBody = parseQueryString(R.path(['params', 'request', 'postData'], thisReq));
        const time = +(new Date());
        console.groupEnd();
        // Move the data from this request to the API data pool.
        // Subscribers from this pool can then process the data before it's passed into the UI.
        const newData = { time, data: mb, postData: postBody };
        data.modify(curData => L.set(path, newData, curData));
        latest.modify(curData => L.set());
      });
  };

export const getHandler = R.cond([
  [R.equals(networkEvent.REQUEST_WILL_BE_SENT), R.always(requestWillBeSentFn)],
  [R.equals(networkEvent.RESPONSE_RECEIVED), R.always(responseReceivedFn)],
  [R.equals(networkEvent.LOADING_FINISHED), R.always(loadingFinishedFn)]
]);
