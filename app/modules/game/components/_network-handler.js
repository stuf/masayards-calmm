/**
 * @fileoverview
 *  Defines the handlers which will take care of collecting request and response data
 *  from the debugger.
 *
 * @todo
 *  Instead of collecting data temporarily into an Atom, why not collect it
 *  into state.game.api, and mark it with a `isComplete` flag when done.
 *  Then it can be appropriately handled for with an observer and necessary data
 *  moved into the active data pool.
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

const param = {
  requestIn: [L.pick({ request: 'request', url: ['request', 'url'] })],
  responseIn: [L.pick({ response: 'response', url: ['response', 'url'] })],

  pickRequestIn: L.pick({ request: ['request', 'request'], url: 'url' }),
  pickResponseIn: L.pick({ response: ['response', 'response'], url: 'url' }),
  pickResultIn: L.pick({ response: 'response', request: 'request', url: 'url' })
};

const apiDataPrefix: RegExp = /svdata=/;
const pathPrefix: RegExp = /.*\/kcsapi/;

const logError = (...args) => console.error('>> ERROR: ', ...args);
const tryParse = R.tryCatch(JSON.parse, logError);
const removeTokenFrom = R.dissoc('api_token');

const isGamePath = R.test(pathPrefix);
const parsePath = R.replace(pathPrefix, '');

const parseBody = R.compose(tryParse, R.replace(apiDataPrefix, ''), R.prop('body'));
const parseQueryString = R.compose(removeTokenFrom, qs.parse, R.unless(R.isNil));

// Export public-facing functions

/**
 * @module networkHandler
 * @event REQUEST_WILL_BE_SENT
 *
 * Handler function for when the debugger sends a REQUEST_WILL_BE_SENT message.
 */
export const requestWillBeSentFn =
  R.curry((reqView, wc, event, method, data) => {
    const { request, url } = L.get(param.pickRequestIn, data);
    console.log(`requestWillBeSentFn: ${+(new Date())} `);

    R.when(isGamePath,
      reqView.modify(r => L.set('request', request, r)), url);
  });

/**
 * @module networkHandler
 * @event RESPONSE_RECEIVED
 *
 * Handler function for when the debugger sends a RESPONSE_RECEIVED message.
 */
export const responseReceivedFn =
  R.curry((reqView, wc, event, method, data) => {
    console.log(`responseReceivedFn: ${+(new Date())} `);
    const { response, url } = L.get(param.pickResponseIn, data);

    R.when(isGamePath,
      reqView.modify(r =>
        L.set('response', response, r)), url);
  });

export const loadingFinishedFn =
  R.curry((reqView, wc, event, method, data) => {
    console.log(`loadingFinishedFn: ${+(new Date())} `);
    if (reqView.get()) {
      const { requestId } = data;

      wc.debugger.sendCommand(networkEvent.GET_RESPONSE_BODY, { requestId },
        (err, result) => {
          const { response, request, url } = reqView.view(param.pickResultIn).get();
          const resultBody = parseBody(result);
          const postBody = parseQueryString(L.get('postData', request));
          const path = parsePath(url);

          // Return to subscriber

          // After constructing all of the necessary data, we can safely
          // remove the part of the Atom we're no longer using.
          reqView.remove();
        });
    }
  });

export const getHandler =
  R.cond([
    [R.equals(networkEvent.REQUEST_WILL_BE_SENT), R.always(requestWillBeSentFn)],
    [R.equals(networkEvent.RESPONSE_RECEIVED), R.always(responseReceivedFn)],
    [R.equals(networkEvent.LOADING_FINISHED), R.always(loadingFinishedFn)]
  ]);

// Chrome debugger typedefs
export type Headers = { [key: string]: * };

export type ResourcePriority =
  | 'VeryLow'
  | 'Low'
  | 'Medium'
  | 'High'
  | 'VeryHigh';

export type ResourceTiming = {
  requestTime: number,
  proxyStart: number,
  proxyEnd: number,
  dnsStart: number,
  dnsEnd: number,
  connectStart: number,
  connectEnd: number,
  sslStart: number,
  sslEnd: number,
  workerStart: number,
  workerReady: number,
  sendStart: number,
  sendEnd: number,
  pushStart: number,
  pushEnd: number,
  receiveHeadersEnd: number
};

export type SecurityDetails = {
  protocol: string,
  keyExchange: string,
  keyExchangeGroup?: string,
  cipher: string,
  mac?: string,
  certificateId: *,
  subjectName: string,
  sanList: Array<string>,
  issuer: string,
  validFrom: *,
  validTo: *,
  signedCertificateTimestampList: Array<*>
};

export type RequestData = {
  url: string,
  method: string,
  headers: Headers,
  postData?: string,
  mixedContentType?: string,
  initialPriority: ResourcePriority,
  referrerPolicy: string
};

export type ResponseData = {
  url: string,
  status: number,
  statusText: string,
  headers: Headers,
  headersText?: string,
  mimeType: string,
  requestHeaders?: *,
  requestHeadersText?: string,
  connectionReused: boolean,
  connectionId: number,
  remoteIPAddress?: string,
  remotePort?: number,
  fromDiskCache?: boolean,
  fromServiceWorker?: boolean,
  encodedDataLength: number,
  timing?: ResourceTiming,
  protocol?: string,
  securityState: *,
  securityDetails?: SecurityDetails
};

export type LoadingFinishedData = {
  requestId: string,
  timestamp: number,
  encodedDataLength: number
};
