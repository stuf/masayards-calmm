// @flow
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import qs from 'querystring';

export const Events = {
  getEventObjects: (e: *) => {
    const view = e.target;
    const contents = view.getWebContents();
    const { session } = contents;
    const { webRequest } = session;
    return { view, contents, session, webRequest };
  }
};

export const Handler = {
  requestWithId: (id: *) => ['requests', id],
  requestTemplate: (type: *) => [L.pick({ requestId: 'requestId', [type]: type })]
};

const apiDataPrefix: RegExp = /svdata=/;
const pathPrefix: RegExp = /.*\/kcsapi/;

export const Network = {
  views: {
    latestIn: U.view(['api', 'latest']),
    requestIn: (id: *, atom: *) => U.view(['api', 'requests', id], atom)
  },
  getPath: R.compose(R.replace(pathPrefix, ''), R.path(['request', 'url'])),
  getBody: R.compose(R.prop('api_data'), JSON.parse, R.replace(apiDataPrefix, ''), R.prop('body')),
  getPostBody: R.compose(R.dissoc('api_token'), qs.parse, R.path(['request', 'postBody']))
};

export const Views = {
  gameIn: U.view('game')
};
