// @flow
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import type { EventObjects } from './types';

export const Events: EventMeta = {
  getEventObjects: e => {
    const view = e.target;
    const contents = view.getWebContents();
    const { session } = contents;
    const { webRequest } = session;
    return { view, contents, session, webRequest };
  }
};

export const Webview: WebviewMeta = {
  observerViewIn: U.view(L.pick({
    state: 'state',
    latest: ['api', 'latest']
  }))
};

export type EventMeta = {
  getEventObjects: (e: *) => EventObjects
};

export type WebviewMeta = {
  observerViewIn: *
};
