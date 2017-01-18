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
import qs from 'querystring';

export const networkEvent: { [key: string]: string } = {
  REQUEST_WILL_BE_SENT: 'Network.requestWillBeSent',
  RESPONSE_RECEIVED: 'Network.responseReceived',
  LOADING_FINISHED: 'Network.loadingFinished',
  GET_RESPONSE_BODY: 'Network.getResponseBody'
};

const apiDataPrefix: RegExp = /svdata=/;
const pathPrefix: RegExp = /.*\/kcsapi/;

const intoJson = R.compose(JSON.parse, JSON.stringify);

const logError = (...args) => console.error('>> ERROR: ', ...args);
const tryJsonParse = R.tryCatch(JSON.parse, logError);
const removeTokenFrom = R.dissoc('api_token');

const isGamePath = R.test(pathPrefix);
const parsePath = R.replace(pathPrefix, '');

const unlessFalsy = R.unless(R.isNil);
const inApiData = R.prop('api_data');
const inBody = R.prop('body');
const replacePrefix = R.replace(apiDataPrefix);

const parseResultBody = R.compose(R.prop('api_data'),
                                  JSON.parse,
                                  R.replace(apiDataPrefix),
                                  R.prop('body'));

const parseQueryString = R.compose(removeTokenFrom,
                                   qs.parse,
                                   unlessFalsy);

// Export public-facing functions

/**
 * @event REQUEST_WILL_BE_SENT
 *
 * Handler function for when the debugger sends a REQUEST_WILL_BE_SENT message.
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
 * @event RESPONSE_RECEIVED
 *
 * Handler function for when the debugger sends a RESPONSE_RECEIVED message.
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
 * @event LOADING_FINISHED
 *
 * Fetch the response body and move it into the pool of API data to be processed.
 */
export const loadingFinishedFn =
  R.curry(({ thisRequest, data, contents, requestId }, { event, method, params }) => {
    const thisReq = thisRequest.get();

    // Since we already have all the data we need, we can safely remove this request
    // from the request pool.
    thisRequest.remove();

    if (!thisReq) {
      return;
    }

    const url = thisReq.request.url;

    console.log('>> Got a resulting object (rId: %s)', requestId, { thisReq });

    // Get the resulting request body from this request
    contents.debugger.sendCommand(networkEvent.GET_RESPONSE_BODY, { requestId },
      (err, result) => {
        const body = result.body;
        let b;
        if (body) {
          b = body.replace(apiDataPrefix, '');
          b = JSON.parse(b);
          b = R.prop('api_data', b);
        }
        console.log({ b });
        // const resultBody = parseResultBody(result);
        const postBody = parseQueryString(R.path(['params', 'request', 'postData'], thisReq));
        const path = parsePath(url);
        const time = +(new Date());

        // Move the data from this request to the API data pool.
        // Subscribers from this pool can then process the data before it's passed into the UI.
        data.modify(d => L.set(path, { time, data: b, postData: postBody }, d));
      });
  });

export const getHandler = R.cond([
  [R.equals(networkEvent.REQUEST_WILL_BE_SENT), R.always(requestWillBeSentFn)],
  [R.equals(networkEvent.RESPONSE_RECEIVED), R.always(responseReceivedFn)],
  [R.equals(networkEvent.LOADING_FINISHED), R.always(loadingFinishedFn)]
]);
