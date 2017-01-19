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
  ({ thisRequest, data, contents, requestId }: *, { event, method, params }: *) => {
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

        // @todo Clean this up with something less imperative
        let b;
        if (body) {
          b = body.replace(apiDataPrefix, '');
          b = JSON.parse(b);
          b = R.prop('api_data', b);
        }

        const postBody = parseQueryString(R.path(['params', 'request', 'postData'], thisReq));
        const path = R.replace(pathPrefix, '', url);
        const time = +(new Date());

        // Move the data from this request to the API data pool.
        // Subscribers from this pool can then process the data before it's passed into the UI.
        const newData = { time, data: b, postData: postBody };
        data.modify(curData => L.set(path, newData, curData));
      });
  };

export const getHandler = R.cond([
  [R.equals(networkEvent.REQUEST_WILL_BE_SENT), R.always(requestWillBeSentFn)],
  [R.equals(networkEvent.RESPONSE_RECEIVED), R.always(responseReceivedFn)],
  [R.equals(networkEvent.LOADING_FINISHED), R.always(loadingFinishedFn)]
]);
