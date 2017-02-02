// @flow
import * as R from 'ramda';

export const networkEvent: { [key: string]: string } = {
  REQUEST_WILL_BE_SENT: 'Network.requestWillBeSent',
  RESPONSE_RECEIVED: 'Network.responseReceived',
  LOADING_FINISHED: 'Network.loadingFinished',
  GET_RESPONSE_BODY: 'Network.getResponseBody'
};

const requestWillBeSent = ({ handlerState, requestId, event, method, params }: *) => {};

const responseReceived = ({ handlerState, requestId, event, method, params }: *) => {};

const loadingFinished = ({ handlerState, requestId, event, method, params }: *) => {};

export const getHandler = R.cond([
  [R.equals(networkEvent.REQUEST_WILL_BE_SENT), R.always(requestWillBeSent)],
  [R.equals(networkEvent.RESPONSE_RECEIVED), R.always(responseReceived)],
  [R.equals(networkEvent.LOADING_FINISHED), R.always(loadingFinished)]
]);
