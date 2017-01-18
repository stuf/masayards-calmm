/* eslint brace-style: 0, array-bracket-spacing: 0 */
// @flow
import React from 'karet';
import Kefir from 'kefir';
import Atom from 'kefir.atom';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import cx from 'classnames';

import s from './webview.css';
import { getHandler } from './_network-handler';

/**
 * Provide a <GameView /> component that will handle piping data from the API to
 * the appropriate handlers.
 */
export default class GameView extends React.Component {
  constructor(props: *) {
    super(props);
    this.atom = props.requestAtom;
  }

  componentDidMount() {
    this.gameView.addEventListener('dom-ready', this.webViewEventHandler);
    this.atom.log('GameView atom:');
  }

  componentWillUnmount() {
    // Derp
    if (this.debugger) {
      this.debugger.off('message');
    }
  }

  // Some internal vars
  // ------------------
  // Game handler state
  firstGameLoad: boolean = true;
  debuggerAttached: boolean = false;
  debugger: * = null;
  atom: *;

  // Event streams
  // observers: { [key: string ]: * } = {};

  // Configuration
  apiDataPrefix: RegExp = /svdata=/;
  pathPrefix: RegExp = /.*\/kcsapi/;
  gameSwfPrefix: RegExp = /kcs\/mainD2/;
  urlFilters: Array<string> = [
    'http://*/kcs/mainD2.swf',
    'https://*/kcs/mainD2.swf'
  ];

  // Region cookies to inject
  cookies: Array<string> = [
    'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";',
    'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";',
    'document.cookie = "cklg=welcome;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";',
    'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/";',
    'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame/";',
    'document.cookie = "ckcy=1;expires=Sun, 09 Feb 2019 09:00:09 GMT;domain=.dmm.com;path=/netgame_s/";'
  ];
  gameUrl: string;

  attachDebugger = (attach: *) => {
    attach();
    this.debuggerAttached = true;
  }

  lenses: * = {
    responseUrl: ['response', 'url'],
    requestUrl: ['request', 'url']
  };

  // Event view handler
  webViewEventHandler = (e: *) => {
    const view = e.target;
    const contents = view.getWebContents();
    const { session } = contents;
    const { webRequest } = session;

    console.log('view =', view);
    console.log('contents =', contents);

    // @todo Replace disabling/detaching to an observable's lifecycle instead.
    Kefir.fromEvents(view, 'close').observe({
      value: ev => contents.debugger.sendCommand('Network.disable')
    });

    if (!this.debuggerAttached) {
      try {
        contents.debugger.attach('1.1');
        this.debuggerAttached = true;
      }
      catch (err) {
        console.log('could not attach debugger', err);
      }

      contents.debugger.on('message', (event, method, data) =>
        R.unless(R.isNil, f =>
          f(this.atom.view(data.requestId), contents, event, method, data), getHandler(method)));
    }

    // Enable the network monitoring for webview
    contents.debugger.sendCommand('Network.enable');

    // Monitor and hijack the game SWF request
    webRequest.onBeforeRequest({ urls: this.urlFilters }, (details, cb) => {
      console.log('onBeforeRequest: ', details);
      const cancel = R.test(this.gameSwfPrefix, details.url);
      cb({ cancel });

      if (cancel) {
        this.gameUrl = details.url;
        this.firstGameLoad = false;
        // webContents.loadURL(this.gameUrl);
      }

      // Inject region cookies when we load the game view
      contents.executeJavaScript(this.cookies.join('\n'));
    });
  };

  render() {
    const props = {
      is: true,
      ref: c => { this.gameView = c; },
      nodeintegration: true,
      plugins: true,
      partition: 'persist:masayards-dev',
      src: 'https://www.google.com'
    };
    return (
      <div className={cx(s.webview)}>
        <webview {...props} />
      </div>
    );
  }
}
